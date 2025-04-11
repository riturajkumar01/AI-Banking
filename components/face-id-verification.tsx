import { useEffect, useRef, useState } from "react"
import * as faceapi from "face-api.js"
import { Button } from "@/components/ui/button"
import {
  Card, CardContent, CardDescription, CardFooter,
  CardHeader, CardTitle
} from "@/components/ui/card"
import { Loader, Scan, X } from "lucide-react"

interface FaceIdVerificationProps {
  onClose: () => void
  onSuccess?: (matchedName: string) => void
}

export function FaceIdVerification({ onClose, onSuccess }: FaceIdVerificationProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [step, setStep] = useState<"initial" | "scanning" | "success" | "error">("initial")
  const [scanProgress, setScanProgress] = useState(0)
  const [loading, setLoading] = useState(false)
  const knownDescriptorsRef = useRef<{ label: string; descriptor: Float32Array }[]>([])

  const MODEL_URL = "/models"

  const loadModels = async () => {
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
    ])
  }

  const loadKnownFaces = async () => {
    const people = ["person1", "person2"]
    const descriptors = await Promise.all(
      people.map(async (name) => {
        const img = await faceapi.fetchImage(`/reference/${name}.jpg`)
        const detection = await faceapi
          .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptor()

        if (!detection) throw new Error(`No face detected for ${name}`)

        return {
          label: name,
          descriptor: detection.descriptor,
        }
      })
    )
    knownDescriptorsRef.current = descriptors
  }

  const startScan = async () => {
    try {
      setLoading(true)
      await loadModels()
      await loadKnownFaces()

      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }

      setStep("scanning")
      setScanProgress(0)
      setLoading(false)
      detectFaceLoop()
    } catch (err) {
      console.error("Error starting scan:", err)
      setStep("error")
      setLoading(false)
    }
  }

  const drawDetections = (detection: any) => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    const dims = faceapi.matchDimensions(canvas, video, true)
    const resized = faceapi.resizeResults(detection, dims)

    const ctx = canvas.getContext("2d")
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height)

    faceapi.draw.drawDetections(canvas, resized)
    faceapi.draw.drawFaceLandmarks(canvas, resized)
  }

  const detectFaceLoop = async () => {
    let progress = 0
    const interval = setInterval(async () => {
      if (!videoRef.current || videoRef.current.readyState !== 4) return

      const detection = await faceapi
        .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor()

      if (detection) {
        drawDetections(detection)
        progress += 10
        setScanProgress(progress)

        let matched = false
        let matchedPerson = ""

        for (const { label, descriptor } of knownDescriptorsRef.current) {
          const distance = faceapi.euclideanDistance(detection.descriptor, descriptor)
          if (distance < 0.5) {
            matched = true
            matchedPerson = label
            break
          }
        }

        if (matched || progress >= 100) {
          clearInterval(interval)
          stopCamera()
          setStep(matched ? "success" : "error")
          if (matched && onSuccess) setTimeout(() => onSuccess(matchedPerson), 1000)
        }
      }
    }, 400)
  }

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream
    stream?.getTracks().forEach((track) => track.stop())
  }

  useEffect(() => {
    return () => stopCamera()
  }, [])

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md border-none shadow-2xl">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>Face ID Verification</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => { stopCamera(); onClose() }} className="rounded-full h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>
            {step === "initial" && "Position your face in front of the camera"}
            {step === "scanning" && "Scanning your face..."}
            {step === "success" && "Verification successful!"}
            {step === "error" && "Verification failed. Please try again."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-6 space-y-4">
          {loading && (
            <div className="flex items-center justify-center space-x-2 text-primary">
              <Loader className="h-5 w-5 animate-spin" />
              <span>Loading models and reference images...</span>
            </div>
          )}

          {(step === "scanning" || step === "initial") && !loading && (
            <div className="relative w-full h-64">
              <video ref={videoRef} className="rounded-md w-full h-full object-cover" muted playsInline />
              <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
            </div>
          )}

          {step === "success" && (
            <div className="text-center space-y-2">
              <div className="w-40 h-40 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <Scan className="h-20 w-20 text-green-600" />
              </div>
              <p className="text-green-600 font-medium text-xl">Verification successful!</p>
            </div>
          )}

          {step === "error" && (
            <div className="text-center space-y-2">
              <div className="w-40 h-40 rounded-full bg-red-100 flex items-center justify-center mx-auto">
                <Scan className="h-20 w-20 text-red-600" />
              </div>
              <p className="text-red-600 font-medium text-xl">Verification failed</p>
              <p className="text-muted-foreground">Please try again</p>
            </div>
          )}

          {(step === "scanning" || step === "initial") && !loading && (
            <div className="w-full max-w-xs mx-auto">
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300 ease-in-out"
                  style={{ width: `${scanProgress}%` }}
                ></div>
              </div>
              <p className="mt-2 text-center">Scanning... {scanProgress}%</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          {(step === "initial" || step === "error") && (
            <Button onClick={startScan} className="w-full">
              Start Scan
            </Button>
          )}
          {step === "scanning" && (
            <Button disabled variant="outline" className="w-full">
              Scanning...
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mic, X, AudioWaveformIcon as Waveform } from "lucide-react"

interface VoiceRecognitionProps {
  onClose: () => void
  onSuccess?: (name: string) => void
}

export function VoiceRecognition({ onClose, onSuccess }: VoiceRecognitionProps) {
  const [step, setStep] = useState<"initial" | "listening" | "processing" | "success" | "error">("initial")
  const [audioLevel, setAudioLevel] = useState(0)
  const [recognizedName, setRecognizedName] = useState("")
  const [recognizedText, setRecognizedText] = useState("")

  useEffect(() => {
    if (step === "listening") {
      // Simulate audio levels
      const interval = setInterval(() => {
        setAudioLevel(Math.random() * 100)
      }, 100)

      // Simulate voice recognition after 3 seconds
      const timer = setTimeout(() => {
        // In a real app, this would be actual voice recognition
        // that detects the phrase "Hey, I am [name]"
        const names = ["Rituraj"]
        const randomName = names[Math.floor(Math.random() * names.length)]
        setRecognizedName(randomName)
        setRecognizedText(`Hey, I am ${randomName}`)
        setStep("processing")
      }, 3000)

      return () => {
        clearInterval(interval)
        clearTimeout(timer)
      }
    }

    if (step === "processing") {
      // Simulate processing the voice pattern
      const timer = setTimeout(() => {
        setStep("success")
      }, 2000)

      return () => clearTimeout(timer)
    }

    if (step === "success") {
      const timer = setTimeout(() => {
        if (onSuccess) {
          onSuccess(recognizedName)
        }
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [step, onSuccess, recognizedName])

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md border-none shadow-2xl">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>Voice Recognition</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>
            {step === "initial" && "Say to authenticate"}
            {step === "listening" && "Listening..."}
            {step === "processing" && "Processing your voice pattern..."}
            {step === "success" && "Voice recognized!"}
            {step === "error" && "Voice not recognized. Please try again."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          {step === "initial" && (
            <div className="text-center space-y-4">
              <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Mic className="h-16 w-16 text-primary" />
              </div>
              <p className="text-lg">...................</p>
            </div>
          )}

          {step === "listening" && (
            <div className="text-center space-y-4 w-full">
              <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mx-auto relative">
                <Mic className="h-16 w-16 text-primary animate-pulse" />
                <div
                  className="absolute inset-0 border-2 border-primary rounded-full"
                  style={{
                    transform: `scale(${1 + audioLevel / 200})`,
                    opacity: 1 - audioLevel / 150,
                  }}
                />
              </div>
              <p className="text-lg">Listening...</p>

              <div className="flex justify-center items-center gap-1 h-8 mt-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 bg-primary rounded-full"
                    style={{
                      height: `${Math.max(4, Math.random() * audioLevel)}px`,
                      transition: "height 150ms ease",
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {step === "processing" && (
            <div className="text-center space-y-4">
              <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Waveform className="h-16 w-16 text-primary animate-pulse" />
              </div>
              <p className="text-lg">Processing voice pattern...</p>
              <div className="bg-muted p-3 rounded-lg mt-2">
                <p className="text-sm font-mono">{recognizedText}</p>
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="text-center space-y-4">
              <div className="w-32 h-32 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <Mic className="h-16 w-16 text-green-600" />
              </div>
              <div>
                <p className="text-green-600 font-medium text-xl">Voice recognized!</p>
                <p className="text-lg mt-2">Hello, {recognizedName}</p>
              </div>
            </div>
          )}

          {step === "error" && (
            <div className="text-center space-y-4">
              <div className="w-32 h-32 rounded-full bg-red-100 flex items-center justify-center mx-auto">
                <Mic className="h-16 w-16 text-red-600" />
              </div>
              <p className="text-red-600 font-medium">Voice not recognized</p>
              <p className="text-sm text-muted-foreground">Please try again or use another authentication method</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          {step === "initial" && (
            <Button onClick={() => setStep("listening")} className="w-full">
              Start Speaking
            </Button>
          )}

          {step === "error" && (
            <Button onClick={() => setStep("listening")} className="w-full">
              Try Again
            </Button>
          )}

          {(step === "listening" || step === "processing" || step === "success") && (
            <Button disabled variant="outline" className="w-full">
              {step === "listening" ? "Listening..." : step === "processing" ? "Processing..." : "Continuing..."}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

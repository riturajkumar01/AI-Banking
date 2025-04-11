'use client'

import type React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ArrowRight, KeyRound, Mic, Shield, User } from 'lucide-react'
import { FaceIdVerification } from '@/components/face-id-verification'
import { VoiceRecognition } from '@/components/voice-recognition'

export function LoginPage() {
  const router = useRouter()
  const [step, setStep] = useState<'credentials' | 'voice' | 'faceId'>('credentials')
  const [credentials, setCredentials] = useState({
    email: 'ritu@mail.com',
    password: '123',
  })
  const [error, setError] = useState('')
  const [showVoice, setShowVoice] = useState(false)
  const [showFaceId, setShowFaceId] = useState(false)
  const [userName, setUserName] = useState('')

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!credentials.email || !credentials.password) {
      setError('Please enter both email and password')
      return
    }
    setError('')
    setStep('voice')
  }

  const handleVoiceSuccess = (name: string) => {
    setUserName(name)
    setShowVoice(false)
    setStep('faceId')
    setTimeout(() => setShowFaceId(true), 500)
  }

  const handleVoiceClose = () => setShowVoice(false)
  const handleFaceIdSuccess = () => {
    setShowFaceId(false)
    router.push('/')
  }
  const handleFaceIdClose = () => setShowFaceId(false)

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0 filter blur-sm"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/login.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />

      {/* Foreground UI */}
      <div className="relative z-20 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-3 rounded-full shadow-md">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">SecureBank</span>
            </div>
          </div>

          <Card className="border-none shadow-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">
                {step === 'voice' && 'Voice Recognition'}
                {step === 'faceId' && 'Face ID Verification'}
                {step === 'credentials' && 'Enter Your Credentials'}
              </CardTitle>
              <CardDescription className="text-center">
                {step === 'voice'}
                {step === 'faceId' && 'Complete facial verification to continue'}
                {step === 'credentials' && 'Enter your password to access your account'}
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-4">
              {step === 'voice' && (
                <div className="py-6 flex flex-col items-center text-center space-y-6">
                  <div
                    className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center relative group cursor-pointer"
                    onClick={() => setShowVoice(true)}
                  >
                    <Mic className="h-12 w-12 text-primary group-hover:scale-110 transition-transform" />
                    <div className="absolute inset-0 border-2 border-primary rounded-full opacity-75 animate-pulse"></div>
                  </div>
                  <div>
                    <p className="font-medium text-lg">Voice Authentication</p>
                    <p className="text-muted-foreground mt-1">Tap the microphone and say</p>
                  </div>
                  <Button variant="outline" className="w-full mt-4 group" onClick={() => setShowVoice(true)}>
                    Start Voice Recognition
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              )}

              {step === 'faceId' && (
                <div className="py-6 flex flex-col items-center text-center space-y-6">
                  <div
                    className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center relative group cursor-pointer"
                    onClick={() => setShowFaceId(true)}
                  >
                    <User className="h-12 w-12 text-primary group-hover:scale-110 transition-transform" />
                    <div className="absolute inset-0 border-2 border-primary rounded-full opacity-75 animate-pulse"></div>
                  </div>
                  <div>
                    <p className="font-medium text-lg">Hello, {userName || 'User'}</p>
                    <p className="text-muted-foreground mt-1">Please complete facial verification to continue</p>
                  </div>
                  <Button variant="outline" className="w-full mt-4 group" onClick={() => setShowFaceId(true)}>
                    Start Face ID Verification
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              )}

              {step === 'credentials' && (
                <form onSubmit={handleCredentialsSubmit} className="space-y-4">
                  <div className="py-4 flex flex-col items-center text-center space-y-2 mb-4">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                      <KeyRound className="h-8 w-8 text-green-600" />
                    </div>
                    <p className="font-medium text-lg">Final Step, {userName || 'User'}</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={credentials.email}
                      onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <a href="#" className="text-sm text-primary hover:underline">
                        Forgot password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={credentials.password}
                      onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    />
                  </div>

                  {error && <p className="text-sm text-destructive">{error}</p>}
                </form>
              )}
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              {step === 'voice' && (
                <p className="text-sm text-center text-muted-foreground">
                  This is a multi-factor authentication system for enhanced security
                </p>
              )}

              {step === 'faceId' && (
                <Button variant="ghost" className="w-full" onClick={() => setStep('voice')}>
                  Back to Voice Recognition
                </Button>
              )}

              {step === 'credentials' && (
                <>
                  <Button type="submit" className="w-full" onClick={handleCredentialsSubmit}>
                    Sign In
                  </Button>
                  <div className="flex justify-between w-full text-sm">
                    <a href="#" className="text-primary hover:underline">
                      Sign up
                    </a>
                  </div>
                </>
              )}
            </CardFooter>
          </Card>

          {/* Modal Components */}
          {showVoice && <VoiceRecognition onClose={handleVoiceClose} onSuccess={handleVoiceSuccess} />}
          {showFaceId && <FaceIdVerification onClose={handleFaceIdClose} onSuccess={handleFaceIdSuccess} />}
        </div>
      </div>
    </div>
  )
}

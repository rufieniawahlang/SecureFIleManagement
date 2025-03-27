"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, KeyRound, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"

export default function AuthPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [otpCode, setOtpCode] = useState(["", "", "", "", "", ""])
  const [step, setStep] = useState<"password" | "2fa">("password")
  const [loading, setLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate authentication process
    setTimeout(() => {
      if (step === "password") {
        // In a real app, this would validate credentials against a secure backend
        if (username && password) {
          setStep("2fa")
        }
      } else {
        // In a real app, this would validate the 2FA code
        if (otpCode.join("").length === 6) {
          router.push("/dashboard")
        }
      }
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Authentication</h1>
          <p className="text-sm text-muted-foreground">Secure your access with multi-factor authentication</p>
        </div>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="info">Info</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">
                  {step === "password" ? "Sign in" : "Two-Factor Authentication"}
                </CardTitle>
                <CardDescription>
                  {step === "password"
                    ? "Enter your credentials to access the secure system"
                    : "Enter the verification code from your authenticator app"}
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <form onSubmit={handleLogin}>
                  {step === "password" ? (
                    <>
                      <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="admin"
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center">
                          <Label htmlFor="password">Password</Label>
                          <Link href="#" className="ml-auto inline-block text-sm underline">
                            Forgot password?
                          </Link>
                        </div>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="grid gap-2">
                      <Label htmlFor="otp">Verification Code</Label>
                      <div className="flex justify-between gap-2">
                        {otpCode.map((digit, index) => (
                          <Input
                            key={index}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            className="h-12 w-12 text-center text-lg"
                            value={digit}
                            onChange={(e) => {
                              const newOtpCode = [...otpCode]
                              newOtpCode[index] = e.target.value
                              setOtpCode(newOtpCode)

                              // Auto-focus next input
                              if (e.target.value && index < 5) {
                                const nextInput = document.querySelector(
                                  `input[name=otp-${index + 1}]`,
                                ) as HTMLInputElement
                                if (nextInput) nextInput.focus()
                              }
                            }}
                            onKeyDown={(e) => {
                              // Handle backspace to go to previous input
                              if (e.key === "Backspace" && !digit && index > 0) {
                                const prevInput = document.querySelector(
                                  `input[name=otp-${index - 1}]`,
                                ) as HTMLInputElement
                                if (prevInput) prevInput.focus()
                              }
                            }}
                            name={`otp-${index}`}
                          />
                        ))}
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <Checkbox id="remember" />
                        <label
                          htmlFor="remember"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Remember this device for 30 days
                        </label>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">For this simulator, enter any 6 digits</p>
                    </div>
                  )}
                  <Button className="w-full" type="submit" disabled={loading}>
                    {loading ? (
                      <div className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </div>
                    ) : step === "password" ? (
                      "Continue"
                    ) : (
                      "Verify & Login"
                    )}
                  </Button>
                </form>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-muted-foreground text-center w-full">
                  This is a simulator for educational purposes.
                  <br />
                  For security, your session will automatically timeout after 15 minutes of inactivity.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="info">
            <Card>
              <CardHeader>
                <CardTitle>Authentication Security</CardTitle>
                <CardDescription>Learn about secure authentication methods</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <KeyRound className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Password Authentication</h3>
                    <p className="text-sm text-muted-foreground">
                      The first layer of security using something you know. Strong passwords should be unique, complex,
                      and regularly updated.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <ShieldCheck className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Two-Factor Authentication (2FA)</h3>
                    <p className="text-sm text-muted-foreground">
                      Adds a second layer using something you have (like a mobile device). This significantly improves
                      security even if passwords are compromised.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => router.push("/")}>
                  Back to Home
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}


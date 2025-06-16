"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const DotMatrix = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <div
        className="w-full h-full opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle, #333 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />
    </div>
  )
}

interface SignInPageProps {
  onSignIn: (email: string, password: string) => void
  onSwitchToSignUp: () => void
}

export default function SignInPage({ onSignIn, onSwitchToSignUp }: SignInPageProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [errors, setErrors] = useState<Partial<Record<string, string>>>({})

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<string, string>> = {}

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onSignIn(formData.email, formData.password)
    }
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 text-white relative overflow-hidden flex flex-col"
      style={{ fontFamily: "Avenir, -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      <DotMatrix />

      {/* Background Athletic Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: `url('/images/athlete-signin.png')`,
        }}
      />

      {/* Logo and Brand - Top */}
      <div className="flex-1 flex items-center justify-center relative z-10">
        <div className="w-full max-w-sm space-y-8">
          {/* Logo */}
          <div className="text-center">
            <svg width="120" height="108" viewBox="0 0 200 180" className="w-28 h-26 mx-auto mb-6">
              <circle cx="100" cy="50" r="40" fill="none" stroke="#000000" strokeWidth="8" />
              <circle cx="75" cy="110" r="40" fill="none" stroke="#DC2626" strokeWidth="8" />
              <circle cx="125" cy="110" r="40" fill="none" stroke="#FFFFFF" strokeWidth="8" />
            </svg>
            <h1
              className="text-4xl font-black tracking-wider text-white mb-2"
              style={{
                fontFamily: "Arial Black, Arial, sans-serif",
                fontWeight: 900,
                letterSpacing: "0.05em",
              }}
            >
              ALIGN
            </h1>
            <p className="text-gray-300 text-sm font-medium">BY ATHLETES, FOR ATHLETES</p>
          </div>

          {/* Sign In Form */}
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-2xl">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">SIGN IN</h2>
                <p className="text-gray-600 font-medium mt-3 text-sm">Welcome back to your fitness journey</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-900">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={`h-14 text-base rounded-xl border-2 ${errors.email ? "border-red-500" : "border-gray-200"} focus:border-gray-900`}
                    placeholder="Enter your email"
                    required
                  />
                  {errors.email && <p className="text-red-500 text-xs font-medium">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-900">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    className={`h-14 text-base rounded-xl border-2 ${errors.password ? "border-red-500" : "border-gray-200"} focus:border-gray-900`}
                    placeholder="Enter your password"
                    required
                  />
                  {errors.password && <p className="text-red-500 text-xs font-medium">{errors.password}</p>}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gray-900 text-white hover:bg-gray-800 font-bold tracking-wide h-14 text-lg rounded-xl shadow-lg"
                >
                  START
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Sign Up Link */}
          <div className="text-center space-y-4">
            <p className="text-gray-300 text-sm font-medium">Don't have an account?</p>
            <Button
              onClick={onSwitchToSignUp}
              variant="outline"
              className="w-full bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-gray-900 font-bold tracking-wide h-14 text-lg rounded-xl"
            >
              CREATE ACCOUNT
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

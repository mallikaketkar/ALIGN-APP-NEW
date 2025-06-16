"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import type { UserData } from "@/app/page"

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

interface SignupPageProps {
  onSubmit: (userData: UserData) => void
  onBack: () => void
}

export default function SignupPage({ onSubmit, onBack }: SignupPageProps) {
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState<Partial<Record<keyof UserData, string>>>({})

  const handleChange = (field: keyof UserData, value: string) => {
    setUserData((prev) => ({
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
    const newErrors: Partial<Record<keyof UserData, string>> = {}

    if (!userData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!userData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!userData.password.trim()) {
      newErrors.password = "Password is required"
    } else if (userData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (!userData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (userData.password !== userData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit(userData)
    }
  }

  return (
    <div
      className="min-h-screen bg-black p-4 text-white relative overflow-hidden flex flex-col"
      style={{ fontFamily: "Avenir, -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      <DotMatrix />

      {/* Background Athletic Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: `url('/images/athlete-signup.png')`,
        }}
      />

      <div className="flex-1 flex items-center justify-center relative z-10">
        <div className="w-full max-w-sm space-y-6">
          {/* Header with Back Button */}
          <div className="flex items-center justify-between">
            <Button onClick={onBack} variant="ghost" size="sm" className="p-3 hover:bg-white/10 text-white rounded-xl">
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1
              className="text-3xl font-black tracking-wider text-white"
              style={{
                fontFamily: "Arial Black, Arial, sans-serif",
                fontWeight: 900,
                letterSpacing: "0.05em",
              }}
            >
              ALIGN
            </h1>
            <div className="w-12" />
          </div>

          {/* Sign Up Form */}
          <Card className="bg-white border-0 shadow-2xl rounded-2xl">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold tracking-tight text-black">CREATE ACCOUNT</h2>
                <p className="text-gray-600 font-medium mt-3 text-sm">Join the Align community</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-black">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={userData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className={`h-14 text-base rounded-xl border-2 ${errors.name ? "border-red-600" : "border-gray-200"} focus:border-red-600`}
                    placeholder="Enter your full name"
                    required
                  />
                  {errors.name && <p className="text-red-600 text-xs font-medium">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-black">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={userData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={`h-14 text-base rounded-xl border-2 ${errors.email ? "border-red-600" : "border-gray-200"} focus:border-red-600`}
                    placeholder="Enter your email"
                    required
                  />
                  {errors.email && <p className="text-red-600 text-xs font-medium">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-black">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={userData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    className={`h-14 text-base rounded-xl border-2 ${errors.password ? "border-red-600" : "border-gray-200"} focus:border-red-600`}
                    placeholder="Create a password"
                    required
                  />
                  {errors.password && <p className="text-red-600 text-xs font-medium">{errors.password}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-black">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={userData.confirmPassword}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    className={`h-14 text-base rounded-xl border-2 ${errors.confirmPassword ? "border-red-600" : "border-gray-200"} focus:border-red-600`}
                    placeholder="Confirm your password"
                    required
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-600 text-xs font-medium">{errors.confirmPassword}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-red-600 text-white hover:bg-red-700 font-bold tracking-wide h-14 text-lg rounded-xl shadow-lg"
                >
                  START
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
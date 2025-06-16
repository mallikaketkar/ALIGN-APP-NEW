"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { GoalsData } from "@/app/page"

const DotMatrix = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <div
        className="w-full h-full opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle, #333 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />
    </div>
  )
}

interface PersonalInfoPageProps {
  onSubmit: (data: Partial<GoalsData>) => void
}

export default function PersonalInfoPage({ onSubmit }: PersonalInfoPageProps) {
  const [formData, setFormData] = useState<Partial<GoalsData>>({
    birthday: "",
    gender: "",
    heightUnit: "feet",
    heightFeet: "",
    heightInches: "",
    heightCm: "",
  })

  const [errors, setErrors] = useState<Partial<Record<string, string>>>({})

  const handleChange = (field: keyof GoalsData, value: string) => {
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

    if (!formData.birthday) {
      newErrors.birthday = "Birthday is required"
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required"
    }

    if (formData.heightUnit === "feet") {
      if (!formData.heightFeet) {
        newErrors.heightFeet = "Height in feet is required"
      }
      if (!formData.heightInches) {
        newErrors.heightInches = "Height in inches is required"
      }
    } else {
      if (!formData.heightCm) {
        newErrors.heightCm = "Height in cm is required"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <div
      className="min-h-screen bg-gray-100 p-4 text-gray-900 relative"
      style={{ fontFamily: "Avenir, -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      <DotMatrix />
      <div className="max-w-sm mx-auto space-y-6 relative z-10 pt-4 pb-8">
        <div className="text-center">
          <h1 className="text-3xl font-light tracking-wide text-black">Personal Information</h1>
          <p className="text-gray-600 font-light mt-2 text-sm">Tell us about yourself</p>
          <p className="text-red-600 text-xs mt-2">* Required fields</p>
        </div>

        <Card className="bg-white border-0 shadow-lg">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="birthday" className="text-sm">
                  Birthday <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="birthday"
                  type="date"
                  value={formData.birthday}
                  onChange={(e) => handleChange("birthday", e.target.value)}
                  className={`h-12 ${errors.birthday ? "border-red-600" : ""}`}
                  required
                />
                {errors.birthday && <p className="text-red-600 text-xs">{errors.birthday}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-sm">
                  Gender <span className="text-red-600">*</span>
                </Label>
                <Select value={formData.gender} onValueChange={(value) => handleChange("gender", value)} required>
                  <SelectTrigger className={`h-12 ${errors.gender ? "border-red-600" : ""}`}>
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && <p className="text-red-600 text-xs">{errors.gender}</p>}
              </div>

              <div className="space-y-3">
                <Label className="text-sm">
                  Height <span className="text-red-600">*</span>
                </Label>
                <Select
                  value={formData.heightUnit}
                  onValueChange={(value: "feet" | "cm") => handleChange("heightUnit", value)}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="feet">Feet & Inches</SelectItem>
                    <SelectItem value="cm">Centimeters</SelectItem>
                  </SelectContent>
                </Select>

                {formData.heightUnit === "feet" ? (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs text-gray-600">
                        Feet <span className="text-red-600">*</span>
                      </Label>
                      <Input
                        placeholder="5"
                        value={formData.heightFeet}
                        onChange={(e) => handleChange("heightFeet", e.target.value)}
                        className={`h-12 ${errors.heightFeet ? "border-red-600" : ""}`}
                        required
                      />
                      {errors.heightFeet && <p className="text-red-600 text-xs">{errors.heightFeet}</p>}
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-gray-600">
                        Inches <span className="text-red-600">*</span>
                      </Label>
                      <Input
                        placeholder="8"
                        value={formData.heightInches}
                        onChange={(e) => handleChange("heightInches", e.target.value)}
                        className={`h-12 ${errors.heightInches ? "border-red-600" : ""}`}
                        required
                      />
                      {errors.heightInches && <p className="text-red-600 text-xs">{errors.heightInches}</p>}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <Label className="text-xs text-gray-600">
                      Centimeters <span className="text-red-600">*</span>
                    </Label>
                    <Input
                      placeholder="175"
                      value={formData.heightCm}
                      onChange={(e) => handleChange("heightCm", e.target.value)}
                      className={`h-12 ${errors.heightCm ? "border-red-600" : ""}`}
                      required
                    />
                    {errors.heightCm && <p className="text-red-600 text-xs">{errors.heightCm}</p>}
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-red-600 text-white hover:bg-red-700 font-light tracking-wide h-12 text-base rounded-xl"
              >
                Continue
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
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

interface WeightGoalsPageProps {
  onSubmit: (data: Partial<GoalsData>) => void
}

export default function WeightGoalsPage({ onSubmit }: WeightGoalsPageProps) {
  const [formData, setFormData] = useState<Partial<GoalsData>>({
    currentWeight: "",
    goalWeight: "",
    weightUnit: "lbs",
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

    if (!formData.currentWeight) {
      newErrors.currentWeight = "Current weight is required"
    }

    if (!formData.goalWeight) {
      newErrors.goalWeight = "Goal weight is required"
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
          <h1 className="text-3xl font-light tracking-wide text-black">Weight Goals</h1>
          <p className="text-gray-600 font-light mt-2 text-sm">Set your weight targets</p>
          <p className="text-red-600 text-xs mt-2">* Required fields</p>
        </div>

        <Card className="bg-white border-0 shadow-lg">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label className="text-sm">
                  Weight Unit <span className="text-red-600">*</span>
                </Label>
                <Select
                  value={formData.weightUnit}
                  onValueChange={(value: "lbs" | "kg") => handleChange("weightUnit", value)}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lbs">Pounds (lbs)</SelectItem>
                    <SelectItem value="kg">Kilograms (kg)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-sm">
                    Current Weight <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    placeholder="150"
                    value={formData.currentWeight}
                    onChange={(e) => handleChange("currentWeight", e.target.value)}
                    className={`h-12 ${errors.currentWeight ? "border-red-600" : ""}`}
                    required
                  />
                  {errors.currentWeight && <p className="text-red-600 text-xs">{errors.currentWeight}</p>}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">
                    Goal Weight <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    placeholder="140"
                    value={formData.goalWeight}
                    onChange={(e) => handleChange("goalWeight", e.target.value)}
                    className={`h-12 ${errors.goalWeight ? "border-red-600" : ""}`}
                    required
                  />
                  {errors.goalWeight && <p className="text-red-600 text-xs">{errors.goalWeight}</p>}
                </div>
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
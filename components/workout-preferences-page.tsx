"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
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

const workoutFrequencies = [
  { id: "1x", title: "1x per week", description: "Once weekly training" },
  { id: "2x", title: "2x per week", description: "Twice weekly training" },
  { id: "3x", title: "3x per week", description: "Three times weekly training" },
  { id: "4x", title: "4x per week", description: "Four times weekly training" },
  { id: "5x", title: "5x per week", description: "Five times weekly training" },
  { id: "6x", title: "6x per week", description: "Six times weekly training" },
  { id: "7x", title: "7x per week", description: "Daily training" },
]

const workoutDurations = [
  { id: "30-45", title: "30-45 minutes", description: "Quick, efficient sessions" },
  { id: "45-60", title: "45-60 minutes", description: "Standard workout length" },
  { id: "60-90", title: "1 hr - 1.5 hr", description: "Extended training sessions" },
  { id: "90-120", title: "1.5 hr - 2 hr", description: "Long, comprehensive workouts" },
]

interface WorkoutPreferencesPageProps {
  onSubmit: (data: Partial<GoalsData>) => void
}

export default function WorkoutPreferencesPage({ onSubmit }: WorkoutPreferencesPageProps) {
  const [formData, setFormData] = useState<Partial<GoalsData>>({
    workoutFrequency: "",
    workoutDuration: "",
  })

  const [errors, setErrors] = useState<Partial<Record<string, string>>>({})

  const handleChange = (field: keyof GoalsData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error when user selects
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<string, string>> = {}

    if (!formData.workoutFrequency) {
      newErrors.workoutFrequency = "Please select workout frequency"
    }

    if (!formData.workoutDuration) {
      newErrors.workoutDuration = "Please select workout duration"
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
          <h1 className="text-3xl font-light tracking-wide text-black">Workout Preferences</h1>
          <p className="text-gray-600 font-light mt-2 text-sm">Customize your training schedule</p>
          <p className="text-red-600 text-xs mt-2">* Required fields</p>
        </div>

        <Card className="bg-white border-0 shadow-lg">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Workout Frequency */}
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-light text-black">
                    How often would you like a curated workout? <span className="text-red-600">*</span>
                  </h2>
                  {errors.workoutFrequency && <p className="text-red-600 text-xs mt-1">{errors.workoutFrequency}</p>}
                </div>

                <RadioGroup
                  value={formData.workoutFrequency}
                  onValueChange={(value) => handleChange("workoutFrequency", value)}
                >
                  <div className="space-y-3">
                    {workoutFrequencies.map((frequency) => (
                      <div
                        key={frequency.id}
                        className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg"
                      >
                        <RadioGroupItem value={frequency.id} id={frequency.id} className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor={frequency.id} className="font-medium text-black cursor-pointer text-sm">
                            {frequency.title}
                          </Label>
                          <p className="text-xs text-gray-600 mt-1">{frequency.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Workout Duration */}
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-light text-black">
                    How long would you like the workout to be? <span className="text-red-600">*</span>
                  </h2>
                  {errors.workoutDuration && <p className="text-red-600 text-xs mt-1">{errors.workoutDuration}</p>}
                </div>

                <RadioGroup
                  value={formData.workoutDuration}
                  onValueChange={(value) => handleChange("workoutDuration", value)}
                >
                  <div className="space-y-3">
                    {workoutDurations.map((duration) => (
                      <div
                        key={duration.id}
                        className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg"
                      >
                        <RadioGroupItem value={duration.id} id={duration.id} className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor={duration.id} className="font-medium text-black cursor-pointer text-sm">
                            {duration.title}
                          </Label>
                          <p className="text-xs text-gray-600 mt-1">{duration.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <Button
                type="submit"
                className="w-full bg-red-600 text-white hover:bg-red-700 font-light tracking-wide h-12 text-base rounded-xl"
              >
                Complete Setup
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
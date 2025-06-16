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

const activityLevels = [
  {
    id: "not-very-active",
    title: "Not Very Active",
    subtitle: "0–3 hours/week",
    description: "Light activity or mostly sedentary lifestyle",
  },
  {
    id: "moderately-active",
    title: "Moderately Active",
    subtitle: "4–8 hours/week",
    description: "Regular workouts a few times a week",
  },
  {
    id: "active",
    title: "Active",
    subtitle: "9–15 hours/week",
    description: "Structured training most days of the week",
  },
  {
    id: "very-active",
    title: "Very Active",
    subtitle: "16–20+ hours/week",
    description: "Intense and frequent training sessions",
  },
]

interface ActivityLevelPageProps {
  onSubmit: (data: Partial<GoalsData>) => void
}

export default function ActivityLevelPage({ onSubmit }: ActivityLevelPageProps) {
  const [formData, setFormData] = useState<Partial<GoalsData>>({
    activityLevel: "",
  })

  const [errors, setErrors] = useState<Partial<Record<string, string>>>({})

  const handleChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      activityLevel: value,
    }))

    // Clear error when user selects
    if (errors.activityLevel) {
      setErrors((prev) => ({
        ...prev,
        activityLevel: undefined,
      }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<string, string>> = {}

    if (!formData.activityLevel) {
      newErrors.activityLevel = "Please select your activity level"
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
          <h1 className="text-3xl font-light tracking-wide text-black">Activity Level</h1>
          <p className="text-gray-600 font-light mt-2 text-sm">How active are you currently?</p>
          <p className="text-red-600 text-xs mt-2">* Required fields</p>
        </div>

        <Card className="bg-white border-0 shadow-lg">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-lg font-light text-black mb-4">
                  Current Activity Level <span className="text-red-600">*</span>
                </h2>
                {errors.activityLevel && <p className="text-red-600 text-xs mb-4">{errors.activityLevel}</p>}
              </div>

              <RadioGroup value={formData.activityLevel} onValueChange={handleChange}>
                <div className="space-y-3">
                  {activityLevels.map((level) => (
                    <div key={level.id} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg">
                      <RadioGroupItem value={level.id} id={level.id} className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor={level.id} className="font-medium text-black cursor-pointer text-sm">
                          {level.title}
                        </Label>
                        <p className="text-xs font-medium text-gray-700">{level.subtitle}</p>
                        <p className="text-xs text-gray-600 mt-1">{level.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </RadioGroup>

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
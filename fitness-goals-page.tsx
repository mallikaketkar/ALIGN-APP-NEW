"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
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

const mainGoals = [
  {
    id: "build-muscle",
    title: "Build Muscle & Strength",
    description: "Focus on resistance training and progressive overload",
  },
  {
    id: "lose-fat",
    title: "Lose Fat / Weight Loss",
    description: "Reduce body fat through cardio and diet",
  },
  {
    id: "improve-endurance",
    title: "Improve Endurance",
    description: "Enhance cardiovascular and muscular endurance",
  },
  {
    id: "increase-speed",
    title: "Increase Speed & Power",
    description: "Develop explosive power and agility",
  },
  {
    id: "enhance-flexibility",
    title: "Enhance Flexibility",
    description: "Improve joint health and mobility",
  },
]

interface FitnessGoalsPageProps {
  onSubmit: (data: Partial<GoalsData>) => void
}

export default function FitnessGoalsPage({ onSubmit }: FitnessGoalsPageProps) {
  const [formData, setFormData] = useState<Partial<GoalsData>>({
    mainGoals: [],
  })

  const [errors, setErrors] = useState<Partial<Record<string, string>>>({})

  const handleGoalToggle = (goalId: string, checked: boolean) => {
    if (checked && formData.mainGoals!.length >= 2) {
      return
    }

    const updatedGoals = checked
      ? [...(formData.mainGoals || []), goalId]
      : (formData.mainGoals || []).filter((id) => id !== goalId)

    setFormData((prev) => ({
      ...prev,
      mainGoals: updatedGoals,
    }))

    // Clear error when user selects
    if (errors.mainGoals) {
      setErrors((prev) => ({
        ...prev,
        mainGoals: undefined,
      }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<string, string>> = {}

    if (!formData.mainGoals || formData.mainGoals.length === 0) {
      newErrors.mainGoals = "Please select at least one main goal"
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
          <h1 className="text-3xl font-light tracking-wide text-gray-900">Fitness Goals</h1>
          <p className="text-gray-600 font-light mt-2 text-sm">What do you want to achieve?</p>
          <p className="text-red-500 text-xs mt-2">* Required fields</p>
        </div>

        <Card className="bg-white border-0 shadow-lg">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-lg font-light text-gray-900 mb-2">
                  Main Goals <span className="text-red-500">*</span>
                </h2>
                <p className="text-xs text-gray-600 mb-4">Select up to 2 goals</p>
                {errors.mainGoals && <p className="text-red-500 text-xs mb-4">{errors.mainGoals}</p>}
              </div>

              <div className="space-y-3">
                {mainGoals.map((goal) => (
                  <div
                    key={goal.id}
                    className={`flex items-start space-x-3 p-3 border border-gray-200 rounded-lg ${
                      !(formData.mainGoals || []).includes(goal.id) && (formData.mainGoals || []).length >= 2
                        ? "opacity-50"
                        : ""
                    }`}
                  >
                    <Checkbox
                      id={goal.id}
                      checked={(formData.mainGoals || []).includes(goal.id)}
                      onCheckedChange={(checked) => handleGoalToggle(goal.id, checked as boolean)}
                      disabled={!(formData.mainGoals || []).includes(goal.id) && (formData.mainGoals || []).length >= 2}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label htmlFor={goal.id} className="font-medium text-gray-900 cursor-pointer text-sm">
                        {goal.title}
                      </Label>
                      <p className="text-xs text-gray-600 mt-1">{goal.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                type="submit"
                className="w-full bg-gray-900 text-white hover:bg-gray-800 font-light tracking-wide h-12 text-base rounded-xl"
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

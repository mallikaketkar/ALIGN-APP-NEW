"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
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

interface GoalsPageProps {
  onSubmit: (goalsData: GoalsData) => void
}

export default function GoalsPage({ onSubmit }: GoalsPageProps) {
  const [goalsData, setGoalsData] = useState<GoalsData>({
    birthday: "",
    heightUnit: "feet",
    heightFeet: "",
    heightInches: "",
    heightCm: "",
    currentWeight: "",
    goalWeight: "",
    weightUnit: "lbs",
    mainGoals: [],
    activityLevel: "",
    workoutFrequency: "",
    workoutDuration: "",
  })

  const [errors, setErrors] = useState<Partial<Record<string, string>>>({})

  const handleChange = (field: keyof GoalsData, value: string | string[]) => {
    setGoalsData((prev) => ({
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

  const handleGoalToggle = (goalId: string, checked: boolean) => {
    if (checked && goalsData.mainGoals.length >= 2) {
      return
    }

    const updatedGoals = checked ? [...goalsData.mainGoals, goalId] : goalsData.mainGoals.filter((id) => id !== goalId)

    handleChange("mainGoals", updatedGoals)
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<string, string>> = {}

    if (!goalsData.birthday) {
      newErrors.birthday = "Birthday is required"
    }

    if (goalsData.heightUnit === "feet") {
      if (!goalsData.heightFeet) {
        newErrors.heightFeet = "Height in feet is required"
      }
      if (!goalsData.heightInches) {
        newErrors.heightInches = "Height in inches is required"
      }
    } else {
      if (!goalsData.heightCm) {
        newErrors.heightCm = "Height in cm is required"
      }
    }

    if (!goalsData.currentWeight) {
      newErrors.currentWeight = "Current weight is required"
    }

    if (!goalsData.goalWeight) {
      newErrors.goalWeight = "Goal weight is required"
    }

    if (goalsData.mainGoals.length === 0) {
      newErrors.mainGoals = "Please select at least one main goal"
    }

    if (!goalsData.activityLevel) {
      newErrors.activityLevel = "Please select your activity level"
    }

    if (!goalsData.workoutFrequency) {
      newErrors.workoutFrequency = "Please select workout frequency"
    }

    if (!goalsData.workoutDuration) {
      newErrors.workoutDuration = "Please select workout duration"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit(goalsData)
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
          <h1 className="text-3xl font-light tracking-wide text-gray-900">Set Your Goals</h1>
          <p className="text-gray-600 font-light mt-2 text-sm">Personalize your fitness journey</p>
        </div>

        <Card className="bg-white border-0 shadow-lg">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h2 className="text-lg font-light text-gray-900">Personal Information</h2>

                <div className="space-y-2">
                  <Label htmlFor="birthday" className="text-sm">
                    Birthday
                  </Label>
                  <Input
                    id="birthday"
                    type="date"
                    value={goalsData.birthday}
                    onChange={(e) => handleChange("birthday", e.target.value)}
                    className={`h-12 ${errors.birthday ? "border-red-500" : ""}`}
                  />
                  {errors.birthday && <p className="text-red-500 text-xs">{errors.birthday}</p>}
                </div>

                {/* Height */}
                <div className="space-y-3">
                  <Label className="text-sm">Height</Label>
                  <Select
                    value={goalsData.heightUnit}
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

                  {goalsData.heightUnit === "feet" ? (
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs text-gray-600">Feet</Label>
                        <Input
                          placeholder="5"
                          value={goalsData.heightFeet}
                          onChange={(e) => handleChange("heightFeet", e.target.value)}
                          className={`h-12 ${errors.heightFeet ? "border-red-500" : ""}`}
                        />
                        {errors.heightFeet && <p className="text-red-500 text-xs">{errors.heightFeet}</p>}
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-gray-600">Inches</Label>
                        <Input
                          placeholder="8"
                          value={goalsData.heightInches}
                          onChange={(e) => handleChange("heightInches", e.target.value)}
                          className={`h-12 ${errors.heightInches ? "border-red-500" : ""}`}
                        />
                        {errors.heightInches && <p className="text-red-500 text-xs">{errors.heightInches}</p>}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <Input
                        placeholder="175"
                        value={goalsData.heightCm}
                        onChange={(e) => handleChange("heightCm", e.target.value)}
                        className={`h-12 ${errors.heightCm ? "border-red-500" : ""}`}
                      />
                      {errors.heightCm && <p className="text-red-500 text-xs">{errors.heightCm}</p>}
                    </div>
                  )}
                </div>

                {/* Weight */}
                <div className="space-y-3">
                  <Label className="text-sm">Weight</Label>
                  <Select
                    value={goalsData.weightUnit}
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

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs text-gray-600">Current</Label>
                      <Input
                        placeholder="150"
                        value={goalsData.currentWeight}
                        onChange={(e) => handleChange("currentWeight", e.target.value)}
                        className={`h-12 ${errors.currentWeight ? "border-red-500" : ""}`}
                      />
                      {errors.currentWeight && <p className="text-red-500 text-xs">{errors.currentWeight}</p>}
                    </div>

                    <div className="space-y-1">
                      <Label className="text-xs text-gray-600">Goal</Label>
                      <Input
                        placeholder="140"
                        value={goalsData.goalWeight}
                        onChange={(e) => handleChange("goalWeight", e.target.value)}
                        className={`h-12 ${errors.goalWeight ? "border-red-500" : ""}`}
                      />
                      {errors.goalWeight && <p className="text-red-500 text-xs">{errors.goalWeight}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Goals */}
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-light text-gray-900">Main Goals</h2>
                  <p className="text-xs text-gray-600 mt-1">Select up to 2 goals</p>
                  {errors.mainGoals && <p className="text-red-500 text-xs mt-1">{errors.mainGoals}</p>}
                </div>

                <div className="space-y-3">
                  {mainGoals.map((goal) => (
                    <div
                      key={goal.id}
                      className={`flex items-start space-x-3 p-3 border border-gray-200 rounded-lg ${
                        !goalsData.mainGoals.includes(goal.id) && goalsData.mainGoals.length >= 2 ? "opacity-50" : ""
                      }`}
                    >
                      <Checkbox
                        id={goal.id}
                        checked={goalsData.mainGoals.includes(goal.id)}
                        onCheckedChange={(checked) => handleGoalToggle(goal.id, checked as boolean)}
                        disabled={!goalsData.mainGoals.includes(goal.id) && goalsData.mainGoals.length >= 2}
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
              </div>

              {/* Activity Level */}
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-light text-gray-900">Activity Level</h2>
                  <p className="text-xs text-gray-600 mt-1">How active are you currently?</p>
                  {errors.activityLevel && <p className="text-red-500 text-xs mt-1">{errors.activityLevel}</p>}
                </div>

                <RadioGroup
                  value={goalsData.activityLevel}
                  onValueChange={(value) => handleChange("activityLevel", value)}
                >
                  <div className="space-y-3">
                    {activityLevels.map((level) => (
                      <div key={level.id} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg">
                        <RadioGroupItem value={level.id} id={level.id} className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor={level.id} className="font-medium text-gray-900 cursor-pointer text-sm">
                            {level.title}
                          </Label>
                          <p className="text-xs font-medium text-gray-700">{level.subtitle}</p>
                          <p className="text-xs text-gray-600 mt-1">{level.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Workout Frequency */}
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-light text-gray-900">Workout Frequency</h2>
                  <p className="text-xs text-gray-600 mt-1">How many times per week do you want to workout?</p>
                  {errors.workoutFrequency && <p className="text-red-500 text-xs mt-1">{errors.workoutFrequency}</p>}
                </div>

                <RadioGroup
                  value={goalsData.workoutFrequency}
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
                          <Label htmlFor={frequency.id} className="font-medium text-gray-900 cursor-pointer text-sm">
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
                  <h2 className="text-lg font-light text-gray-900">Workout Duration</h2>
                  <p className="text-xs text-gray-600 mt-1">How long do you want each workout to be?</p>
                  {errors.workoutDuration && <p className="text-red-500 text-xs mt-1">{errors.workoutDuration}</p>}
                </div>

                <RadioGroup
                  value={goalsData.workoutDuration}
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
                          <Label htmlFor={duration.id} className="font-medium text-gray-900 cursor-pointer text-sm">
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
                className="w-full bg-gray-900 text-white hover:bg-gray-800 font-light tracking-wide h-12 text-base rounded-xl"
              >
                Continue to Check-In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

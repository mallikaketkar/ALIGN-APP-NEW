"use client"

import type React from "react"
import type { UserData, GoalsData } from "@/app/page"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Activity, Brain, Moon, Zap, RotateCcw, Heart, Dumbbell, Target } from "lucide-react"

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

interface Question {
  id: string
  text: string
  category: "physical" | "mental" | "recovery"
  icon: React.ReactNode
  type: "select" | "scale" | "multiselect"
  min?: number
  max?: number
  options: { value: number | string; label: string }[]
}

const questions: Question[] = [
  {
    id: "sleep_hours",
    text: "How many hours of sleep did you get last night?",
    category: "recovery",
    icon: <Moon className="w-4 h-4" />,
    type: "select",
    options: [
      { value: 3, label: "3 hours or less" },
      { value: 4, label: "4 hours" },
      { value: 5, label: "5 hours" },
      { value: 6, label: "6 hours" },
      { value: 7, label: "7 hours" },
      { value: 8, label: "8 hours" },
      { value: 9, label: "9 hours" },
      { value: 10, label: "10+ hours" },
    ],
  },
  {
    id: "sleep_quality",
    text: "Rate your sleep quality (1 = very poor, 5 = excellent)",
    category: "recovery",
    icon: <Moon className="w-4 h-4" />,
    type: "scale",
    min: 1,
    max: 5,
    options: [],
  },
  {
    id: "energy_level",
    text: "Rate your current energy level (1 = completely drained, 5 = fully energized)",
    category: "physical",
    icon: <Zap className="w-4 h-4" />,
    type: "scale",
    min: 1,
    max: 5,
    options: [],
  },
  {
    id: "overall_soreness",
    text: "Rate your overall muscle soreness (1 = no soreness, 5 = very sore)",
    category: "physical",
    icon: <Activity className="w-4 h-4" />,
    type: "scale",
    min: 1,
    max: 5,
    options: [],
  },
  {
    id: "sore_muscle_groups",
    text: "Which muscle groups feel sore or fatigued today?",
    category: "physical",
    icon: <Dumbbell className="w-4 h-4" />,
    type: "multiselect",
    options: [
      { value: "upper-body", label: "Upper body" },
      { value: "lower-body", label: "Lower body" },
      { value: "core", label: "Core" },
    ],
  },
  {
    id: "stress_level",
    text: "Rate your current stress level (1 = very relaxed, 5 = very stressed)",
    category: "mental",
    icon: <Brain className="w-4 h-4" />,
    type: "scale",
    min: 1,
    max: 5,
    options: [],
  },
  {
    id: "motivation",
    text: "Rate your motivation to exercise today (1 = no motivation, 5 = highly motivated)",
    category: "mental",
    icon: <Target className="w-4 h-4" />,
    type: "scale",
    min: 1,
    max: 5,
    options: [],
  },
  {
    id: "previous_day_training",
    text: "How intense was your training/activity yesterday?",
    category: "recovery",
    icon: <Activity className="w-4 h-4" />,
    type: "select",
    options: [
      { value: 1, label: "Rest day/no training" },
      { value: 2, label: "Light activity" },
      { value: 3, label: "Moderate training" },
      { value: 4, label: "High intensity training" },
      { value: 5, label: "Very intense/competition" },
    ],
  },
]

interface DailyReadinessTrackerProps {
  userData: UserData
  goalsData: GoalsData
  onReadinessComplete: (score: {
    physicalReadiness: number
    mentalReadiness: number
    recoveryReadiness: number
    overallReadiness: number
  }) => void
}

export default function DailyReadinessTracker({
  userData,
  goalsData,
  onReadinessComplete,
}: DailyReadinessTrackerProps) {
  const [responses, setResponses] = useState<Record<string, number | string[]>>({})
  const [showResults, setShowResults] = useState(false)

  const handleResponseChange = (questionId: string, value: string) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: Number.parseInt(value),
    }))
  }

  const handleMultiSelectChange = (questionId: string, value: string, checked: boolean) => {
    setResponses((prev) => {
      const currentValues = (prev[questionId] as string[]) || []
      if (checked) {
        return {
          ...prev,
          [questionId]: [...currentValues, value],
        }
      } else {
        return {
          ...prev,
          [questionId]: currentValues.filter((v) => v !== value),
        }
      }
    })
  }

  const calculateReadiness = () => {
    const sleepHours = (responses.sleep_hours as number) || 0
    const sleepQuality = (responses.sleep_quality as number) || 0
    const energyLevel = (responses.energy_level as number) || 0
    const overallSoreness = (responses.overall_soreness as number) || 5
    const soreMuscleGroups = (responses.sore_muscle_groups as string[]) || []
    const stressLevel = (responses.stress_level as number) || 5
    const motivation = (responses.motivation as number) || 0
    const previousTraining = (responses.previous_day_training as number) || 3

    // Calculate physical readiness (0-100)
    const sleepScore = Math.min(100, (sleepHours / 8) * 100)
    const energyScore = (energyLevel / 5) * 100
    const sorenessScore = ((5 - overallSoreness + 1) / 5) * 100

    // Calculate muscle group soreness score based on number of sore areas
    const muscleGroupScore = soreMuscleGroups.length === 0 ? 100 : ((3 - soreMuscleGroups.length) / 3) * 100

    const physicalReadiness = Math.round((sleepScore + energyScore + sorenessScore + muscleGroupScore) / 4)

    // Calculate mental readiness (0-100)
    const stressScore = ((5 - stressLevel + 1) / 5) * 100
    const motivationScore = (motivation / 5) * 100

    const mentalReadiness = Math.round((stressScore + motivationScore) / 2)

    // Calculate recovery readiness (0-100)
    const sleepQualityScore = (sleepQuality / 5) * 100
    const recoveryFromTraining = ((5 - previousTraining + 1) / 5) * 100

    const recoveryReadiness = Math.round((sleepQualityScore + recoveryFromTraining) / 2)

    // Overall readiness (weighted average)
    const overallReadiness = Math.round(physicalReadiness * 0.4 + mentalReadiness * 0.3 + recoveryReadiness * 0.3)

    return { physicalReadiness, mentalReadiness, recoveryReadiness, overallReadiness }
  }

  const getReadinessLevel = (score: number) => {
    if (score >= 80) return { level: "excellent", color: "bg-gray-900", textColor: "text-gray-900" }
    if (score >= 60) return { level: "good", color: "bg-gray-700", textColor: "text-gray-700" }
    if (score >= 40) return { level: "moderate", color: "bg-gray-500", textColor: "text-gray-500" }
    return { level: "low", color: "bg-gray-400", textColor: "text-gray-400" }
  }

  const getRecommendation = (physical: number, mental: number, recovery: number, overall: number) => {
    if (overall >= 80) {
      return "You're in an excellent state today! This is your optimal performance window. Go ahead and engage in high-intensity training protocols."
    } else if (overall >= 60) {
      return "You're showing solid readiness today! Your body is prepared for moderate to high intensity training."
    } else if (overall >= 40) {
      return "You're in a moderate readiness state today. Focus on technique refinement and active recovery protocols."
    } else {
      return "Your body is asking for recovery today. Prioritize restoration, hydration, and system reset."
    }
  }

  const isComplete = questions.every((q) => {
    if (q.type === "multiselect") {
      // For multiselect, we don't require any selection (user can select none if no soreness)
      return true
    }
    return responses[q.id] !== undefined
  })

  const { physicalReadiness, mentalReadiness, recoveryReadiness, overallReadiness } = showResults
    ? calculateReadiness()
    : { physicalReadiness: 0, mentalReadiness: 0, recoveryReadiness: 0, overallReadiness: 0 }

  const handleSubmit = () => {
    if (isComplete) {
      setShowResults(true)
    }
  }

  const handleContinue = () => {
    const scores = calculateReadiness()
    onReadinessComplete(scores)
  }

  const handleReset = () => {
    setResponses({})
    setShowResults(false)
  }

  if (showResults) {
    const physicalLevel = getReadinessLevel(physicalReadiness)
    const mentalLevel = getReadinessLevel(mentalReadiness)
    const recoveryLevel = getReadinessLevel(recoveryReadiness)
    const overallLevel = getReadinessLevel(overallReadiness)

    return (
      <div
        className="min-h-screen bg-gray-100 p-4 text-gray-900 relative"
        style={{ fontFamily: "Avenir, -apple-system, BlinkMacSystemFont, sans-serif" }}
      >
        <DotMatrix />
        <div className="max-w-sm mx-auto space-y-6 relative z-10 pt-4 pb-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-light tracking-wide text-gray-900">Readiness Score</h1>
            <p className="text-gray-600 font-light text-sm">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Main Results Card */}
          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-6">
              {/* Overall Readiness */}
              <div className="text-center space-y-4 mb-8">
                <div className="relative w-32 h-32 mx-auto">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="45" stroke="#e5e7eb" strokeWidth="6" fill="none" />
                    <circle
                      cx="60"
                      cy="60"
                      r="45"
                      stroke="#374151"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray={`${overallReadiness * 2.83} 283`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-light text-gray-900">{overallReadiness}</span>
                  </div>
                </div>
                <div>
                  <Badge className="bg-gray-900 text-white text-sm px-4 py-1 font-light lowercase tracking-wide">
                    {overallLevel.level}
                  </Badge>
                </div>
              </div>

              {/* Detailed Metrics */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-gray-700" />
                    <span className="text-sm font-light lowercase tracking-wide text-gray-900">physical</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-lg font-light text-gray-900">{physicalReadiness}</div>
                    <div className="h-2 w-16 bg-gray-300 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gray-900 rounded-full transition-all duration-1000"
                        style={{ width: `${physicalReadiness}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-gray-700" />
                    <span className="text-sm font-light lowercase tracking-wide text-gray-900">mental</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-lg font-light text-gray-900">{mentalReadiness}</div>
                    <div className="h-2 w-16 bg-gray-300 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gray-900 rounded-full transition-all duration-1000"
                        style={{ width: `${mentalReadiness}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-gray-700" />
                    <span className="text-sm font-light lowercase tracking-wide text-gray-900">recovery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-lg font-light text-gray-900">{recoveryReadiness}</div>
                    <div className="h-2 w-16 bg-gray-300 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gray-900 rounded-full transition-all duration-1000"
                        style={{ width: `${recoveryReadiness}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendation */}
              <div className="text-center space-y-3">
                <h3 className="text-lg font-light tracking-wide text-gray-900">Protocol</h3>
                <p className="text-gray-700 font-light text-sm leading-relaxed">
                  {getRecommendation(physicalReadiness, mentalReadiness, recoveryReadiness, overallReadiness)}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleContinue}
              className="w-full bg-gray-900 text-white hover:bg-gray-800 font-light lowercase tracking-wide h-12 rounded-xl"
            >
              continue to dashboard
            </Button>

            <Button
              onClick={handleReset}
              className="w-full bg-transparent border border-gray-600 text-gray-900 hover:bg-gray-200 font-light lowercase tracking-wide h-12 rounded-xl"
              variant="outline"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              reset assessment
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen bg-gray-100 p-4 text-gray-900 relative"
      style={{ fontFamily: "Avenir, -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      <DotMatrix />
      <div className="max-w-sm mx-auto space-y-6 relative z-10 pt-4 pb-8">
        {/* Header with personalized greeting */}
        <div className="text-center space-y-2">
          <h2 className="text-lg font-light text-gray-700">Hi {userData.name}</h2>
          <h1 className="text-3xl font-light tracking-wide text-gray-900">Daily Readiness Check-In</h1>
          <p className="text-gray-600 font-light text-sm">daily assessment protocol</p>
        </div>

        {/* Questions */}
        {questions.map((question, index) => (
          <Card key={question.id} className="bg-white border-0 shadow-sm">
            <CardContent className="p-5">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  {question.icon}
                  <div className="flex-1">
                    <h3 className="text-base font-light lowercase tracking-wide text-gray-900">{index + 1}</h3>
                    <p className="text-gray-700 font-light text-sm leading-relaxed">{question.text}</p>
                  </div>
                </div>

                {question.type === "select" ? (
                  <RadioGroup
                    value={responses[question.id]?.toString() || ""}
                    onValueChange={(value) => handleResponseChange(question.id, value)}
                    className="space-y-2"
                  >
                    {question.options.map((option) => (
                      <div key={option.value} className="flex items-center space-x-3">
                        <RadioGroupItem
                          value={option.value.toString()}
                          id={`${question.id}-${option.value}`}
                          className="border-gray-400 text-gray-900"
                        />
                        <Label
                          htmlFor={`${question.id}-${option.value}`}
                          className="flex-1 cursor-pointer font-light text-gray-700 text-sm"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                ) : question.type === "multiselect" ? (
                  <div className="space-y-2">
                    {question.options.map((option) => (
                      <div key={option.value} className="flex items-center space-x-3">
                        <Checkbox
                          id={`${question.id}-${option.value}`}
                          checked={((responses[question.id] as string[]) || []).includes(option.value as string)}
                          onCheckedChange={(checked) =>
                            handleMultiSelectChange(question.id, option.value as string, checked as boolean)
                          }
                          className="border-gray-400"
                        />
                        <Label
                          htmlFor={`${question.id}-${option.value}`}
                          className="flex-1 cursor-pointer font-light text-gray-700 text-sm"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <RadioGroup
                      value={responses[question.id]?.toString() || ""}
                      onValueChange={(value) => handleResponseChange(question.id, value)}
                      className="grid grid-cols-5 gap-2"
                    >
                      {Array.from({ length: question.max! - question.min! + 1 }, (_, i) => {
                        const value = question.min! + i
                        return (
                          <div key={value} className="flex flex-col items-center space-y-2">
                            <RadioGroupItem
                              value={value.toString()}
                              id={`${question.id}-${value}`}
                              className="border-gray-400 text-gray-900"
                            />
                            <Label
                              htmlFor={`${question.id}-${value}`}
                              className="text-xs cursor-pointer w-6 h-6 flex items-center justify-center font-light text-gray-700"
                            >
                              {value}
                            </Label>
                          </div>
                        )
                      })}
                    </RadioGroup>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            onClick={handleSubmit}
            disabled={!isComplete}
            className="w-full bg-gray-900 text-white hover:bg-gray-800 font-light lowercase tracking-wide h-12 text-base disabled:bg-gray-400 disabled:text-gray-600 rounded-xl"
            size="lg"
          >
            {isComplete
              ? "generate analysis"
              : `${
                  questions.length -
                  Object.keys(responses).filter((key) => {
                    const question = questions.find((q) => q.id === key)
                    return question?.type !== "multiselect" && responses[key] !== undefined
                  }).length
                } remaining`}
          </Button>
        </div>
      </div>
    </div>
  )
}

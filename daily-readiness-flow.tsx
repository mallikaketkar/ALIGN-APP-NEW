"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Activity, Brain, Moon, Zap, RotateCcw, Heart, Dumbbell, Target, Calendar } from "lucide-react"
import type { UserData, GoalsData } from "@/app/page"

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
      { value: 3, label: "4 hours or less" },
      { value: 5, label: "5 hours" },
      { value: 6, label: "6 hours" },
      { value: 7, label: "7 hours" },
      { value: 8, label: "8+ hours" },
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
  {
    id: "workout_focus",
    text: "What was the focus of your previous workout?",
    category: "recovery",
    icon: <Dumbbell className="w-4 h-4" />,
    type: "multiselect",
    options: [
      { value: "upper-body", label: "Upper body strength" },
      { value: "lower-body", label: "Lower body strength" },
      { value: "cardio", label: "Cardiovascular training" },
      { value: "full-body", label: "Full body workout" },
      { value: "flexibility", label: "Flexibility/mobility" },
      { value: "sport-specific", label: "Sport-specific training" },
      { value: "no-workout", label: "No previous workout" },
    ],
  },
  {
    id: "last_workout",
    text: "When was your last workout?",
    category: "recovery",
    icon: <Calendar className="w-4 h-4" />,
    type: "select",
    options: [
      { value: 0, label: "Today" },
      { value: 1, label: "Yesterday" },
      { value: 2, label: "2 days ago" },
      { value: 3, label: "3 days ago" },
      { value: 4, label: "More than 3 days ago" },
    ],
  },
]

interface DailyReadinessFlowProps {
  userData: UserData
  goalsData: GoalsData
  onReadinessComplete: (score: {
    physicalReadiness: number
    mentalReadiness: number
    recoveryReadiness: number
    overallReadiness: number
  }) => void
  onBack: () => void
}

export default function DailyReadinessFlow({
  userData,
  goalsData,
  onReadinessComplete,
  onBack,
}: DailyReadinessFlowProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState<Record<string, number | string[]>>({})
  const [showResults, setShowResults] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questions.length - 1

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

  const handleNext = () => {
    if (isLastQuestion) {
      setShowResults(true)
    } else {
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
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
    const lastWorkout = (responses.last_workout as number) || 2
    const workoutFocus = (responses.workout_focus as string[]) || []

    // Calculate physical readiness (0-100)
    const sleepScore = Math.min(100, (sleepHours / 8) * 100)
    const energyScore = (energyLevel / 5) * 100
    const sorenessScore = ((5 - overallSoreness + 1) / 5) * 100
    const muscleGroupScore = soreMuscleGroups.length === 0 ? 100 : ((3 - soreMuscleGroups.length) / 3) * 100

    const physicalReadiness = Math.round((sleepScore + energyScore + sorenessScore + muscleGroupScore) / 4)

    // Calculate mental readiness (0-100)
    const stressScore = ((5 - stressLevel + 1) / 5) * 100
    const motivationScore = (motivation / 5) * 100

    const mentalReadiness = Math.round((stressScore + motivationScore) / 2)

    // Calculate recovery readiness (0-100)
    const sleepQualityScore = (sleepQuality / 5) * 100
    const recoveryFromTraining = ((5 - previousTraining + 1) / 5) * 100
    const workoutRecencyScore = ((4 - lastWorkout + 1) / 4) * 100
    // Factor in workout focus diversity (more focus areas might indicate more fatigue)
    const workoutFocusScore = workoutFocus.length === 0 ? 100 : Math.max(50, 100 - workoutFocus.length * 10)

    const recoveryReadiness = Math.round(
      (sleepQualityScore + recoveryFromTraining + workoutRecencyScore + workoutFocusScore) / 4,
    )

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

  const isCurrentQuestionAnswered = () => {
    if (currentQuestion.type === "multiselect") {
      return true // Multiselect is optional
    }
    return responses[currentQuestion.id] !== undefined
  }

  const handleReset = () => {
    setResponses({})
    setCurrentQuestionIndex(0)
    setShowResults(false)
  }

  const handleContinue = () => {
    const scores = calculateReadiness()
    onReadinessComplete(scores)
  }

  if (showResults) {
    const { physicalReadiness, mentalReadiness, recoveryReadiness, overallReadiness } = calculateReadiness()
    const overallLevel = getReadinessLevel(overallReadiness)

    return (
      <div
        className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 text-gray-900 relative"
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
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
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
              className="w-full bg-gray-900 text-white hover:bg-gray-800 font-bold tracking-wide h-14 rounded-xl shadow-lg"
            >
              CONTINUE TO DASHBOARD
            </Button>

            <Button
              onClick={handleReset}
              className="w-full bg-white border-2 border-gray-300 text-gray-900 hover:bg-gray-50 font-bold tracking-wide h-14 rounded-xl"
              variant="outline"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              RESET ASSESSMENT
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 text-gray-900 relative"
      style={{ fontFamily: "Avenir, -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      <DotMatrix />
      <div className="max-w-sm mx-auto space-y-6 relative z-10 pt-4 pb-8">
        {/* Header with Back Button and Progress */}
        <div className="flex items-center justify-between">
          <Button
            onClick={currentQuestionIndex === 0 ? onBack : handlePrevious}
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-gray-200"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Daily Check-In</h1>
            <p className="text-sm text-gray-600 font-medium mt-1">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
          </div>
          <div className="w-9" />
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
          <div
            className="bg-gradient-to-r from-gray-800 to-gray-900 h-3 rounded-full transition-all duration-500 shadow-sm"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question Card */}
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                {currentQuestion.icon}
                <div className="flex-1">
                  <p className="text-gray-900 font-light text-base leading-relaxed">{currentQuestion.text}</p>
                </div>
              </div>

              {currentQuestion.type === "select" ? (
                <RadioGroup
                  value={responses[currentQuestion.id]?.toString() || ""}
                  onValueChange={(value) => handleResponseChange(currentQuestion.id, value)}
                  className="space-y-3"
                >
                  {currentQuestion.options.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg"
                    >
                      <RadioGroupItem
                        value={option.value.toString()}
                        id={`${currentQuestion.id}-${option.value}`}
                        className="border-gray-400 text-gray-900"
                      />
                      <Label
                        htmlFor={`${currentQuestion.id}-${option.value}`}
                        className="flex-1 cursor-pointer font-light text-gray-700 text-sm"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              ) : currentQuestion.type === "multiselect" ? (
                <div className="space-y-3">
                  <p className="text-xs text-gray-600 mb-3">Select all that apply (optional)</p>
                  {currentQuestion.options.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg"
                    >
                      <Checkbox
                        id={`${currentQuestion.id}-${option.value}`}
                        checked={((responses[currentQuestion.id] as string[]) || []).includes(option.value as string)}
                        onCheckedChange={(checked) =>
                          handleMultiSelectChange(currentQuestion.id, option.value as string, checked as boolean)
                        }
                        className="border-gray-400"
                      />
                      <Label
                        htmlFor={`${currentQuestion.id}-${option.value}`}
                        className="flex-1 cursor-pointer font-light text-gray-700 text-sm"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <RadioGroup
                    value={responses[currentQuestion.id]?.toString() || ""}
                    onValueChange={(value) => handleResponseChange(currentQuestion.id, value)}
                    className="grid grid-cols-5 gap-3"
                  >
                    {Array.from({ length: currentQuestion.max! - currentQuestion.min! + 1 }, (_, i) => {
                      const value = currentQuestion.min! + i
                      return (
                        <div key={value} className="flex flex-col items-center space-y-2">
                          <RadioGroupItem
                            value={value.toString()}
                            id={`${currentQuestion.id}-${value}`}
                            className="border-gray-400 text-gray-900"
                          />
                          <Label
                            htmlFor={`${currentQuestion.id}-${value}`}
                            className="text-sm cursor-pointer w-8 h-8 flex items-center justify-center font-light text-gray-700 border border-gray-200 rounded-full"
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

        {/* Navigation Buttons */}
        <div className="flex gap-3">
          {currentQuestionIndex > 0 && (
            <Button
              onClick={handlePrevious}
              variant="outline"
              className="flex-1 bg-transparent border border-gray-600 text-gray-900 hover:bg-gray-200 font-light tracking-wide h-12 rounded-xl"
            >
              Previous
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!isCurrentQuestionAnswered()}
            className="flex-1 bg-gray-900 text-white hover:bg-gray-800 font-bold tracking-wide h-14 text-base disabled:bg-gray-400 disabled:text-gray-600 rounded-xl shadow-lg"
          >
            {isLastQuestion ? "COMPLETE ASSESSMENT" : "NEXT"}
          </Button>
        </div>
      </div>
    </div>
  )
}

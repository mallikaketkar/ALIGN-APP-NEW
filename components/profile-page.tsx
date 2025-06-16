"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, Edit3, Save, X, LogOut } from "lucide-react"
import type { UserData, GoalsData } from "@/app/page"

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
  },
  {
    id: "moderately-active",
    title: "Moderately Active",
    subtitle: "4–8 hours/week",
  },
  {
    id: "active",
    title: "Active",
    subtitle: "9–15 hours/week",
  },
  {
    id: "very-active",
    title: "Very Active",
    subtitle: "16–20+ hours/week",
  },
]

const workoutFrequencies = [
  { id: "1x", title: "1x per week" },
  { id: "2x", title: "2x per week" },
  { id: "3x", title: "3x per week" },
  { id: "4x", title: "4x per week" },
  { id: "5x", title: "5x per week" },
  { id: "6x", title: "6x per week" },
  { id: "7x", title: "7x per week" },
]

const workoutDurations = [
  { id: "30-45", title: "30-45 minutes" },
  { id: "45-60", title: "45-60 minutes" },
  { id: "60-90", title: "1 hr - 1.5 hr" },
  { id: "90-120", title: "1.5 hr - 2 hr" },
]

interface ProfilePageProps {
  userData: UserData
  goalsData: GoalsData
  onUpdateUserData: (data: UserData) => void
  onUpdateGoalsData: (data: GoalsData) => void
  onBack: () => void
  onSignOut: () => void
}

export default function ProfilePage({
  userData,
  goalsData,
  onUpdateUserData,
  onUpdateGoalsData,
  onBack,
  onSignOut,
}: ProfilePageProps) {
  const [editingSection, setEditingSection] = useState<"none" | "personal" | "weight" | "goals" | "workout">("none")
  const [tempUserData, setTempUserData] = useState<UserData>(userData)
  const [tempGoalsData, setTempGoalsData] = useState<GoalsData>(goalsData)

  const handleSave = (section: string) => {
    if (section === "personal") {
      onUpdateUserData(tempUserData)
    } else {
      onUpdateGoalsData(tempGoalsData)
    }
    setEditingSection("none")
  }

  const handleCancel = () => {
    setTempUserData(userData)
    setTempGoalsData(goalsData)
    setEditingSection("none")
  }

  const handleGoalToggle = (goalId: string, checked: boolean) => {
    if (checked && tempGoalsData.mainGoals.length >= 2) {
      return
    }

    const updatedGoals = checked
      ? [...tempGoalsData.mainGoals, goalId]
      : tempGoalsData.mainGoals.filter((id) => id !== goalId)

    setTempGoalsData((prev) => ({
      ...prev,
      mainGoals: updatedGoals,
    }))
  }

  const getActivityLevelTitle = (id: string) => {
    const level = activityLevels.find((level) => level.id === id)
    return level ? `${level.title} (${level.subtitle})` : id
  }

  const getWorkoutFrequencyTitle = (id: string) => {
    const freq = workoutFrequencies.find((freq) => freq.id === id)
    return freq ? freq.title : id
  }

  const getWorkoutDurationTitle = (id: string) => {
    const duration = workoutDurations.find((duration) => duration.id === id)
    return duration ? duration.title : id
  }

  const getGoalTitles = (goalIds: string[]) => {
    return goalIds.map((id) => {
      const goal = mainGoals.find((goal) => goal.id === id)
      return goal ? goal.title : id
    })
  }

  const getGenderDisplay = (gender: string) => {
    const genderMap: { [key: string]: string } = {
      male: "Male",
      female: "Female",
      other: "Other",
      "prefer-not-to-say": "Prefer not to say",
    }
    return genderMap[gender] || gender
  }

  return (
    <div
      className="min-h-screen bg-gray-100 p-4 text-gray-900 relative"
      style={{ fontFamily: "Avenir, -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      <DotMatrix />
      <div className="max-w-sm mx-auto space-y-6 relative z-10 pt-4 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button onClick={onBack} variant="ghost" size="sm" className="p-2 hover:bg-gray-200">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl font-light tracking-wide text-black">My Profile</h1>
          <Button onClick={onSignOut} variant="ghost" size="sm" className="p-2 hover:bg-gray-200 text-red-600">
            <LogOut className="w-5 h-5" />
          </Button>
        </div>

        {/* Personal Information */}
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-light text-black">Personal Information</h2>
              {editingSection === "personal" ? (
                <div className="flex gap-2">
                  <Button onClick={() => handleSave("personal")} size="sm" variant="ghost" className="p-1">
                    <Save className="w-4 h-4 text-green-600" />
                  </Button>
                  <Button onClick={handleCancel} size="sm" variant="ghost" className="p-1">
                    <X className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              ) : (
                <Button onClick={() => setEditingSection("personal")} size="sm" variant="ghost" className="p-1">
                  <Edit3 className="w-4 h-4 text-gray-600" />
                </Button>
              )}
            </div>

            <div className="space-y-3">
              {editingSection === "personal" ? (
                <>
                  <div>
                    <Label className="text-sm text-gray-600">Name</Label>
                    <Input
                      value={tempUserData.name}
                      onChange={(e) => setTempUserData((prev) => ({ ...prev, name: e.target.value }))}
                      className="h-10 mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">Email</Label>
                    <Input
                      value={tempUserData.email}
                      onChange={(e) => setTempUserData((prev) => ({ ...prev, email: e.target.value }))}
                      className="h-10 mt-1"
                      disabled
                    />
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">Birthday</Label>
                    <Input
                      type="date"
                      value={tempGoalsData.birthday}
                      onChange={(e) => setTempGoalsData((prev) => ({ ...prev, birthday: e.target.value }))}
                      className="h-10 mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">Gender</Label>
                    <Select
                      value={tempGoalsData.gender}
                      onValueChange={(value) => setTempGoalsData((prev) => ({ ...prev, gender: value }))}
                    >
                      <SelectTrigger className="h-10 mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">Activity Level</Label>
                    <RadioGroup
                      value={tempGoalsData.activityLevel}
                      onValueChange={(value) => setTempGoalsData((prev) => ({ ...prev, activityLevel: value }))}
                      className="mt-2"
                    >
                      {activityLevels.map((level) => (
                        <div key={level.id} className="flex items-center space-x-2">
                          <RadioGroupItem value={level.id} id={level.id} />
                          <Label htmlFor={level.id} className="text-sm">
                            {level.title} ({level.subtitle})
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Name:</span>
                    <span className="text-sm font-medium">{userData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Email:</span>
                    <span className="text-sm font-medium">{userData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Birthday:</span>
                    <span className="text-sm font-medium">
                      {goalsData.birthday ? new Date(goalsData.birthday).toLocaleDateString() : "Not set"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Gender:</span>
                    <span className="text-sm font-medium">{getGenderDisplay(goalsData.gender)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Activity Level:</span>
                    <span className="text-sm font-medium">{getActivityLevelTitle(goalsData.activityLevel)}</span>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Weight Goals */}
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-light text-black">Weight Goals</h2>
              {editingSection === "weight" ? (
                <div className="flex gap-2">
                  <Button onClick={() => handleSave("weight")} size="sm" variant="ghost" className="p-1">
                    <Save className="w-4 h-4 text-green-600" />
                  </Button>
                  <Button onClick={handleCancel} size="sm" variant="ghost" className="p-1">
                    <X className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              ) : (
                <Button onClick={() => setEditingSection("weight")} size="sm" variant="ghost" className="p-1">
                  <Edit3 className="w-4 h-4 text-gray-600" />
                </Button>
              )}
            </div>

            <div className="space-y-3">
              {editingSection === "weight" ? (
                <>
                  <div>
                    <Label className="text-sm text-gray-600">Weight Unit</Label>
                    <Select
                      value={tempGoalsData.weightUnit}
                      onValueChange={(value: "lbs" | "kg") =>
                        setTempGoalsData((prev) => ({ ...prev, weightUnit: value }))
                      }
                    >
                      <SelectTrigger className="h-10 mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lbs">Pounds (lbs)</SelectItem>
                        <SelectItem value="kg">Kilograms (kg)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-sm text-gray-600">Current Weight</Label>
                      <Input
                        value={tempGoalsData.currentWeight}
                        onChange={(e) => setTempGoalsData((prev) => ({ ...prev, currentWeight: e.target.value }))}
                        className="h-10 mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">Goal Weight</Label>
                      <Input
                        value={tempGoalsData.goalWeight}
                        onChange={(e) => setTempGoalsData((prev) => ({ ...prev, goalWeight: e.target.value }))}
                        className="h-10 mt-1"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Current Weight:</span>
                    <span className="text-sm font-medium">
                      {goalsData.currentWeight} {goalsData.weightUnit}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Goal Weight:</span>
                    <span className="text-sm font-medium">
                      {goalsData.goalWeight} {goalsData.weightUnit}
                    </span>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Fitness Goals */}
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-light text-black">Fitness Goals</h2>
              {editingSection === "goals" ? (
                <div className="flex gap-2">
                  <Button onClick={() => handleSave("goals")} size="sm" variant="ghost" className="p-1">
                    <Save className="w-4 h-4 text-green-600" />
                  </Button>
                  <Button onClick={handleCancel} size="sm" variant="ghost" className="p-1">
                    <X className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              ) : (
                <Button onClick={() => setEditingSection("goals")} size="sm" variant="ghost" className="p-1">
                  <Edit3 className="w-4 h-4 text-gray-600" />
                </Button>
              )}
            </div>

            {editingSection === "goals" ? (
              <div className="space-y-3">
                <Label className="text-sm text-gray-600">Select up to 2 goals</Label>
                {mainGoals.map((goal) => (
                  <div
                    key={goal.id}
                    className={`flex items-start space-x-3 p-3 border border-gray-200 rounded-lg ${
                      !tempGoalsData.mainGoals.includes(goal.id) && tempGoalsData.mainGoals.length >= 2
                        ? "opacity-50"
                        : ""
                    }`}
                  >
                    <Checkbox
                      id={goal.id}
                      checked={tempGoalsData.mainGoals.includes(goal.id)}
                      onCheckedChange={(checked) => handleGoalToggle(goal.id, checked as boolean)}
                      disabled={!tempGoalsData.mainGoals.includes(goal.id) && tempGoalsData.mainGoals.length >= 2}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label htmlFor={goal.id} className="font-medium text-black cursor-pointer text-sm">
                        {goal.title}
                      </Label>
                      <p className="text-xs text-gray-600 mt-1">{goal.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {getGoalTitles(goalsData.mainGoals).map((title, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-600 rounded-full" />
                    <span className="text-sm font-medium">{title}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Workout Preferences */}
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-light text-black">Workout Preferences</h2>
              {editingSection === "workout" ? (
                <div className="flex gap-2">
                  <Button onClick={() => handleSave("workout")} size="sm" variant="ghost" className="p-1">
                    <Save className="w-4 h-4 text-green-600" />
                  </Button>
                  <Button onClick={handleCancel} size="sm" variant="ghost" className="p-1">
                    <X className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              ) : (
                <Button onClick={() => setEditingSection("workout")} size="sm" variant="ghost" className="p-1">
                  <Edit3 className="w-4 h-4 text-gray-600" />
                </Button>
              )}
            </div>

            <div className="space-y-3">
              {editingSection === "workout" ? (
                <>
                  <div>
                    <Label className="text-sm text-gray-600">Workout Frequency</Label>
                    <RadioGroup
                      value={tempGoalsData.workoutFrequency}
                      onValueChange={(value) => setTempGoalsData((prev) => ({ ...prev, workoutFrequency: value }))}
                      className="mt-2"
                    >
                      {workoutFrequencies.map((frequency) => (
                        <div key={frequency.id} className="flex items-center space-x-2">
                          <RadioGroupItem value={frequency.id} id={frequency.id} />
                          <Label htmlFor={frequency.id} className="text-sm">
                            {frequency.title}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">Workout Duration</Label>
                    <RadioGroup
                      value={tempGoalsData.workoutDuration}
                      onValueChange={(value) => setTempGoalsData((prev) => ({ ...prev, workoutDuration: value }))}
                      className="mt-2"
                    >
                      {workoutDurations.map((duration) => (
                        <div key={duration.id} className="flex items-center space-x-2">
                          <RadioGroupItem value={duration.id} id={duration.id} />
                          <Label htmlFor={duration.id} className="text-sm">
                            {duration.title}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Frequency:</span>
                    <span className="text-sm font-medium">{getWorkoutFrequencyTitle(goalsData.workoutFrequency)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Duration:</span>
                    <span className="text-sm font-medium">{getWorkoutDurationTitle(goalsData.workoutDuration)}</span>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
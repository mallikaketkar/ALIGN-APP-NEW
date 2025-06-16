"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Brain, Heart, Dumbbell, User, BookOpen, Play } from "lucide-react"
import ExercisesPage from "@/components/exercises-page"
import ProfilePage from "@/components/profile-page"
import ProTipsPage from "@/components/pro-tips-page"
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

interface DashboardProps {
  userData: UserData
  goalsData: GoalsData
  readinessScore: {
    physicalReadiness: number
    mentalReadiness: number
    recoveryReadiness: number
    overallReadiness: number
  }
  hasCompletedCheckin: boolean
  onUpdateUserData: (data: UserData) => void
  onUpdateGoalsData: (data: GoalsData) => void
  onStartCheckin: () => void
  onSignOut: () => void
}

export default function Dashboard({
  userData,
  goalsData,
  readinessScore,
  hasCompletedCheckin,
  onUpdateUserData,
  onUpdateGoalsData,
  onStartCheckin,
  onSignOut,
}: DashboardProps) {
  const [currentView, setCurrentView] = useState<"dashboard" | "exercises" | "profile" | "pro-tips">("dashboard")

  const getReadinessLevel = (score: number) => {
    if (score >= 80) return { level: "excellent", color: "bg-green-500" }
    if (score >= 60) return { level: "good", color: "bg-blue-500" }
    if (score >= 40) return { level: "moderate", color: "bg-yellow-500" }
    return { level: "low", color: "bg-red-500" }
  }

  const getRecommendation = (overall: number) => {
    if (overall >= 80) {
      return "You're in an excellent state today! This is your optimal performance window."
    } else if (overall >= 60) {
      return "You're showing solid readiness today! Your body is prepared for moderate to high intensity training."
    } else if (overall >= 40) {
      return "You're in a moderate readiness state today. Focus on technique refinement and active recovery."
    } else {
      return "Your body is asking for recovery today. Prioritize restoration and system reset."
    }
  }

  const overallLevel = getReadinessLevel(readinessScore.overallReadiness)

  if (currentView === "exercises") {
    return <ExercisesPage onBack={() => setCurrentView("dashboard")} />
  }

  if (currentView === "profile") {
    return (
      <ProfilePage
        userData={userData}
        goalsData={goalsData}
        onUpdateUserData={onUpdateUserData}
        onUpdateGoalsData={onUpdateGoalsData}
        onBack={() => setCurrentView("dashboard")}
        onSignOut={onSignOut}
      />
    )
  }

  if (currentView === "pro-tips") {
    return <ProTipsPage onBack={() => setCurrentView("dashboard")} />
  }

  // Dashboard view
  return (
    <div
      className="min-h-screen bg-gray-50 text-gray-900 relative"
      style={{ fontFamily: "Avenir, -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      <DotMatrix />
      <div className="max-w-sm mx-auto relative z-10 pt-6 pb-8">
        {/* Header */}
        <div className="text-center space-y-3 mb-8 px-4">
          <h2 className="text-xl font-medium text-gray-800">{userData.name}</h2>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          <p className="text-gray-600 font-medium text-sm">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="space-y-6 px-4">
          {/* Daily Readiness Check-In Card */}
          {!hasCompletedCheckin && (
            <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-black border-0 shadow-xl rounded-2xl">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{
                  backgroundImage: `url('/images/athlete-1.png')`,
                }}
              />
              <CardContent className="relative p-6 text-white">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Activity className="w-8 h-8 text-white" />
                    <div>
                      <h3 className="text-2xl font-bold tracking-tight">DAILY CHECK-IN</h3>
                      <p className="text-gray-200 text-sm font-medium">Optimize your performance</p>
                    </div>
                  </div>
                  <p className="text-gray-200 font-medium text-sm leading-relaxed">
                    Take your daily assessment to unlock personalized training recommendations.
                  </p>
                  <Button
                    onClick={onStartCheckin}
                    className="w-full bg-white text-gray-900 hover:bg-gray-100 font-bold tracking-wide h-14 text-lg rounded-xl shadow-lg"
                  >
                    START
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Today's Readiness Score - Only show if completed */}
          {hasCompletedCheckin && (
            <Card className="relative overflow-hidden bg-gradient-to-br from-red-800 to-black border-0 shadow-xl rounded-2xl">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{
                  backgroundImage: `url('/images/athlete-4.png')`,
                }}
              />
              <CardContent className="relative p-6 text-white">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold tracking-tight">READINESS SCORE</h3>
                      <p className="text-red-100 text-sm font-medium">Today's performance metrics</p>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold">{readinessScore.overallReadiness}</div>
                      <Badge className="bg-white/20 text-white text-xs px-2 py-1 font-medium">
                        {overallLevel.level}
                      </Badge>
                    </div>
                  </div>

                  {/* Quick Metrics */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <Activity className="w-5 h-5 text-red-200 mx-auto mb-1" />
                      <div className="text-lg font-bold">{readinessScore.physicalReadiness}</div>
                      <div className="text-xs text-red-200 font-medium">Physical</div>
                    </div>
                    <div className="text-center">
                      <Brain className="w-5 h-5 text-red-200 mx-auto mb-1" />
                      <div className="text-lg font-bold">{readinessScore.mentalReadiness}</div>
                      <div className="text-xs text-red-200 font-medium">Mental</div>
                    </div>
                    <div className="text-center">
                      <Heart className="w-5 h-5 text-red-200 mx-auto mb-1" />
                      <div className="text-lg font-bold">{readinessScore.recoveryReadiness}</div>
                      <div className="text-xs text-red-200 font-medium">Recovery</div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-red-400/30">
                    <p className="text-red-100 font-medium text-sm leading-relaxed">
                      {getRecommendation(readinessScore.overallReadiness)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Cards Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Explore Exercises Card */}
            <Card className="relative overflow-hidden bg-gradient-to-br from-gray-800 to-black border-0 shadow-xl rounded-2xl">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{
                  backgroundImage: `url('/images/athlete-2.png')`,
                }}
              />
              <CardContent className="relative p-0">
                <Button
                  onClick={() => setCurrentView("exercises")}
                  variant="ghost"
                  className="w-full h-40 flex flex-col items-center justify-center gap-3 hover:bg-black/10 rounded-2xl text-white"
                >
                  <Dumbbell className="w-8 h-8 text-white" />
                  <div className="text-center">
                    <div className="text-lg font-bold tracking-tight">EXPLORE</div>
                    <div className="text-lg font-bold tracking-tight">EXERCISES</div>
                    <div className="text-xs text-gray-300 font-medium mt-1">Browse workout library</div>
                  </div>
                </Button>
              </CardContent>
            </Card>

            {/* Pro Tips Card */}
            <Card className="relative overflow-hidden bg-gradient-to-br from-red-900 to-red-800 border-0 shadow-xl rounded-2xl">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{
                  backgroundImage: `url('/images/athlete-3.png')`,
                }}
              />
              <CardContent className="relative p-0">
                <Button
                  onClick={() => setCurrentView("pro-tips")}
                  variant="ghost"
                  className="w-full h-40 flex flex-col items-center justify-center gap-3 hover:bg-black/10 rounded-2xl text-white"
                >
                  <BookOpen className="w-8 h-8 text-white" />
                  <div className="text-center">
                    <div className="text-lg font-bold tracking-tight">PRO TIPS</div>
                    <div className="text-xs text-red-100 font-medium mt-1">Expert insights</div>
                  </div>
                </Button>
              </CardContent>
            </Card>

            {/* Start Workout Card */}
            <Card className="relative overflow-hidden bg-gradient-to-br from-red-800 to-red-900 border-0 shadow-xl rounded-2xl">
              <CardContent className="relative p-0">
                <Button
                  variant="ghost"
                  className="w-full h-40 flex flex-col items-center justify-center gap-3 hover:bg-black/10 rounded-2xl text-white"
                >
                  <Play className="w-8 h-8 text-white" />
                  <div className="text-center">
                    <div className="text-lg font-bold tracking-tight">START</div>
                    <div className="text-lg font-bold tracking-tight">WORKOUT</div>
                    <div className="text-xs text-red-100 font-medium mt-1">Begin training</div>
                  </div>
                </Button>
              </CardContent>
            </Card>

            {/* My Profile Card */}
            <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-black border-0 shadow-xl rounded-2xl">
              <CardContent className="relative p-0">
                <Button
                  onClick={() => setCurrentView("profile")}
                  variant="ghost"
                  className="w-full h-40 flex flex-col items-center justify-center gap-3 hover:bg-black/10 rounded-2xl text-white"
                >
                  <User className="w-8 h-8 text-white" />
                  <div className="text-center">
                    <div className="text-lg font-bold tracking-tight">MY PROFILE</div>
                    <div className="text-xs text-gray-300 font-medium mt-1">Settings & goals</div>
                  </div>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

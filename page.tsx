"use client"

import { useState, useEffect } from "react"
import SignInPage from "@/components/sign-in-page"
import SignupPage from "@/components/signup-page"
import PersonalInfoPage from "@/components/personal-info-page"
import WeightGoalsPage from "@/components/weight-goals-page"
import FitnessGoalsPage from "@/components/fitness-goals-page"
import ActivityLevelPage from "@/components/activity-level-page"
import WorkoutPreferencesPage from "@/components/workout-preferences-page"
import Dashboard from "@/components/dashboard"
import DailyReadinessFlow from "@/components/daily-readiness-flow"

export interface UserData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface GoalsData {
  birthday: string
  gender: string
  heightUnit: "feet" | "cm"
  heightFeet: string
  heightInches: string
  heightCm: string
  currentWeight: string
  goalWeight: string
  weightUnit: "lbs" | "kg"
  mainGoals: string[]
  activityLevel: string
  workoutFrequency: string
  workoutDuration: string
}

interface StoredUserProfile {
  userData: UserData
  goalsData: GoalsData
  hasCompletedOnboarding: boolean
}

type OnboardingStep =
  | "signin"
  | "signup"
  | "personal-info"
  | "weight-goals"
  | "fitness-goals"
  | "activity-level"
  | "workout-preferences"
  | "dashboard"
  | "checkin"

export default function Home() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("signin")
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [goalsData, setGoalsData] = useState<GoalsData>({
    birthday: "",
    gender: "",
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
  const [readinessScore, setReadinessScore] = useState({
    physicalReadiness: 0,
    mentalReadiness: 0,
    recoveryReadiness: 0,
    overallReadiness: 0,
  })
  const [hasCompletedCheckin, setHasCompletedCheckin] = useState(false)

  // Load user data from localStorage on component mount
  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser")
    if (currentUser) {
      const userEmail = JSON.parse(currentUser)
      const storedProfile = localStorage.getItem(`userProfile_${userEmail}`)
      if (storedProfile) {
        const profile: StoredUserProfile = JSON.parse(storedProfile)
        setUserData(profile.userData)
        setGoalsData(profile.goalsData)
        if (profile.hasCompletedOnboarding) {
          setCurrentStep("dashboard")
        }
      }
    }
  }, [])

  // Save user profile to localStorage
  const saveUserProfile = (userData: UserData, goalsData: GoalsData, hasCompletedOnboarding = false) => {
    const profile: StoredUserProfile = {
      userData,
      goalsData,
      hasCompletedOnboarding,
    }
    localStorage.setItem(`userProfile_${userData.email}`, JSON.stringify(profile))
    localStorage.setItem("currentUser", JSON.stringify(userData.email))
  }

  const handleSignIn = (email: string, password: string) => {
    // Check if user exists in localStorage
    const storedProfile = localStorage.getItem(`userProfile_${email}`)
    if (storedProfile) {
      const profile: StoredUserProfile = JSON.parse(storedProfile)
      // Verify password
      if (profile.userData.password === password) {
        setUserData(profile.userData)
        setGoalsData(profile.goalsData)
        localStorage.setItem("currentUser", JSON.stringify(email))

        if (profile.hasCompletedOnboarding) {
          setCurrentStep("dashboard")
        } else {
          // Continue onboarding from where they left off
          setCurrentStep("personal-info")
        }
      } else {
        alert("Invalid password")
      }
    } else {
      alert("User not found. Please sign up first.")
    }
  }

  const handleSignUp = (data: UserData) => {
    // Check if user already exists
    const existingProfile = localStorage.getItem(`userProfile_${data.email}`)
    if (existingProfile) {
      alert("User already exists. Please sign in instead.")
      return
    }

    setUserData(data)
    // Save initial user data
    saveUserProfile(data, goalsData, false)
    console.log("User Data stored:", data)
    setCurrentStep("personal-info")
  }

  const handlePersonalInfo = (data: Partial<GoalsData>) => {
    const updatedGoalsData = { ...goalsData, ...data }
    setGoalsData(updatedGoalsData)
    saveUserProfile(userData, updatedGoalsData, false)
    console.log("Personal info stored:", data)
    setCurrentStep("weight-goals")
  }

  const handleWeightGoals = (data: Partial<GoalsData>) => {
    const updatedGoalsData = { ...goalsData, ...data }
    setGoalsData(updatedGoalsData)
    saveUserProfile(userData, updatedGoalsData, false)
    console.log("Weight goals stored:", data)
    setCurrentStep("fitness-goals")
  }

  const handleFitnessGoals = (data: Partial<GoalsData>) => {
    const updatedGoalsData = { ...goalsData, ...data }
    setGoalsData(updatedGoalsData)
    saveUserProfile(userData, updatedGoalsData, false)
    console.log("Fitness goals stored:", data)
    setCurrentStep("activity-level")
  }

  const handleActivityLevel = (data: Partial<GoalsData>) => {
    const updatedGoalsData = { ...goalsData, ...data }
    setGoalsData(updatedGoalsData)
    saveUserProfile(userData, updatedGoalsData, false)
    console.log("Activity level stored:", data)
    setCurrentStep("workout-preferences")
  }

  const handleWorkoutPreferences = (data: Partial<GoalsData>) => {
    const finalGoalsData = { ...goalsData, ...data }
    setGoalsData(finalGoalsData)
    // Mark onboarding as completed
    saveUserProfile(userData, finalGoalsData, true)
    console.log("Workout preferences stored:", data)
    console.log("Complete goals data:", finalGoalsData)
    setCurrentStep("dashboard")
  }

  const handleStartCheckin = () => {
    setCurrentStep("checkin")
  }

  const handleReadinessComplete = (score: {
    physicalReadiness: number
    mentalReadiness: number
    recoveryReadiness: number
    overallReadiness: number
  }) => {
    setReadinessScore(score)
    setHasCompletedCheckin(true)
    setCurrentStep("dashboard")
  }

  const handleUpdateUserData = (data: UserData) => {
    setUserData(data)
    saveUserProfile(data, goalsData, true)
    console.log("User Data updated:", data)
  }

  const handleUpdateGoalsData = (data: GoalsData) => {
    setGoalsData(data)
    saveUserProfile(userData, data, true)
    console.log("Goals Data updated:", data)
  }

  const handleSignOut = () => {
    localStorage.removeItem("currentUser")
    setCurrentStep("signin")
    // Reset state
    setUserData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
    setGoalsData({
      birthday: "",
      gender: "",
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
    setReadinessScore({
      physicalReadiness: 0,
      mentalReadiness: 0,
      recoveryReadiness: 0,
      overallReadiness: 0,
    })
    setHasCompletedCheckin(false)
  }

  return (
    <>
      {currentStep === "signin" && (
        <SignInPage onSignIn={handleSignIn} onSwitchToSignUp={() => setCurrentStep("signup")} />
      )}
      {currentStep === "signup" && <SignupPage onSubmit={handleSignUp} onBack={() => setCurrentStep("signin")} />}
      {currentStep === "personal-info" && <PersonalInfoPage onSubmit={handlePersonalInfo} />}
      {currentStep === "weight-goals" && <WeightGoalsPage onSubmit={handleWeightGoals} />}
      {currentStep === "fitness-goals" && <FitnessGoalsPage onSubmit={handleFitnessGoals} />}
      {currentStep === "activity-level" && <ActivityLevelPage onSubmit={handleActivityLevel} />}
      {currentStep === "workout-preferences" && <WorkoutPreferencesPage onSubmit={handleWorkoutPreferences} />}
      {currentStep === "checkin" && (
        <DailyReadinessFlow
          userData={userData}
          goalsData={goalsData}
          onReadinessComplete={handleReadinessComplete}
          onBack={() => setCurrentStep("dashboard")}
        />
      )}
      {currentStep === "dashboard" && (
        <Dashboard
          userData={userData}
          goalsData={goalsData}
          readinessScore={readinessScore}
          hasCompletedCheckin={hasCompletedCheckin}
          onUpdateUserData={handleUpdateUserData}
          onUpdateGoalsData={handleUpdateGoalsData}
          onStartCheckin={handleStartCheckin}
          onSignOut={handleSignOut}
        />
      )}
    </>
  )
}

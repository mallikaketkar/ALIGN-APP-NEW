"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import { exerciseBank, type Exercise } from "@/data/exercise-bank"

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

interface ExercisesPageProps {
  onBack: () => void
}

export default function ExercisesPage({ onBack }: ExercisesPageProps) {
  const [filterType, setFilterType] = useState<"alphabetical" | "muscle-group" | "exercise-type">("alphabetical")
  const [muscleGroupFilter, setMuscleGroupFilter] = useState<"all" | "upper-body" | "lower-body" | "core">("all")
  const [exerciseTypeFilter, setExerciseTypeFilter] = useState<"all" | Exercise["type"]>("all")

  // Helper function to categorize muscle groups
  const getMuscleGroupCategory = (exercise: Exercise): "upper-body" | "lower-body" | "core" | "general" => {
    const upperBodyGroups = [
      "shoulders",
      "chest",
      "back",
      "arms",
      "biceps",
      "triceps",
      "lats",
      "rhomboids",
      "rear delts",
      "upper back",
      "rotator cuff",
      "forearms",
    ]
    const lowerBodyGroups = [
      "legs",
      "quads",
      "glutes",
      "hamstrings",
      "calves",
      "adductors",
      "hip flexors",
      "ankles",
      "knees",
    ]
    const coreGroups = ["core", "obliques"]

    const hasUpperBody = exercise.muscleGroups.some((group) =>
      upperBodyGroups.some((upperGroup) => group.toLowerCase().includes(upperGroup.toLowerCase())),
    )
    const hasLowerBody = exercise.muscleGroups.some((group) =>
      lowerBodyGroups.some((lowerGroup) => group.toLowerCase().includes(lowerGroup.toLowerCase())),
    )
    const hasCore = exercise.muscleGroups.some((group) =>
      coreGroups.some((coreGroup) => group.toLowerCase().includes(coreGroup.toLowerCase())),
    )

    if (hasCore) return "core"
    if (hasUpperBody) return "upper-body"
    if (hasLowerBody) return "lower-body"
    return "general"
  }

  // Filter and sort exercises
  const filteredExercises = useMemo(() => {
    let filtered = [...exerciseBank]

    // Apply muscle group filter
    if (filterType === "muscle-group" && muscleGroupFilter !== "all") {
      filtered = filtered.filter((exercise) => {
        const category = getMuscleGroupCategory(exercise)
        return category === muscleGroupFilter
      })
    }

    // Apply exercise type filter
    if (filterType === "exercise-type" && exerciseTypeFilter !== "all") {
      filtered = filtered.filter((exercise) => exercise.type === exerciseTypeFilter)
    }

    // Sort alphabetically
    if (filterType === "alphabetical") {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    }

    return filtered
  }, [filterType, muscleGroupFilter, exerciseTypeFilter])

  const getExerciseTypeLabel = (type: Exercise["type"]) => {
    const typeLabels = {
      strength: "Strength",
      cardio: "Cardio",
      flexibility: "Flexibility",
      plyometric: "Plyometric",
      core: "Core",
      warmup: "Warm-up",
    }
    return typeLabels[type] || type
  }

  const getMuscleGroupLabel = (exercise: Exercise) => {
    const category = getMuscleGroupCategory(exercise)
    const categoryLabels = {
      "upper-body": "Upper Body",
      "lower-body": "Lower Body",
      core: "Core",
      general: "General",
    }
    return categoryLabels[category]
  }

  const getDifficultyColor = (difficulty: Exercise["difficulty"]) => {
    const colors = {
      beginner: "bg-green-100 text-green-800",
      intermediate: "bg-yellow-100 text-yellow-800",
      advanced: "bg-red-100 text-red-800",
    }
    return colors[difficulty]
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
          <h1 className="text-3xl font-light tracking-wide text-gray-900">Exercises</h1>
          <div className="w-9" /> {/* Spacer for centering */}
        </div>

        {/* Filter Controls */}
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Filter By</label>
                <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alphabetical">Alphabetical Order</SelectItem>
                    <SelectItem value="muscle-group">Muscle Groups</SelectItem>
                    <SelectItem value="exercise-type">Exercise Type</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {filterType === "muscle-group" && (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Muscle Group</label>
                  <Select value={muscleGroupFilter} onValueChange={(value: any) => setMuscleGroupFilter(value)}>
                    <SelectTrigger className="h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Muscle Groups</SelectItem>
                      <SelectItem value="upper-body">Upper Body</SelectItem>
                      <SelectItem value="lower-body">Lower Body</SelectItem>
                      <SelectItem value="core">Core</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {filterType === "exercise-type" && (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Exercise Type</label>
                  <Select value={exerciseTypeFilter} onValueChange={(value: any) => setExerciseTypeFilter(value)}>
                    <SelectTrigger className="h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Exercise Types</SelectItem>
                      <SelectItem value="strength">Strength</SelectItem>
                      <SelectItem value="cardio">Cardio</SelectItem>
                      <SelectItem value="flexibility">Flexibility</SelectItem>
                      <SelectItem value="plyometric">Plyometric</SelectItem>
                      <SelectItem value="core">Core</SelectItem>
                      <SelectItem value="warmup">Warm-up</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="text-center">
          <p className="text-sm text-gray-600 font-light">
            Showing {filteredExercises.length} exercise{filteredExercises.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Exercise List */}
        <div className="space-y-3">
          {filteredExercises.map((exercise) => (
            <Card key={exercise.id} className="bg-white border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="font-medium text-gray-900 text-sm leading-tight flex-1 pr-2">{exercise.name}</h3>
                    <Badge className={`text-xs px-2 py-1 ${getDifficultyColor(exercise.difficulty)}`}>
                      {exercise.difficulty}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Muscle Group:</span>
                      <span className="font-medium text-gray-900">{getMuscleGroupLabel(exercise)}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Exercise Type:</span>
                      <span className="font-medium text-gray-900">{getExerciseTypeLabel(exercise.type)}</span>
                    </div>

                    <div className="flex items-start justify-between text-xs">
                      <span className="text-gray-600">Equipment:</span>
                      <div className="flex flex-wrap gap-1 justify-end max-w-[60%]">
                        {exercise.equipment.slice(0, 2).map((eq, index) => (
                          <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                            {eq}
                          </Badge>
                        ))}
                        {exercise.equipment.length > 2 && (
                          <Badge variant="outline" className="text-xs px-1 py-0">
                            +{exercise.equipment.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start justify-between text-xs">
                      <span className="text-gray-600">Targets:</span>
                      <div className="flex flex-wrap gap-1 justify-end max-w-[60%]">
                        {exercise.muscleGroups.slice(0, 2).map((muscle, index) => (
                          <Badge key={index} variant="secondary" className="text-xs px-1 py-0">
                            {muscle}
                          </Badge>
                        ))}
                        {exercise.muscleGroups.length > 2 && (
                          <Badge variant="secondary" className="text-xs px-1 py-0">
                            +{exercise.muscleGroups.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredExercises.length === 0 && (
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-8 text-center">
              <p className="text-gray-500 font-light">No exercises found matching your filters.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

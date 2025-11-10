"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Clock, Zap, Heart, TrendingUp, Play, RotateCcw, CheckCircle2, AlertCircle } from "lucide-react"

export default function ExercisePlanPage() {
  const [activeWorkout, setActiveWorkout] = useState<string | null>(null)
  const [workoutStarted, setWorkoutStarted] = useState(false)
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set())
  const [currentExerciseTime, setCurrentExerciseTime] = useState(0)

  const exercises = [
    {
      id: "warmup",
      name: "Warm-up",
      duration: 5,
      intensity: "Low",
      description: "Light cardio and stretching",
      color: "from-blue-50 to-blue-100",
      details: [
        "Arm circles: 30 seconds",
        "Leg swings: 30 seconds",
        "Jumping jacks: 1 minute",
        "Dynamic stretching: 2 minutes",
      ],
      caloriesBurned: 25,
      targetMuscles: ["Full Body"],
      instructions: "Start with light movements to increase heart rate and prepare muscles",
    },
    {
      id: "strength",
      name: "Strength Training",
      duration: 30,
      intensity: "High",
      description: "Upper body and core workout",
      color: "from-red-50 to-red-100",
      details: [
        "Push-ups: 3 sets x 12 reps",
        "Dumbbell rows: 3 sets x 10 reps",
        "Plank: 3 sets x 45 seconds",
        "Bicep curls: 3 sets x 12 reps",
        "Tricep dips: 3 sets x 10 reps",
      ],
      caloriesBurned: 180,
      targetMuscles: ["Chest", "Back", "Shoulders", "Arms", "Core"],
      instructions: "Maintain proper form. Rest 60 seconds between sets.",
    },
    {
      id: "cardio",
      name: "Cardio",
      duration: 20,
      intensity: "Moderate",
      description: "Running or cycling",
      color: "from-orange-50 to-orange-100",
      details: [
        "5 min: Moderate pace (warm-up)",
        "10 min: Steady state cardio",
        "3 min: High intensity intervals",
        "2 min: Cool down pace",
      ],
      caloriesBurned: 200,
      targetMuscles: ["Legs", "Cardiovascular System"],
      instructions: "Maintain steady breathing. Adjust intensity based on fitness level.",
    },
    {
      id: "cooldown",
      name: "Cool-down",
      duration: 5,
      intensity: "Low",
      description: "Stretching and breathing exercises",
      color: "from-green-50 to-green-100",
      details: [
        "Quad stretch: 30 seconds each leg",
        "Hamstring stretch: 30 seconds each leg",
        "Chest stretch: 30 seconds",
        "Deep breathing: 2 minutes",
      ],
      caloriesBurned: 15,
      targetMuscles: ["Full Body"],
      instructions: "Hold each stretch for 30 seconds. Focus on deep, controlled breathing.",
    },
  ]

  const totalDuration = exercises.reduce((sum, ex) => sum + ex.duration, 0)
  const totalCalories = exercises.reduce((sum, ex) => sum + ex.caloriesBurned, 0)

  const completeExercise = (exerciseId: string) => {
    const newCompleted = new Set(completedExercises)
    if (newCompleted.has(exerciseId)) {
      newCompleted.delete(exerciseId)
    } else {
      newCompleted.add(exerciseId)
    }
    setCompletedExercises(newCompleted)
  }

  const progressPercentage = (completedExercises.size / exercises.length) * 100

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-background via-muted to-background p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Personalized Exercise Plan</h1>
            <p className="text-muted-foreground">Tailored to your fitness level and health goals</p>
          </div>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-blue-900">Total Duration</h3>
              </div>
              <p className="text-3xl font-bold text-blue-600">{totalDuration} min</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="w-5 h-5 text-orange-600" />
                <h3 className="font-semibold text-orange-900">Calories Burned</h3>
              </div>
              <p className="text-3xl font-bold text-orange-600">~{totalCalories}</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
              <div className="flex items-center gap-3 mb-2">
                <Heart className="w-5 h-5 text-red-600" />
                <h3 className="font-semibold text-red-900">Avg Heart Rate</h3>
              </div>
              <p className="text-3xl font-bold text-red-600">~125 bpm</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-green-900">Progress</h3>
              </div>
              <p className="text-3xl font-bold text-green-600">{Math.round(progressPercentage)}%</p>
            </Card>
          </div>

          {/* Progress Bar */}
          <Card className="p-6 mb-8">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-foreground">Workout Progress</h3>
              <span className="text-sm text-muted-foreground">
                {completedExercises.size} of {exercises.length} completed
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-primary to-primary/70 h-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </Card>

          {/* Exercises */}
          <div className="space-y-4 mb-8">
            {exercises.map((exercise, index) => (
              <Card
                key={exercise.id}
                className={`p-6 bg-gradient-to-br ${exercise.color} border-opacity-50 cursor-pointer transition-all hover:shadow-lg ${
                  completedExercises.has(exercise.id) ? "opacity-60" : ""
                }`}
                onClick={() => setActiveWorkout(activeWorkout === exercise.id ? null : exercise.id)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-foreground">{exercise.name}</h3>
                      {completedExercises.has(exercise.id) && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                    </div>
                    <p className="text-sm text-muted-foreground">{exercise.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">{exercise.duration} min</p>
                    <p className="text-sm font-semibold text-primary">{exercise.intensity}</p>
                    <p className="text-xs text-muted-foreground mt-1">~{exercise.caloriesBurned} cal</p>
                  </div>
                </div>

                {/* Expanded Details */}
                {activeWorkout === exercise.id && (
                  <div className="mt-4 pt-4 border-t border-border/50 space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Instructions</h4>
                      <p className="text-sm text-muted-foreground">{exercise.instructions}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Exercises</h4>
                      <ul className="space-y-1">
                        {exercise.details.map((detail, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Target Muscles</h4>
                      <div className="flex flex-wrap gap-2">
                        {exercise.targetMuscles.map((muscle, idx) => (
                          <span key={idx} className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                            {muscle}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        completeExercise(exercise.id)
                      }}
                      variant={completedExercises.has(exercise.id) ? "default" : "outline"}
                      className="w-full"
                    >
                      {completedExercises.has(exercise.id) ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Completed
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Mark as Completed
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button className="flex-1" size="lg">
              <Play className="w-4 h-4 mr-2" />
              Start Workout
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent" size="lg">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset Progress
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent" size="lg">
              Modify Plan
            </Button>
          </div>

          {/* Tips */}
          <Card className="mt-8 p-6 bg-yellow-50 border-yellow-200">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-900 mb-1">Pro Tips</h4>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• Stay hydrated throughout your workout</li>
                  <li>• Maintain proper form over speed</li>
                  <li>• Rest 60-90 seconds between sets</li>
                  <li>• Track your progress to stay motivated</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </>
  )
}

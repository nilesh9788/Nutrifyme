"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Apple, Utensils, Flame } from "lucide-react"

export default function DietPlanPage() {
  const mealPlan = [
    {
      meal: "Breakfast",
      time: "7:00 AM",
      items: ["Oatmeal with berries", "Greek yogurt", "Honey"],
      calories: 350,
      protein: "12g",
    },
    {
      meal: "Mid-Morning Snack",
      time: "10:00 AM",
      items: ["Apple", "Almonds"],
      calories: 150,
      protein: "4g",
    },
    {
      meal: "Lunch",
      time: "1:00 PM",
      items: ["Grilled chicken breast", "Brown rice", "Steamed broccoli"],
      calories: 550,
      protein: "45g",
    },
    {
      meal: "Afternoon Snack",
      time: "4:00 PM",
      items: ["Banana", "Peanut butter"],
      calories: 200,
      protein: "8g",
    },
    {
      meal: "Dinner",
      time: "7:00 PM",
      items: ["Baked salmon", "Sweet potato", "Green salad"],
      calories: 600,
      protein: "40g",
    },
  ]

  const totalCalories = mealPlan.reduce((sum, meal) => sum + meal.calories, 0)
  const totalProtein = mealPlan.reduce((sum, meal) => {
    const proteinNum = Number.parseInt(meal.protein)
    return sum + proteinNum
  }, 0)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-background via-muted to-background p-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Personalized Diet Plan</h1>
            <p className="text-muted-foreground">Based on your health metrics and fitness goals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <div className="flex items-center gap-3 mb-2">
                <Flame className="w-5 h-5 text-orange-600" />
                <h3 className="font-semibold text-orange-900">Daily Calories</h3>
              </div>
              <p className="text-2xl font-bold text-orange-700">{totalCalories}</p>
              <p className="text-sm text-orange-600">kcal/day</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
              <div className="flex items-center gap-3 mb-2">
                <Utensils className="w-5 h-5 text-red-600" />
                <h3 className="font-semibold text-red-900">Protein</h3>
              </div>
              <p className="text-2xl font-bold text-red-700">{totalProtein}g</p>
              <p className="text-sm text-red-600">per day</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <div className="flex items-center gap-3 mb-2">
                <Apple className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-green-900">Meals</h3>
              </div>
              <p className="text-2xl font-bold text-green-700">{mealPlan.length}</p>
              <p className="text-sm text-green-600">per day</p>
            </Card>
          </div>

          <div className="space-y-4">
            {mealPlan.map((meal, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{meal.meal}</h3>
                    <p className="text-sm text-muted-foreground">{meal.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">{meal.calories} kcal</p>
                    <p className="text-sm text-muted-foreground">{meal.protein} protein</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {meal.items.map((item, idx) => (
                    <span key={idx} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex gap-4">
            <Button className="flex-1">Save Plan</Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              Customize
            </Button>
          </div>
        </div>
      </main>
    </>
  )
}

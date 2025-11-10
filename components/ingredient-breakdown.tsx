"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Info } from "lucide-react"

interface Ingredient {
  name: string
  percentage: number
  healthRating: "excellent" | "good" | "fair" | "poor"
  source: string
}

interface IngredientBreakdownProps {
  ingredients: Ingredient[]
}

export function IngredientBreakdown({ ingredients }: IngredientBreakdownProps) {
  const getHealthColor = (rating: string) => {
    switch (rating) {
      case "excellent":
        return "bg-green-100 text-green-800"
      case "good":
        return "bg-blue-100 text-blue-800"
      case "fair":
        return "bg-yellow-100 text-yellow-800"
      case "poor":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold text-foreground mb-6">Ingredient Breakdown</h2>

      <div className="space-y-4">
        {ingredients.map((ingredient, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{ingredient.name}</h3>
                <p className="text-sm text-muted-foreground">{ingredient.source}</p>
              </div>
              <Badge className={getHealthColor(ingredient.healthRating)}>
                {ingredient.healthRating.charAt(0).toUpperCase() + ingredient.healthRating.slice(1)}
              </Badge>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div
                className="bg-primary h-full rounded-full transition-all"
                style={{ width: `${ingredient.percentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{ingredient.percentage}% of product</span>
              <Info className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-8 p-4 bg-muted rounded-lg">
        <p className="text-sm font-semibold text-foreground mb-3">Health Ratings</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span>Excellent</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span>Good</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span>Fair</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span>Poor</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

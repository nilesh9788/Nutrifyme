"use client"

import { Card } from "@/components/ui/card"

interface NutritionInfo {
  calories: number
  fat: number
  saturatedFat: number
  transFat: number
  cholesterol: number
  sodium: number
  carbs: number
  fiber: number
  sugar: number
  protein: number
  vitaminA: number
  vitaminC: number
  calcium: number
  iron: number
}

interface NutritionFactsProps {
  nutrition: NutritionInfo
  servingSize: string
}

export function NutritionFacts({ nutrition, servingSize }: NutritionFactsProps) {
  const dailyValues = {
    fat: 78,
    saturatedFat: 20,
    cholesterol: 300,
    sodium: 2300,
    carbs: 275,
    fiber: 28,
    sugar: 50,
    protein: 50,
    vitaminA: 900,
    vitaminC: 90,
    calcium: 1300,
    iron: 18,
  }

  const getNutrientColor = (value: number, dailyValue: number) => {
    const percentage = (value / dailyValue) * 100
    if (percentage >= 20) return "text-green-600"
    if (percentage >= 10) return "text-blue-600"
    return "text-muted-foreground"
  }

  return (
    <Card className="p-6 border-2 border-border">
      <div className="border-b-2 border-border pb-4 mb-4">
        <h2 className="text-2xl font-bold text-foreground">Nutrition Facts</h2>
        <p className="text-sm text-muted-foreground mt-2">Serving Size: {servingSize}</p>
      </div>

      {/* Calories */}
      <div className="border-b border-border py-4 mb-4">
        <div className="flex justify-between items-baseline">
          <span className="text-sm font-semibold text-foreground">Calories</span>
          <span className="text-3xl font-bold text-foreground">{nutrition.calories}</span>
        </div>
      </div>

      {/* Main Nutrients */}
      <div className="space-y-3 mb-6">
        {[
          { label: "Total Fat", value: nutrition.fat, unit: "g", dv: dailyValues.fat },
          { label: "Saturated Fat", value: nutrition.saturatedFat, unit: "g", dv: dailyValues.saturatedFat },
          { label: "Trans Fat", value: nutrition.transFat, unit: "g", dv: 0 },
          { label: "Cholesterol", value: nutrition.cholesterol, unit: "mg", dv: dailyValues.cholesterol },
          { label: "Sodium", value: nutrition.sodium, unit: "mg", dv: dailyValues.sodium },
          { label: "Total Carbohydrate", value: nutrition.carbs, unit: "g", dv: dailyValues.carbs },
          { label: "Dietary Fiber", value: nutrition.fiber, unit: "g", dv: dailyValues.fiber },
          { label: "Total Sugars", value: nutrition.sugar, unit: "g", dv: dailyValues.sugar },
          { label: "Protein", value: nutrition.protein, unit: "g", dv: dailyValues.protein },
        ].map((nutrient, idx) => (
          <div key={idx} className="flex justify-between items-center text-sm">
            <span className="text-foreground">{nutrient.label}</span>
            <div className="flex items-center gap-4">
              <span className="font-semibold text-foreground">
                {nutrient.value}
                {nutrient.unit}
              </span>
              {nutrient.dv > 0 && (
                <span className={`text-xs font-semibold ${getNutrientColor(nutrient.value, nutrient.dv)}`}>
                  {Math.round((nutrient.value / nutrient.dv) * 100)}%
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Vitamins and Minerals */}
      <div className="border-t border-border pt-4">
        <p className="text-sm font-semibold text-foreground mb-3">Vitamins & Minerals</p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          {[
            { label: "Vitamin A", value: nutrition.vitaminA, unit: "mcg", dv: dailyValues.vitaminA },
            { label: "Vitamin C", value: nutrition.vitaminC, unit: "mg", dv: dailyValues.vitaminC },
            { label: "Calcium", value: nutrition.calcium, unit: "mg", dv: dailyValues.calcium },
            { label: "Iron", value: nutrition.iron, unit: "mg", dv: dailyValues.iron },
          ].map((nutrient, idx) => (
            <div key={idx} className="flex justify-between">
              <span className="text-muted-foreground">{nutrient.label}</span>
              <span className={`font-semibold ${getNutrientColor(nutrient.value, nutrient.dv)}`}>
                {nutrient.value}
                {nutrient.unit}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

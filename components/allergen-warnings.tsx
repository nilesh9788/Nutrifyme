"use client"

import { Card } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

interface AllergenWarningsProps {
  allergens: string[]
}

export function AllergenWarnings({ allergens }: AllergenWarningsProps) {
  if (allergens.length === 0) {
    return null
  }

  return (
    <Card className="p-6 bg-red-50 border-red-200">
      <div className="flex items-start gap-4">
        <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
        <div className="flex-1">
          <h3 className="text-lg font-bold text-red-900 mb-3">Allergen Warnings</h3>
          <p className="text-red-800 mb-4">This product contains the following allergens:</p>
          <div className="flex flex-wrap gap-2">
            {allergens.map((allergen, idx) => (
              <div key={idx} className="px-4 py-2 bg-red-200 text-red-900 rounded-lg font-semibold text-sm">
                {allergen}
              </div>
            ))}
          </div>
          <p className="text-sm text-red-700 mt-4">
            If you have allergies to any of these ingredients, please avoid this product and consult with a healthcare
            professional.
          </p>
        </div>
      </div>
    </Card>
  )
}

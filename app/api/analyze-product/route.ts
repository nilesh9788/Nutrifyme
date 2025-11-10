import { type NextRequest, NextResponse } from "next/server"
import { advancedMLPredictor } from "@/lib/advanced-ml-predictor"
import type { NutritionFacts } from "@/lib/types"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { nutritionFacts, ingredients, allergens, productName, brand, userProfile } = body

    // Validate required fields
    if (!nutritionFacts || !ingredients || !allergens) {
      return NextResponse.json(
        { error: "Missing required fields: nutritionFacts, ingredients, allergens" },
        { status: 400 },
      )
    }

    const prediction = advancedMLPredictor.predictHealthIndexAdvanced(
      nutritionFacts as NutritionFacts,
      ingredients as string[],
      allergens as string[],
      userProfile,
    )

    return NextResponse.json(
      {
        success: true,
        data: {
          productName,
          brand,
          ...prediction,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Analysis error:", error)
    return NextResponse.json({ error: "Failed to analyze product" }, { status: 500 })
  }
}

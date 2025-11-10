import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Mock product data
    const product = {
      id: params.id,
      name: "Organic Whole Wheat Bread",
      brand: "Nature's Best",
      healthScore: 78,
      riskLevel: "low",
      ingredients: [
        { name: "Whole Wheat Flour", percentage: 45, healthRating: "excellent" },
        { name: "Water", percentage: 25, healthRating: "excellent" },
        { name: "Yeast", percentage: 2, healthRating: "excellent" },
      ],
      allergens: ["Wheat", "Gluten"],
      nutrition: {
        calories: 80,
        protein: 4,
        carbs: 14,
        fat: 1,
      },
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({ product }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get("q")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    // Mock product data
    const products = [
      {
        id: "1",
        name: "Organic Whole Wheat Bread",
        brand: "Nature's Best",
        healthScore: 78,
        riskLevel: "low",
        ingredients: ["Whole Wheat Flour", "Water", "Yeast", "Salt", "Honey"],
        allergens: ["Wheat", "Gluten"],
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        name: "Greek Yogurt",
        brand: "Fage",
        healthScore: 85,
        riskLevel: "low",
        ingredients: ["Milk", "Live Cultures"],
        allergens: ["Dairy"],
        createdAt: new Date().toISOString(),
      },
    ]

    const filtered = query
      ? products.filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) || p.brand.toLowerCase().includes(query.toLowerCase()),
        )
      : products

    return NextResponse.json({ products: filtered.slice(0, limit), total: filtered.length }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const product = {
      id: Math.random().toString(36).substr(2, 9),
      ...body,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({ product, message: "Product created successfully" }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

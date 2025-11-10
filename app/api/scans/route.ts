import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get("userId")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    // Mock scan history
    const scans = [
      {
        id: "1",
        userId,
        productId: "1",
        productName: "Organic Whole Wheat Bread",
        healthScore: 78,
        riskLevel: "low",
        scannedAt: new Date().toISOString(),
      },
      {
        id: "2",
        userId,
        productId: "2",
        productName: "Greek Yogurt",
        healthScore: 85,
        riskLevel: "low",
        scannedAt: new Date().toISOString(),
      },
    ]

    return NextResponse.json({ scans: scans.slice(0, limit), total: scans.length }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const scan = {
      id: Math.random().toString(36).substr(2, 9),
      ...body,
      scannedAt: new Date().toISOString(),
    }

    return NextResponse.json({ scan, message: "Scan recorded successfully" }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

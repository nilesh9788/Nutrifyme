import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    // Validation
    if (!email || !password || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    const user = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      createdAt: new Date().toISOString(),
    }

    const token = Buffer.from(JSON.stringify(user)).toString("base64")
    return NextResponse.json({ user, token, message: "User registered successfully" }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

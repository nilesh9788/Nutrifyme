import { type NextRequest, NextResponse } from "next/server"

const DEMO_USER = {
  email: "demo@nutrify.com",
  password: "Demo@123456",
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }

    // Check against demo credentials
    if (email === DEMO_USER.email && password === DEMO_USER.password) {
      const user = {
        id: "demo-user-001",
        email,
        name: "Demo User",
        createdAt: new Date().toISOString(),
      }

      const token = Buffer.from(JSON.stringify(user)).toString("base64")
      return NextResponse.json({ user, token, message: "Login successful" }, { status: 200 })
    }

    // For other credentials, create a mock user
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: "User",
      createdAt: new Date().toISOString(),
    }

    const token = Buffer.from(JSON.stringify(user)).toString("base64")
    return NextResponse.json({ user, token, message: "Login successful" }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

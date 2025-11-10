import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Mock user data
    const user = {
      id: params.id,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      bio: "Health enthusiast | Nutritionist | Food lover",
      location: "San Francisco, CA",
      website: "www.sarahjohnson.com",
      followers: 1234,
      following: 567,
      posts: 89,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({ user }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    const user = {
      id: params.id,
      ...body,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({ user, message: "User updated successfully" }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

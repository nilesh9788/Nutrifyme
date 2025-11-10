import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const filter = searchParams.get("filter") || "all"

    // Mock community posts
    const posts = [
      {
        id: "1",
        authorId: "user1",
        authorName: "Sarah Johnson",
        content: "Just discovered this amazing organic bread!",
        productId: "1",
        productName: "Organic Whole Wheat Bread",
        likes: 234,
        comments: 45,
        shares: 12,
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        authorId: "user2",
        authorName: "Mike Chen",
        content: "Comparing two yogurt brands...",
        productId: "2",
        productName: "Greek Yogurt",
        likes: 567,
        comments: 89,
        shares: 34,
        createdAt: new Date().toISOString(),
      },
    ]

    return NextResponse.json({ posts: posts.slice(0, limit), total: posts.length }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const post = {
      id: Math.random().toString(36).substr(2, 9),
      ...body,
      likes: 0,
      comments: 0,
      shares: 0,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({ post, message: "Post created successfully" }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

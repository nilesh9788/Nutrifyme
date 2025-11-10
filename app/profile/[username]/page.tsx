"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, MapPin, LinkIcon, Calendar, Heart, MessageSquare } from "lucide-react"

export default function ProfilePage({ params }: { params: { username: string } }) {
  const user = {
    username: params.username,
    name: "Sarah Johnson",
    bio: "Health enthusiast | Nutritionist | Food lover",
    location: "San Francisco, CA",
    website: "www.sarahjohnson.com",
    joinDate: "Joined March 2024",
    followers: 1234,
    following: 567,
    posts: 89,
    avatar: "/avatar-1.png",
    isFollowing: false,
  }

  const userPosts = [
    {
      id: "1",
      content: "Just discovered this amazing organic bread!",
      product: "Organic Whole Wheat Bread",
      score: 78,
      likes: 234,
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      content: "Comparing two yogurt brands...",
      product: "Greek Yogurt",
      score: 85,
      likes: 567,
      timestamp: "1 day ago",
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <Link href="/community">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Profile</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-6">
              <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-24 h-24 rounded-full" />
              <div>
                <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
                <p className="text-muted-foreground">@{user.username}</p>
                <p className="text-foreground mt-2">{user.bio}</p>

                <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {user.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <LinkIcon className="w-4 h-4" />
                    {user.website}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {user.joinDate}
                  </div>
                </div>
              </div>
            </div>

            <Button>{user.isFollowing ? "Following" : "Follow"}</Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border">
            {[
              { label: "Posts", value: user.posts },
              { label: "Followers", value: user.followers },
              { label: "Following", value: user.following },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* User Posts */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Recent Posts</h2>
          <div className="space-y-4">
            {userPosts.map((post) => (
              <Card key={post.id} className="p-6">
                <p className="text-foreground mb-3">{post.content}</p>
                <div className="p-3 bg-muted rounded-lg mb-4">
                  <p className="font-semibold text-foreground">{post.product}</p>
                  <p className="text-sm text-muted-foreground">Score: {post.score}</p>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{post.timestamp}</span>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {post.likes}
                    </div>
                    <MessageSquare className="w-4 h-4" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

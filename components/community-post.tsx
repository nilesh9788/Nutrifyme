"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, MessageSquare, Share2, MoreVertical } from "lucide-react"

interface CommunityPostProps {
  post: {
    id: string
    author: {
      name: string
      avatar: string
      handle: string
      isFollowing: boolean
    }
    content: string
    product: {
      name: string
      score: number
      image: string
    }
    timestamp: string
    likes: number
    comments: number
    shares: number
    liked: boolean
  }
}

export function CommunityPost({ post }: CommunityPostProps) {
  const [liked, setLiked] = useState(post.liked)
  const [likeCount, setLikeCount] = useState(post.likes)

  const handleLike = () => {
    setLiked(!liked)
    setLikeCount(liked ? likeCount - 1 : likeCount + 1)
  }

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      {/* Post Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-1">
          <img
            src={post.author.avatar || "/placeholder.svg"}
            alt={post.author.name}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground">{post.author.name}</h3>
              <span className="text-muted-foreground text-sm">{post.author.handle}</span>
            </div>
            <p className="text-xs text-muted-foreground">{post.timestamp}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!post.author.isFollowing && (
            <Button variant="outline" size="sm">
              Follow
            </Button>
          )}
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Post Content */}
      <p className="text-foreground mb-4 leading-relaxed">{post.content}</p>

      {/* Product Card */}
      <Link href={`/product/1`}>
        <Card className="p-4 bg-muted mb-4 hover:bg-muted/80 transition-colors cursor-pointer border-0">
          <div className="flex items-center gap-4">
            <img
              src={post.product.image || "/placeholder.svg"}
              alt={post.product.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <p className="font-semibold text-foreground">{post.product.name}</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="text-2xl font-bold text-primary">{post.product.score}</div>
                <span className="text-xs text-muted-foreground">Health Score</span>
              </div>
            </div>
          </div>
        </Card>
      </Link>

      {/* Post Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 text-muted-foreground hover:text-primary"
          onClick={handleLike}
        >
          <Heart className={`w-4 h-4 ${liked ? "fill-current text-red-500" : ""}`} />
          <span className="text-xs">{likeCount}</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
          <MessageSquare className="w-4 h-4" />
          <span className="text-xs">{post.comments}</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
          <Share2 className="w-4 h-4" />
          <span className="text-xs">{post.shares}</span>
        </Button>
      </div>
    </Card>
  )
}

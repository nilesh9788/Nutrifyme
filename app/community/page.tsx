"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/navbar"
import { Users, Search, TrendingUp, MessageCircle, Share2, Award, ThumbsUp, Flag, Reply, Heart } from "lucide-react"
import { CreatePostModal } from "@/components/create-post-modal"

export default function CommunityPage() {
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState<"all" | "trending" | "following" | "reviews" | "discussions">("all")
  const [expandedComments, setExpandedComments] = useState<string | null>(null)
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set())
  const [activeDiscussion, setActiveDiscussion] = useState<string | null>(null)
  const [newReply, setNewReply] = useState<{ [key: string]: string }>({})

  const communityPosts = [
    {
      id: "1",
      author: {
        name: "Sarah Johnson",
        avatar: "/avatar-1.png",
        handle: "@sarahjohnson",
        isFollowing: false,
        followers: 1250,
        expertise: "Nutrition Expert",
        verified: true,
        badges: ["Verified Expert", "Top Contributor"],
        bio: "Certified Nutritionist with 10+ years experience",
      },
      content:
        "Just discovered this amazing organic bread! The health score is 78 and it has no artificial preservatives. Highly recommend for anyone trying to eat healthier. I've been using this for my meal prep for 2 weeks now.",
      product: {
        name: "Organic Whole Wheat Bread",
        score: 78,
        image: "/whole-wheat-bread.png",
        brand: "Nature's Best",
        price: "$4.99",
        rating: 4.8,
        reviews: 342,
      },
      timestamp: "2 hours ago",
      likes: 234,
      comments: 45,
      shares: 12,
      liked: false,
      rating: 4.8,
      verified: true,
      tags: ["organic", "healthy", "bread"],
      demographics: {
        ageGroup: "25-35",
        healthGoal: "Weight Loss",
        dietType: "Vegetarian",
      },
      replies: [
        {
          id: "r1",
          author: "Mike Chen",
          avatar: "/avatar-2.png",
          content: "Great find! I've been looking for a good bread option. Where did you get it?",
          likes: 12,
          timestamp: "1 hour ago",
          verified: true,
        },
        {
          id: "r2",
          author: "Emma Wilson",
          avatar: "/avatar-3.png",
          content: "Does it have any added sugars? I'm trying to cut down on sugar.",
          likes: 8,
          timestamp: "45 min ago",
          verified: false,
        },
      ],
      discussionThread: true,
      threadReplies: 12,
      helpfulCount: 156,
      notHelpfulCount: 8,
    },
    {
      id: "2",
      author: {
        name: "Mike Chen",
        avatar: "/avatar-2.png",
        handle: "@mikechen",
        isFollowing: true,
        followers: 3420,
        expertise: "Fitness Coach",
        verified: true,
        badges: ["Verified Expert", "Top Contributor", "Community Leader"],
        bio: "NASM Certified Personal Trainer",
      },
      content:
        "Comparing two yogurt brands - the Greek yogurt has a much better health score (85) compared to the flavored one (58). The difference is mainly in added sugars! Greek yogurt has 2g sugar vs 18g in flavored.",
      product: {
        name: "Greek Yogurt vs Flavored Yogurt",
        score: 85,
        image: "/yogurt.png",
        brand: "Multiple Brands",
        price: "$3.99 - $5.99",
        rating: 4.9,
        reviews: 521,
      },
      timestamp: "4 hours ago",
      likes: 567,
      comments: 89,
      shares: 34,
      liked: true,
      rating: 4.9,
      verified: true,
      tags: ["comparison", "yogurt", "sugar-content", "protein"],
      demographics: {
        ageGroup: "30-40",
        healthGoal: "Muscle Gain",
        dietType: "High Protein",
      },
      replies: [
        {
          id: "r3",
          author: "Sarah Johnson",
          avatar: "/avatar-1.png",
          content: "Excellent comparison! Sugar content is often overlooked. This is exactly what people need to know.",
          likes: 45,
          timestamp: "3 hours ago",
          verified: true,
        },
      ],
      discussionThread: true,
      threadReplies: 34,
      helpfulCount: 289,
      notHelpfulCount: 12,
    },
    {
      id: "3",
      author: {
        name: "Emma Wilson",
        avatar: "/avatar-3.png",
        handle: "@emmawilson",
        isFollowing: false,
        followers: 892,
        expertise: "Health Blogger",
        verified: false,
        badges: ["Active Member"],
        bio: "Passionate about healthy living and wellness",
      },
      content:
        "⚠️ WARNING: This granola cereal looks healthy but has a score of only 62. High sugar content (22g per serving) and artificial flavors. Better alternatives available! I tested 5 different brands.",
      product: {
        name: "Granola Cereal",
        score: 62,
        image: "/granola.png",
        brand: "Popular Brand",
        price: "$3.49",
        rating: 3.2,
        reviews: 189,
      },
      timestamp: "6 hours ago",
      likes: 892,
      comments: 156,
      shares: 78,
      liked: false,
      rating: 3.2,
      verified: false,
      tags: ["warning", "cereal", "high-sugar", "avoid"],
      demographics: {
        ageGroup: "20-30",
        healthGoal: "General Wellness",
        dietType: "Balanced",
      },
      replies: [
        {
          id: "r4",
          author: "John Doe",
          avatar: "/avatar-4.png",
          content: "Thanks for the warning! I was about to buy this for my kids. What alternatives do you recommend?",
          likes: 23,
          timestamp: "5 hours ago",
          verified: false,
        },
      ],
      discussionThread: true,
      threadReplies: 67,
      helpfulCount: 234,
      notHelpfulCount: 5,
    },
  ]

  const filteredPosts = communityPosts.filter((post) => {
    const matchesSearch =
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchQuery.toLowerCase())

    if (filter === "trending") return matchesSearch && post.likes > 500
    if (filter === "following") return matchesSearch && followedUsers.has(post.author.handle)
    if (filter === "reviews") return matchesSearch && post.rating > 0
    if (filter === "discussions") return matchesSearch && post.discussionThread

    return matchesSearch
  })

  const toggleLike = (postId: string) => {
    const newLiked = new Set(likedPosts)
    if (newLiked.has(postId)) {
      newLiked.delete(postId)
    } else {
      newLiked.add(postId)
    }
    setLikedPosts(newLiked)
  }

  const toggleFollow = (userHandle: string) => {
    const newFollowed = new Set(followedUsers)
    if (newFollowed.has(userHandle)) {
      newFollowed.delete(userHandle)
    } else {
      newFollowed.add(userHandle)
    }
    setFollowedUsers(newFollowed)
  }

  const submitReply = (postId: string) => {
    if (newReply[postId]?.trim()) {
      console.log(`[v0] Reply submitted to post ${postId}: ${newReply[postId]}`)
      setNewReply({ ...newReply, [postId]: "" })
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-background to-muted">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Users className="w-6 h-6" />
                Community
              </h1>
              <Button onClick={() => setShowCreatePost(true)}>Share Discovery</Button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search posts, products, and people..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {[
              { label: "All Posts", value: "all" },
              { label: "Trending", value: "trending" },
              { label: "Following", value: "following" },
              { label: "Reviews", value: "reviews" },
              { label: "Discussions", value: "discussions" },
            ].map((tab) => (
              <Button
                key={tab.value}
                variant={filter === tab.value ? "default" : "outline"}
                onClick={() => setFilter(tab.value as any)}
              >
                {tab.label}
              </Button>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Posts Feed */}
            <div className="lg:col-span-2 space-y-6">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <Card key={post.id} className="p-6 hover:shadow-lg transition-shadow">
                    {/* Author Info */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex gap-3 flex-1">
                        <img
                          src={post.author.avatar || "/placeholder.svg"}
                          alt={post.author.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-foreground">{post.author.name}</h3>
                            {post.verified && <Award className="w-4 h-4 text-blue-500" />}
                          </div>
                          <p className="text-sm text-muted-foreground">{post.author.handle}</p>
                          <p className="text-xs text-muted-foreground font-semibold">{post.author.expertise}</p>
                          <p className="text-xs text-muted-foreground">{post.author.bio}</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {post.author.badges.map((badge, idx) => (
                              <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                                {badge}
                              </span>
                            ))}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {post.author.followers.toLocaleString()} followers
                          </p>
                        </div>
                      </div>
                      <Button
                        variant={followedUsers.has(post.author.handle) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleFollow(post.author.handle)}
                      >
                        {followedUsers.has(post.author.handle) ? "Following" : "Follow"}
                      </Button>
                    </div>

                    {/* Post Content */}
                    <p className="text-foreground mb-4">{post.content}</p>

                    {/* Product Card */}
                    <Card className="p-4 bg-muted mb-4">
                      <div className="flex gap-4">
                        <img
                          src={post.product.image || "/placeholder.svg"}
                          alt={post.product.name}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground mb-1">{post.product.brand}</p>
                          <h4 className="font-semibold text-foreground mb-2">{post.product.name}</h4>
                          <div className="flex items-center gap-4 mb-2">
                            <div className="flex items-center gap-1">
                              <span className="text-2xl font-bold text-primary">{post.product.score}</span>
                              <span className="text-xs text-muted-foreground">Health Score</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-lg font-bold text-yellow-500">★</span>
                              <span className="text-sm font-semibold">{post.product.rating}</span>
                              <span className="text-xs text-muted-foreground">({post.product.reviews})</span>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">{post.product.price}</p>
                        </div>
                      </div>
                    </Card>

                    {/* Demographics */}
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-xs font-semibold text-blue-900 mb-2">Recommended For:</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          Age: {post.demographics.ageGroup}
                        </span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          Goal: {post.demographics.healthGoal}
                        </span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          Diet: {post.demographics.dietType}
                        </span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, idx) => (
                        <span key={idx} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Helpful/Not Helpful */}
                    <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-xs font-semibold text-green-900 mb-2">Community Feedback</p>
                      <div className="flex gap-4">
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4 text-green-600" />
                          <span className="text-xs font-semibold text-green-700">{post.helpfulCount} Helpful</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Flag className="w-4 h-4 text-red-600" />
                          <span className="text-xs font-semibold text-red-700">{post.notHelpfulCount} Not Helpful</span>
                        </div>
                      </div>
                    </div>

                    {/* Discussion Thread */}
                    {post.discussionThread && (
                      <div className="mb-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <p className="text-xs font-semibold text-purple-900 mb-2 flex items-center gap-2">
                          <MessageCircle className="w-3 h-3" />
                          Active Discussion ({post.threadReplies} replies)
                        </p>
                        <div className="space-y-2">
                          {post.replies.slice(0, 2).map((reply) => (
                            <div key={reply.id} className="text-xs bg-white p-2 rounded border border-purple-100">
                              <div className="flex items-center gap-2 mb-1">
                                <img
                                  src={reply.avatar || "/placeholder.svg"}
                                  alt={reply.author}
                                  className="w-5 h-5 rounded-full"
                                />
                                <p className="font-semibold text-purple-900">{reply.author}</p>
                                {reply.verified && <Award className="w-3 h-3 text-blue-500" />}
                              </div>
                              <p className="text-purple-700">{reply.content}</p>
                              <p className="text-purple-600 text-xs mt-1">{reply.timestamp}</p>
                            </div>
                          ))}
                        </div>

                        {/* Reply Input */}
                        {activeDiscussion === post.id && (
                          <div className="mt-3 space-y-2">
                            <textarea
                              placeholder="Write your reply..."
                              value={newReply[post.id] || ""}
                              onChange={(e) => setNewReply({ ...newReply, [post.id]: e.target.value })}
                              className="w-full p-2 text-xs border border-purple-200 rounded bg-white text-foreground"
                              rows={2}
                            />
                            <div className="flex gap-2">
                              <Button size="sm" onClick={() => submitReply(post.id)} className="flex-1">
                                Reply
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setActiveDiscussion(null)}
                                className="flex-1"
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        )}

                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-2 w-full text-purple-700"
                          onClick={() => setActiveDiscussion(activeDiscussion === post.id ? null : post.id)}
                        >
                          <Reply className="w-3 h-3 mr-1" />
                          {activeDiscussion === post.id ? "Hide" : "View"} All Replies
                        </Button>
                      </div>
                    )}

                    {/* Engagement Stats */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-xs text-muted-foreground">{post.timestamp}</span>
                      <div className="flex gap-4">
                        <button
                          onClick={() => toggleLike(post.id)}
                          className="flex items-center gap-1 hover:text-red-500 transition-colors"
                        >
                          <Heart className={`w-4 h-4 ${likedPosts.has(post.id) ? "fill-red-500 text-red-500" : ""}`} />
                          <span className="text-xs">{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-primary transition-colors">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-xs">{post.comments}</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-primary transition-colors">
                          <Share2 className="w-4 h-4" />
                          <span className="text-xs">{post.shares}</span>
                        </button>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-12 text-center">
                  <p className="text-muted-foreground text-lg">No posts found matching your search</p>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Trending Products */}
              <Card className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Trending Products
                </h3>
                <div className="space-y-3">
                  {[
                    { name: "Greek Yogurt", mentions: 234, score: 85, trend: "↑ 12%" },
                    { name: "Whole Wheat Bread", mentions: 189, score: 78, trend: "↑ 8%" },
                    { name: "Almond Butter", mentions: 156, score: 82, trend: "↑ 5%" },
                  ].map((product, idx) => (
                    <Link key={idx} href={`/product/${idx}`}>
                      <div className="p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold text-foreground text-sm">{product.name}</p>
                          <span className="text-xs font-bold text-primary">{product.score}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">{product.mentions} mentions</p>
                          <p className="text-xs text-green-600 font-semibold">{product.trend}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>

              {/* Top Contributors */}
              <Card className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Top Contributors
                </h3>
                <div className="space-y-3">
                  {[
                    { name: "Mike Chen", posts: 342, followers: 3420, expertise: "Fitness Coach", verified: true },
                    {
                      name: "Sarah Johnson",
                      posts: 256,
                      followers: 1250,
                      expertise: "Nutrition Expert",
                      verified: true,
                    },
                    { name: "Emma Wilson", posts: 189, followers: 892, expertise: "Health Blogger", verified: false },
                  ].map((contributor, idx) => (
                    <div key={idx} className="p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-foreground text-sm">{contributor.name}</p>
                          {contributor.verified && <Award className="w-3 h-3 text-blue-500" />}
                        </div>
                        <span className="text-xs font-bold text-primary">#{idx + 1}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{contributor.expertise}</p>
                      <p className="text-xs text-muted-foreground">
                        {contributor.posts} posts • {contributor.followers.toLocaleString()} followers
                      </p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Community Stats */}
              <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5">
                <h3 className="text-lg font-bold text-foreground mb-4">Community Stats</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Active Members</p>
                    <p className="text-2xl font-bold text-primary">12,450</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Posts This Week</p>
                    <p className="text-2xl font-bold text-primary">3,240</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Products Reviewed</p>
                    <p className="text-2xl font-bold text-primary">8,920</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Discussion Threads</p>
                    <p className="text-2xl font-bold text-primary">2,156</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Create Post Modal */}
        {showCreatePost && <CreatePostModal onClose={() => setShowCreatePost(false)} />}
      </main>
    </>
  )
}

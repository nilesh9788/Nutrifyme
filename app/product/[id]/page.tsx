"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Heart,
  Share2,
  AlertCircle,
  CheckCircle,
  Users,
  TrendingUp,
  MessageCircle,
  Star,
  Flag,
} from "lucide-react"
import { IngredientBreakdown } from "@/components/ingredient-breakdown"
import { NutritionFacts } from "@/components/nutrition-facts"
import { AllergenWarnings } from "@/components/allergen-warnings"
import { ProductComparison } from "@/components/product-comparison"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function ProductPage({ params }: { params: { id: string } }) {
  // Mock product data - in production, fetch from API
  const product = {
    id: params.id,
    name: "Organic Whole Wheat Bread",
    brand: "Nature's Best",
    image: "/whole-wheat-bread.png",
    healthScore: 78,
    riskLevel: "low" as const,
    servingSize: "1 slice (28g)",
    servingsPerContainer: 20,
    price: "$4.99",
    rating: 4.8,
    reviews: 342,
    ingredients: [
      { name: "Whole Wheat Flour", percentage: 45, healthRating: "excellent", source: "Organic" },
      { name: "Water", percentage: 25, healthRating: "excellent", source: "Filtered" },
      { name: "Yeast", percentage: 2, healthRating: "excellent", source: "Natural" },
      { name: "Sea Salt", percentage: 1.5, healthRating: "good", source: "Natural" },
      { name: "Honey", percentage: 2, healthRating: "good", source: "Organic" },
      { name: "Sunflower Oil", percentage: 1.5, healthRating: "good", source: "Cold-pressed" },
    ],
    allergens: ["Wheat", "Gluten"],
    nutrition: {
      calories: 80,
      fat: 1,
      saturatedFat: 0.2,
      transFat: 0,
      cholesterol: 0,
      sodium: 140,
      carbs: 14,
      fiber: 2,
      sugar: 1,
      protein: 4,
      vitaminA: 0,
      vitaminC: 0,
      calcium: 20,
      iron: 8,
    },
    certifications: ["USDA Organic", "Non-GMO Project Verified"],
    pros: [
      "High in fiber for digestive health",
      "Good source of plant-based protein",
      "No artificial preservatives",
      "Organic ingredients",
    ],
    cons: ["Contains gluten", "Higher sodium content", "May contain traces of nuts"],
    demographicHealthIndex: [
      { group: "Ages 18-25", score: 82, recommendation: "Excellent for young adults", count: 1250 },
      { group: "Ages 25-35", score: 85, recommendation: "Ideal for active professionals", count: 2340 },
      { group: "Ages 35-50", score: 78, recommendation: "Good for weight management", count: 1890 },
      { group: "Ages 50+", score: 75, recommendation: "Suitable with moderation", count: 1120 },
      { group: "Diabetics", score: 72, recommendation: "Monitor portion sizes", count: 450 },
      { group: "Athletes", score: 88, recommendation: "Great for muscle recovery", count: 2100 },
    ],
    healthGoalScores: [
      { goal: "Weight Loss", score: 85, users: 2340 },
      { goal: "Muscle Gain", score: 82, users: 1890 },
      { goal: "General Wellness", score: 80, users: 3120 },
      { goal: "Heart Health", score: 88, users: 2560 },
      { goal: "Diabetes Management", score: 72, users: 890 },
    ],
    communityInsights: {
      totalReviews: 342,
      averageRating: 4.8,
      recommendationRate: 92,
      ratingDistribution: [
        { stars: 5, count: 245, percentage: 72 },
        { stars: 4, count: 65, percentage: 19 },
        { stars: 3, count: 20, percentage: 6 },
        { stars: 2, count: 8, percentage: 2 },
        { stars: 1, count: 4, percentage: 1 },
      ],
      topReviewers: [
        {
          name: "Sarah Johnson",
          rating: 5,
          comment: "Best bread I've tried! Perfect texture and taste.",
          verified: true,
          helpful: 234,
          timestamp: "2 weeks ago",
        },
        {
          name: "Mike Chen",
          rating: 5,
          comment: "Perfect for my fitness goals. Great protein content.",
          verified: true,
          helpful: 189,
          timestamp: "3 weeks ago",
        },
        {
          name: "Emma Wilson",
          rating: 4,
          comment: "Good quality, slightly pricey but worth it.",
          verified: false,
          helpful: 156,
          timestamp: "1 month ago",
        },
        {
          name: "John Doe",
          rating: 5,
          comment: "No artificial ingredients. Highly recommended!",
          verified: true,
          helpful: 142,
          timestamp: "1 month ago",
        },
      ],
      commonPraises: [
        { phrase: "No artificial ingredients", count: 89 },
        { phrase: "Great taste", count: 76 },
        { phrase: "Good for health", count: 65 },
        { phrase: "Perfect texture", count: 54 },
      ],
      commonConcerns: [
        { phrase: "Price is high", count: 23 },
        { phrase: "Hard to find", count: 18 },
        { phrase: "Expires quickly", count: 12 },
      ],
    },
    purchaseData: {
      repurchaseRate: 87,
      averageFrequency: "Weekly",
      popularWith: "Health-conscious professionals",
    },
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/history">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Product Details</h1>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Product Header */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Product Image */}
          <Card className="p-6 flex items-center justify-center bg-muted">
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-auto rounded-lg" />
          </Card>

          {/* Product Info */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <p className="text-muted-foreground mb-2">{product.brand}</p>
              <h1 className="text-4xl font-bold text-foreground mb-4">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="text-5xl font-bold text-primary">{product.healthScore}</div>
                  <div className="text-sm text-muted-foreground">
                    <p>Health</p>
                    <p>Score</p>
                  </div>
                </div>
                <div
                  className={`px-4 py-2 rounded-lg border font-semibold ${
                    product.riskLevel === "low"
                      ? "bg-green-100 text-green-800 border-green-300"
                      : product.riskLevel === "medium"
                        ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                        : "bg-red-100 text-red-800 border-red-300"
                  }`}
                >
                  {product.riskLevel.charAt(0).toUpperCase() + product.riskLevel.slice(1)} Risk
                </div>
              </div>

              <div className="flex items-center gap-6 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Community Rating</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-yellow-500">★</span>
                    <span className="text-xl font-bold">{product.rating}</span>
                    <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Price</p>
                  <p className="text-2xl font-bold text-primary">{product.price}</p>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <p className="text-sm font-semibold text-muted-foreground mb-3">Certifications</p>
              <div className="flex flex-wrap gap-2">
                {product.certifications.map((cert, idx) => (
                  <Badge key={idx} variant="secondary">
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Pros and Cons */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-green-700 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Pros
                </p>
                <ul className="space-y-2">
                  {product.pros.map((pro, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-green-600 flex-shrink-0">✓</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-yellow-700 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Cons
                </p>
                <ul className="space-y-2">
                  {product.cons.map((con, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-yellow-600 flex-shrink-0">!</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Demographic Health Index */}
        <Card className="p-6 mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Users className="w-6 h-6" />
            Health Index by Demographics
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={product.demographicHealthIndex}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="group" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#3b82f6" name="Health Score" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.demographicHealthIndex.map((demo, idx) => (
              <div
                key={idx}
                className="p-4 bg-muted rounded-lg border border-border hover:border-primary transition-colors"
              >
                <p className="font-semibold text-foreground text-sm mb-1">{demo.group}</p>
                <p className="text-xs text-muted-foreground mb-2">{demo.recommendation}</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-primary">Score: {demo.score}/100</p>
                  <span className="text-xs text-muted-foreground">{demo.count} users</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Health Goals Suitability */}
        <Card className="p-6 mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            Suitability by Health Goals
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {product.healthGoalScores.map((goal, idx) => (
              <div key={idx} className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold text-foreground">{goal.goal}</p>
                    <p className="text-xs text-muted-foreground">{goal.users} users tracking this</p>
                  </div>
                  <span className="text-lg font-bold text-primary">{goal.score}/100</span>
                </div>
                <div className="w-full bg-background rounded-full h-2">
                  <div className="bg-primary h-full rounded-full transition-all" style={{ width: `${goal.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Community Insights */}
        <Card className="p-6 mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <MessageCircle className="w-6 h-6" />
            Community Insights & Reviews
          </h2>

          {/* Rating Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-900 mb-1">Total Reviews</p>
              <p className="text-3xl font-bold text-blue-600">{product.communityInsights.totalReviews}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-green-900 mb-1">Recommendation Rate</p>
              <p className="text-3xl font-bold text-green-600">{product.communityInsights.recommendationRate}%</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-900 mb-1">Average Rating</p>
              <p className="text-3xl font-bold text-yellow-600">★ {product.communityInsights.averageRating}</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-sm text-purple-900 mb-1">Repurchase Rate</p>
              <p className="text-3xl font-bold text-purple-600">{product.purchaseData.repurchaseRate}%</p>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-foreground mb-4">Rating Distribution</h3>
              <div className="space-y-3">
                {product.communityInsights.ratingDistribution.map((rating, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-12">
                      {[...Array(rating.stars)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div className="bg-primary h-full rounded-full" style={{ width: `${rating.percentage}%` }} />
                    </div>
                    <span className="text-sm font-semibold text-foreground w-12 text-right">{rating.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Common Feedback</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-green-700 mb-2">Top Praises</p>
                  <div className="space-y-2">
                    {product.communityInsights.commonPraises.map((praise, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 bg-green-50 rounded border border-green-200"
                      >
                        <p className="text-sm text-green-800">{praise.phrase}</p>
                        <span className="text-xs font-bold text-green-600">{praise.count}x</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-yellow-700 mb-2">Common Concerns</p>
                  <div className="space-y-2">
                    {product.communityInsights.commonConcerns.map((concern, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 bg-yellow-50 rounded border border-yellow-200"
                      >
                        <p className="text-sm text-yellow-800">{concern.phrase}</p>
                        <span className="text-xs font-bold text-yellow-600">{concern.count}x</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Reviews */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Top Community Reviews</h3>
            <div className="space-y-4">
              {product.communityInsights.topReviewers.map((review, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-muted rounded-lg border border-border hover:border-primary transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-foreground">{review.name}</p>
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs">
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                        ))}
                        <span className="text-xs text-muted-foreground">{review.timestamp}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Flag className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-foreground mb-3">{review.comment}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <button className="flex items-center gap-1 hover:text-primary transition-colors">
                      👍 Helpful ({review.helpful})
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Allergen Warnings */}
        <AllergenWarnings allergens={product.allergens} />

        {/* Nutrition Facts */}
        <div className="mt-12">
          <NutritionFacts nutrition={product.nutrition} servingSize={product.servingSize} />
        </div>

        {/* Ingredient Breakdown */}
        <div className="mt-12">
          <IngredientBreakdown ingredients={product.ingredients} />
        </div>

        {/* Product Comparison */}
        <div className="mt-12">
          <ProductComparison currentProduct={product.name} />
        </div>
      </div>
    </main>
  )
}

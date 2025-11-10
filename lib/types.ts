export interface User {
  id: string
  email: string
  name: string
  bio?: string
  location?: string
  website?: string
  avatarUrl?: string
  followers: number
  following: number
  createdAt: string
}

export interface Product {
  id: string
  name: string
  brand?: string
  barcode?: string
  healthScore: number
  riskLevel: "low" | "medium" | "high"
  ingredients: Ingredient[]
  allergens: string[]
  nutritionFacts: NutritionFacts
  certifications?: string[]
  createdAt: string
}

export interface Ingredient {
  name: string
  percentage: number
  healthRating: "excellent" | "good" | "fair" | "poor"
  source?: string
}

export interface NutritionFacts {
  calories: number
  fat: number
  saturatedFat: number
  transFat: number
  cholesterol: number
  sodium: number
  carbs: number
  fiber: number
  sugar: number
  protein: number
  vitaminA: number
  vitaminC: number
  calcium: number
  iron: number
}

export interface Scan {
  id: string
  userId: string
  productId: string
  imageUrl?: string
  healthScore: number
  riskLevel: "low" | "medium" | "high"
  scannedAt: string
}

export interface CommunityPost {
  id: string
  authorId: string
  authorName: string
  productId?: string
  content: string
  likesCount: number
  commentsCount: number
  sharesCount: number
  liked: boolean
  createdAt: string
}

export interface Comment {
  id: string
  postId: string
  authorId: string
  authorName: string
  content: string
  likesCount: number
  createdAt: string
}

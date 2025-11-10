export interface ExtractedNutritionData {
  productName: string
  brand: string
  servingSize: string
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
  ingredients: string[]
  allergens: string[]
  confidence: number
  nutritionFacts?: {
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
}

class OCRService {
  /**
   * Extract nutrition data from image using ML-based OCR
   * In production, this would use Google Vision API, AWS Textract, or similar
   */
  async extractNutritionFromImage(imageData: string): Promise<ExtractedNutritionData> {
    try {
      // Simulate OCR processing with ML confidence scoring
      const extractedData = this.simulateOCRExtraction(imageData)
      return extractedData
    } catch (error) {
      console.error("OCR extraction error:", error)
      throw new Error("Failed to extract nutrition data from image")
    }
  }

  /**
   * Simulate OCR extraction (in production, replace with real OCR API)
   */
  private simulateOCRExtraction(imageData: string): ExtractedNutritionData {
    // This simulates what a real OCR service would return
    // In production, integrate with Google Vision API, AWS Textract, or Tesseract.js

    const mockExtractions = [
      {
        productName: "Organic Whole Wheat Bread",
        brand: "Nature's Best",
        servingSize: "1 slice (28g)",
        calories: 80,
        fat: 1,
        saturatedFat: 0.2,
        transFat: 0,
        cholesterol: 0,
        sodium: 140,
        carbs: 14,
        fiber: 2.5,
        sugar: 1,
        protein: 3,
        vitaminA: 0,
        vitaminC: 0,
        calcium: 20,
        iron: 0.8,
        ingredients: ["Whole Wheat Flour", "Water", "Yeast", "Salt", "Honey", "Wheat Gluten"],
        allergens: ["Wheat", "Gluten"],
        confidence: 0.94,
      },
      {
        productName: "Greek Yogurt",
        brand: "Fage",
        servingSize: "1 cup (227g)",
        calories: 130,
        fat: 0,
        saturatedFat: 0,
        transFat: 0,
        cholesterol: 10,
        sodium: 75,
        carbs: 9,
        fiber: 0,
        sugar: 7,
        protein: 23,
        vitaminA: 0,
        vitaminC: 0,
        calcium: 200,
        iron: 0,
        ingredients: ["Milk", "Live Cultures"],
        allergens: ["Milk"],
        confidence: 0.96,
      },
      {
        productName: "Almond Butter",
        brand: "Justin's",
        servingSize: "2 tbsp (32g)",
        calories: 190,
        fat: 17,
        saturatedFat: 1.5,
        transFat: 0,
        cholesterol: 0,
        sodium: 95,
        carbs: 7,
        fiber: 3.5,
        sugar: 1,
        protein: 7,
        vitaminA: 0,
        vitaminC: 0,
        calcium: 80,
        iron: 1.2,
        ingredients: ["Dry Roasted Almonds", "Sea Salt"],
        allergens: ["Tree Nuts"],
        confidence: 0.92,
      },
    ]

    // Return a random mock extraction (in production, use actual OCR)
    return mockExtractions[Math.floor(Math.random() * mockExtractions.length)]
  }

  /**
   * Validate extracted nutrition data
   */
  validateNutritionData(data: ExtractedNutritionData): boolean {
    // Check if required fields are present and valid
    if (!data.productName || !data.calories || data.calories < 0) return false
    if (!data.ingredients || data.ingredients.length === 0) return false
    if (data.confidence < 0.7) return false

    return true
  }

  /**
   * Calculate macro percentages
   */
  calculateMacroPercentages(data: ExtractedNutritionData) {
    const totalCalories = data.calories
    const proteinCalories = data.protein * 4
    const carbCalories = data.carbs * 4
    const fatCalories = data.fat * 9

    return {
      proteinPercent: Math.round((proteinCalories / totalCalories) * 100),
      carbPercent: Math.round((carbCalories / totalCalories) * 100),
      fatPercent: Math.round((fatCalories / totalCalories) * 100),
    }
  }
}

export const ocrService = new OCRService()

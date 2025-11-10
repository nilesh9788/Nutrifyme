"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { CameraScanner } from "@/components/camera-scanner"
import { ScanResults } from "@/components/scan-results"
import { ArrowLeft, Loader2 } from "lucide-react"
import { healthIndexPredictor } from "@/lib/health-index-predictor"
import { ocrService } from "@/lib/ocr-service"

export default function ScannerPage() {
  const [scannedImage, setScannedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<any>(null)

  const handleManualInput = async (input: { type: "name" | "barcode"; value: string }) => {
    setIsAnalyzing(true)

    try {
      // Simulate API call to search for product by name or barcode
      const mockNutritionData = {
        productName: input.type === "name" ? input.value : "Product from Barcode",
        brand: "Brand Name",
        nutritionFacts: {
          calories: 240,
          fat: 2,
          saturatedFat: 0.5,
          transFat: 0,
          cholesterol: 0,
          sodium: 380,
          carbs: 45,
          fiber: 7,
          sugar: 3,
          protein: 9,
          vitaminA: 0,
          vitaminC: 0,
          calcium: 80,
          iron: 2.5,
        },
        ingredients: ["Whole Wheat Flour", "Water", "Yeast", "Salt", "Honey", "Wheat Gluten"],
        allergens: ["Wheat", "Gluten"],
      }

      const prediction = healthIndexPredictor.predictHealthIndex(
        mockNutritionData.nutritionFacts,
        mockNutritionData.ingredients,
        mockNutritionData.allergens,
        { age: 30, healthGoals: ["balanced-diet"] },
      )

      setResults({
        ...mockNutritionData,
        healthScore: prediction.healthScore,
        riskLevel: prediction.riskLevel,
        accuracy: prediction.accuracy,
        confidenceScore: prediction.confidenceScore,
        modelVersion: prediction.modelVersion,
        recommendations: prediction.recommendations,
        riskFactors: prediction.riskFactors,
        nutritionHighlights: {
          calories: mockNutritionData.nutritionFacts.calories,
          protein: mockNutritionData.nutritionFacts.protein,
          carbs: mockNutritionData.nutritionFacts.carbs,
          fat: mockNutritionData.nutritionFacts.fat,
        },
      })
    } catch (error) {
      console.error("Manual input analysis error:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleCapture = async (imageData: string) => {
    setScannedImage(imageData)
    setIsAnalyzing(true)

    try {
      // Step 1: Extract nutrition data from image using OCR
      const extractedData = await ocrService.extractNutritionFromImage(imageData)

      // Step 2: Get AI health prediction
      const prediction = healthIndexPredictor.predictHealthIndex(
        extractedData.nutritionFacts,
        extractedData.ingredients,
        extractedData.allergens,
        {
          age: 30,
          healthGoals: ["balanced-diet"],
        },
      )

      // Step 3: Combine all data for display
      setResults({
        productName: extractedData.productName,
        brand: extractedData.brand,
        healthScore: prediction.healthScore,
        riskLevel: prediction.riskLevel,
        accuracy: prediction.accuracy,
        confidenceScore: prediction.confidenceScore,
        modelVersion: prediction.modelVersion,
        ingredients: extractedData.ingredients,
        allergens: extractedData.allergens,
        nutritionHighlights: {
          calories: extractedData.calories,
          protein: extractedData.protein,
          carbs: extractedData.carbs,
          fat: extractedData.fat,
        },
        recommendations: prediction.recommendations,
        riskFactors: prediction.riskFactors,
      })
    } catch (error) {
      console.error("Analysis error:", error)
      // Fallback to mock data if OCR fails
      const mockNutritionData = {
        productName: "Organic Whole Wheat Bread",
        brand: "Nature's Best",
        nutritionFacts: {
          calories: 240,
          fat: 2,
          saturatedFat: 0.5,
          transFat: 0,
          cholesterol: 0,
          sodium: 380,
          carbs: 45,
          fiber: 7,
          sugar: 3,
          protein: 9,
          vitaminA: 0,
          vitaminC: 0,
          calcium: 80,
          iron: 2.5,
        },
        ingredients: ["Whole Wheat Flour", "Water", "Yeast", "Salt", "Honey", "Wheat Gluten"],
        allergens: ["Wheat", "Gluten"],
      }

      const prediction = healthIndexPredictor.predictHealthIndex(
        mockNutritionData.nutritionFacts,
        mockNutritionData.ingredients,
        mockNutritionData.allergens,
        { age: 30, healthGoals: ["balanced-diet"] },
      )

      setResults({
        ...mockNutritionData,
        healthScore: prediction.healthScore,
        riskLevel: prediction.riskLevel,
        accuracy: prediction.accuracy,
        confidenceScore: prediction.confidenceScore,
        modelVersion: prediction.modelVersion,
        recommendations: prediction.recommendations,
        riskFactors: prediction.riskFactors,
        nutritionHighlights: {
          calories: mockNutritionData.nutritionFacts.calories,
          protein: mockNutritionData.nutritionFacts.protein,
          carbs: mockNutritionData.nutritionFacts.carbs,
          fat: mockNutritionData.nutritionFacts.fat,
        },
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-background to-muted">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-foreground">Scan Food</h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {!results ? (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-foreground">
                  {isAnalyzing ? "Analyzing Your Food..." : "Point Your Camera at a Food Label"}
                </h2>
                <p className="text-muted-foreground">
                  {isAnalyzing
                    ? "Our AI is analyzing the ingredients and nutritional information with health index prediction"
                    : "Capture a clear image of the nutrition label or barcode, or search by name"}
                </p>
              </div>

              {isAnalyzing && (
                <div className="flex flex-col items-center justify-center gap-4">
                  <Loader2 className="w-12 h-12 text-primary animate-spin" />
                  <p className="text-muted-foreground">Processing with AI health prediction...</p>
                </div>
              )}

              {!isAnalyzing && <CameraScanner onCapture={handleCapture} onManualInput={handleManualInput} />}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Analysis Results</h2>
                <Button
                  onClick={() => {
                    setResults(null)
                    setScannedImage(null)
                  }}
                  variant="outline"
                >
                  Scan Another
                </Button>
              </div>
              <ScanResults result={results} />
            </div>
          )}
        </div>
      </main>
    </>
  )
}

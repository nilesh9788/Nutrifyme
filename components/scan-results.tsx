"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, AlertTriangle } from "lucide-react"
import { VoiceControlButton } from "./voice-control-button"
import { AccuracyMetrics } from "./accuracy-metrics"
import { voiceAssistant } from "@/lib/voice-assistant"

interface ScanResult {
  productName: string
  brand: string
  healthScore: number
  riskLevel: "low" | "medium" | "high"
  accuracy: number
  confidenceScore: number
  modelVersion?: string
  ingredients: string[]
  allergens: string[]
  nutritionHighlights: {
    calories: number
    protein: number
    carbs: number
    fat: number
  }
  recommendations: string[]
  riskFactors?: string[]
}

interface ScanResultsProps {
  result: ScanResult
}

export function ScanResults({ result }: ScanResultsProps) {
  const [hasSpoken, setHasSpoken] = useState(false)

  const getRiskColor = (level: string) => {
    switch (level) {
      case "low":
        return "bg-green-100 text-green-800 border-green-300"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "high":
        return "bg-red-100 text-red-800 border-red-300"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRiskIcon = (level: string) => {
    switch (level) {
      case "low":
        return <CheckCircle className="w-5 h-5" />
      case "medium":
        return <AlertTriangle className="w-5 h-5" />
      case "high":
        return <AlertCircle className="w-5 h-5" />
      default:
        return null
    }
  }

  const handleSpeak = async () => {
    await voiceAssistant.speakHealthScore(result.productName, result.healthScore, result.riskLevel, result.accuracy)
    if (result.allergens.length > 0) {
      await voiceAssistant.speakAllergens(result.allergens)
    }
    await voiceAssistant.speakNutritionSummary(
      result.nutritionHighlights.calories,
      result.nutritionHighlights.protein,
      result.nutritionHighlights.carbs,
      result.nutritionHighlights.fat,
    )
    await voiceAssistant.speakRecommendations(result.recommendations)
    setHasSpoken(true)
  }

  return (
    <div className="space-y-6">
      {/* Product Header */}
      <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground">{result.productName}</h2>
              <p className="text-muted-foreground">{result.brand}</p>
            </div>
            <VoiceControlButton onSpeak={handleSpeak} />
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex-1 min-w-[150px]">
              <div className="text-sm text-muted-foreground mb-2">Health Score</div>
              <div className="flex items-center gap-2">
                <div className="text-4xl font-bold text-primary">{result.healthScore}</div>
                <div className="text-sm text-muted-foreground">/100</div>
              </div>
            </div>

            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${getRiskColor(result.riskLevel)}`}>
              {getRiskIcon(result.riskLevel)}
              <span className="font-semibold capitalize">{result.riskLevel} Risk</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Prediction Accuracy</div>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold text-primary">{result.accuracy}%</div>
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Confidence Score</div>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold text-accent">{result.confidenceScore}%</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Accuracy Metrics */}
      <AccuracyMetrics
        accuracy={result.accuracy}
        confidenceScore={result.confidenceScore}
        modelVersion={result.modelVersion || "v1.2.0"}
      />

      {/* Nutrition */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Nutrition Facts</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Calories", value: result.nutritionHighlights.calories },
            { label: "Protein", value: `${result.nutritionHighlights.protein}g` },
            { label: "Carbs", value: `${result.nutritionHighlights.carbs}g` },
            { label: "Fat", value: `${result.nutritionHighlights.fat}g` },
          ].map((item) => (
            <div key={item.label} className="text-center p-3 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground">{item.label}</div>
              <div className="text-xl font-bold text-foreground">{item.value}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Risk Factors */}
      {result.riskFactors && result.riskFactors.length > 0 && (
        <Card className="p-6 border-yellow-200 bg-yellow-50">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            Risk Factors
          </h3>
          <ul className="space-y-2">
            {result.riskFactors.map((factor, idx) => (
              <li key={idx} className="flex gap-3 text-muted-foreground">
                <span className="text-yellow-600 font-bold">•</span>
                <span>{factor}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Ingredients */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Key Ingredients</h3>
        <div className="flex flex-wrap gap-2">
          {result.ingredients.map((ingredient, idx) => (
            <Badge key={idx} variant="secondary">
              {ingredient}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Allergens */}
      {result.allergens.length > 0 && (
        <Card className="p-6 border-destructive/20 bg-destructive/5">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-destructive" />
            Allergens
          </h3>
          <div className="flex flex-wrap gap-2">
            {result.allergens.map((allergen, idx) => (
              <Badge key={idx} variant="destructive">
                {allergen}
              </Badge>
            ))}
          </div>
        </Card>
      )}

      {/* Recommendations */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recommendations</h3>
        <ul className="space-y-2">
          {result.recommendations.map((rec, idx) => (
            <li key={idx} className="flex gap-3 text-muted-foreground">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}

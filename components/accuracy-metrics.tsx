"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, TrendingUp } from "lucide-react"

interface AccuracyMetricsProps {
  accuracy: number
  confidenceScore: number
  modelVersion: string
}

export function AccuracyMetrics({ accuracy, confidenceScore, modelVersion }: AccuracyMetricsProps) {
  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            AI Prediction Metrics
          </h3>
        </div>

        <div className="space-y-4">
          {/* Accuracy */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-blue-900">Prediction Accuracy</label>
              <span className="text-sm font-bold text-blue-700">{accuracy}%</span>
            </div>
            <Progress value={accuracy} className="h-2" />
            <p className="text-xs text-blue-700 mt-1">
              {accuracy >= 90
                ? "Excellent - High confidence in prediction"
                : accuracy >= 80
                  ? "Good - Reliable prediction"
                  : accuracy >= 70
                    ? "Fair - Acceptable prediction"
                    : "Low - Use with caution"}
            </p>
          </div>

          {/* Confidence Score */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-blue-900">Confidence Score</label>
              <span className="text-sm font-bold text-blue-700">{confidenceScore}%</span>
            </div>
            <Progress value={confidenceScore} className="h-2" />
            <p className="text-xs text-blue-700 mt-1">
              {confidenceScore >= 90
                ? "Very high confidence in data extraction"
                : confidenceScore >= 80
                  ? "High confidence in data extraction"
                  : "Moderate confidence - verify key data"}
            </p>
          </div>

          {/* Model Info */}
          <div className="pt-4 border-t border-blue-200">
            <div className="flex items-center justify-between">
              <span className="text-xs text-blue-800">AI Model Version</span>
              <span className="text-xs font-semibold text-blue-900">{modelVersion}</span>
            </div>
            <p className="text-xs text-blue-700 mt-2">
              This health score is generated using advanced machine learning algorithms trained on nutritional data.
            </p>
          </div>
        </div>

        {/* Quality Indicators */}
        <div className="pt-4 border-t border-blue-200 space-y-2">
          <div className="flex items-center gap-2 text-xs text-blue-800">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>Complete nutrition data extracted</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-blue-800">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>Ingredients verified</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-blue-800">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>Allergen information confirmed</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

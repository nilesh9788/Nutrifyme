"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, CheckCircle, TrendingUp, Brain } from "lucide-react"
import type { AdvancedHealthPrediction } from "@/lib/advanced-ml-predictor"

interface AdvancedScanResultsProps {
  prediction: AdvancedHealthPrediction
  productName?: string
  brand?: string
}

export function AdvancedScanResults({ prediction, productName, brand }: AdvancedScanResultsProps) {
  const getRiskColor = (level: string) => {
    switch (level) {
      case "low":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        {productName && <h2 className="text-2xl font-bold">{productName}</h2>}
        {brand && <p className="text-sm text-gray-600">{brand}</p>}
      </div>

      {/* Health Score Card */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Health Score</span>
            <span className="text-4xl font-bold text-blue-600">{prediction.healthScore}</span>
          </CardTitle>
          <CardDescription>Overall nutritional health assessment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Score Range</span>
              <span className="font-semibold">0-100</span>
            </div>
            <Progress value={prediction.healthScore} className="h-3" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Risk Level</p>
              <Badge className={getRiskColor(prediction.riskLevel)}>{prediction.riskLevel.toUpperCase()}</Badge>
            </div>
            <div>
              <p className="text-sm text-gray-600">Confidence</p>
              <p className="text-lg font-semibold">{prediction.confidenceScore}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Model Accuracy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Model Performance
          </CardTitle>
          <CardDescription>ML model accuracy metrics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Accuracy</p>
              <p className="text-2xl font-bold text-green-600">
                {Math.round(prediction.modelAccuracy.accuracy * 100)}%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Precision</p>
              <p className="text-2xl font-bold text-blue-600">
                {Math.round(prediction.modelAccuracy.precision * 100)}%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Recall</p>
              <p className="text-2xl font-bold text-purple-600">{Math.round(prediction.modelAccuracy.recall * 100)}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">F1 Score</p>
              <p className="text-2xl font-bold text-orange-600">
                {Math.round(prediction.modelAccuracy.f1Score * 100)}%
              </p>
            </div>
          </div>

          {/* Cross-Validation Scores */}
          <div className="pt-4 border-t">
            <p className="text-sm font-semibold mb-2">Cross-Validation Scores (5-Fold)</p>
            <div className="space-y-2">
              {prediction.crossValidationScores.map((score, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-xs text-gray-600 w-12">Fold {idx + 1}</span>
                  <Progress value={score * 100} className="flex-1 h-2" />
                  <span className="text-xs font-semibold w-12 text-right">{Math.round(score * 100)}%</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Analysis</CardTitle>
          <CardDescription>Component-wise health scores</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(prediction.detailedMetrics).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                <span className="font-semibold">{Math.round(value)}</span>
              </div>
              <Progress value={value} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Feature Importance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Feature Importance
          </CardTitle>
          <CardDescription>Most influential factors in prediction</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(prediction.featureImportance)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 8)
              .map(([feature, importance]) => (
                <div key={feature} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="capitalize">{feature.replace(/([A-Z])/g, " $1").trim()}</span>
                    <span className="font-semibold">{Math.round(importance * 100)}%</span>
                  </div>
                  <Progress value={importance * 100} className="h-2" />
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Factors */}
      {prediction.riskFactors.length > 0 && (
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="w-5 h-5" />
              Risk Factors
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {prediction.riskFactors.map((factor, idx) => (
              <Alert key={idx} className="border-l-4 border-l-red-500">
                <AlertDescription>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{factor.factor}</p>
                      <p className="text-sm text-gray-600 mt-1">Impact: {factor.impact}%</p>
                    </div>
                    <Badge className={getSeverityColor(factor.severity)}>{factor.severity}</Badge>
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      {prediction.recommendations.length > 0 && (
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {prediction.recommendations.map((rec, idx) => (
                <li key={idx} className="flex gap-2 text-sm">
                  <span className="text-green-600 font-bold">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Model Info */}
      <Card className="bg-gray-50">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Model Version</p>
              <p className="font-semibold">{prediction.modelVersion}</p>
            </div>
            <div>
              <p className="text-gray-600">Overall Accuracy</p>
              <p className="font-semibold">{prediction.accuracy}%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

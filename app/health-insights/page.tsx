"use client"

import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { AlertCircle, TrendingUp, CheckCircle, AlertTriangle } from "lucide-react"

export default function HealthInsightsPage() {
  const insights = [
    {
      title: "Blood Pressure Status",
      status: "normal",
      value: "120/80 mmHg",
      recommendation: "Your blood pressure is within normal range. Keep up the good work!",
      icon: CheckCircle,
      color: "green",
    },
    {
      title: "Blood Sugar Level",
      status: "warning",
      value: "115 mg/dL",
      recommendation: "Slightly elevated. Reduce sugar intake and increase physical activity.",
      icon: AlertTriangle,
      color: "yellow",
    },
    {
      title: "BMI Status",
      status: "normal",
      value: "24.5",
      recommendation: "Your BMI is in the healthy range. Maintain your current lifestyle.",
      icon: CheckCircle,
      color: "green",
    },
    {
      title: "Sleep Quality",
      status: "warning",
      value: "6.5 hours",
      recommendation: "You're getting less than recommended. Aim for 7-9 hours per night.",
      icon: AlertTriangle,
      color: "yellow",
    },
    {
      title: "Activity Level",
      status: "normal",
      value: "8,500 steps",
      recommendation: "Great activity level! You're close to the 10,000 step goal.",
      icon: TrendingUp,
      color: "blue",
    },
    {
      title: "Stress Level",
      status: "alert",
      value: "High",
      recommendation: "Consider meditation, yoga, or other stress-relief activities.",
      icon: AlertCircle,
      color: "red",
    },
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-background via-muted to-background p-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Health Insights & Recommendations</h1>
            <p className="text-muted-foreground">AI-powered analysis of your health metrics</p>
          </div>

          <div className="space-y-4">
            {insights.map((insight, index) => {
              const Icon = insight.icon
              const colorClasses = {
                green: "from-green-50 to-green-100 border-green-200",
                yellow: "from-yellow-50 to-yellow-100 border-yellow-200",
                blue: "from-blue-50 to-blue-100 border-blue-200",
                red: "from-red-50 to-red-100 border-red-200",
              }

              return (
                <Card
                  key={index}
                  className={`p-6 bg-gradient-to-br ${colorClasses[insight.color as keyof typeof colorClasses]}`}
                >
                  <div className="flex gap-4">
                    <Icon className={`w-6 h-6 flex-shrink-0 text-${insight.color}-600`} />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-1">{insight.title}</h3>
                      <p className="text-2xl font-bold text-primary mb-2">{insight.value}</p>
                      <p className="text-sm text-muted-foreground">{insight.recommendation}</p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </main>
    </>
  )
}

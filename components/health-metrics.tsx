"use client"

import { Card } from "@/components/ui/card"
import { Target, TrendingUp, AlertCircle, Heart } from "lucide-react"

export function HealthMetrics() {
  const metrics = [
    {
      icon: Target,
      label: "Average Health Score",
      value: "76",
      change: "+5",
      color: "text-primary",
    },
    {
      icon: TrendingUp,
      label: "Scans This Week",
      value: "12",
      change: "+3",
      color: "text-green-600",
    },
    {
      icon: AlertCircle,
      label: "High Risk Items",
      value: "2",
      change: "-1",
      color: "text-yellow-600",
    },
    {
      icon: Heart,
      label: "Healthy Choices",
      value: "8",
      change: "+2",
      color: "text-red-600",
    },
  ]

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, idx) => (
        <Card key={idx} className="p-6">
          <div className="flex items-start justify-between mb-4">
            <metric.icon className={`w-8 h-8 ${metric.color}`} />
            <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">
              {metric.change} this week
            </span>
          </div>
          <p className="text-muted-foreground text-sm mb-2">{metric.label}</p>
          <p className="text-3xl font-bold text-foreground">{metric.value}</p>
        </Card>
      ))}
    </div>
  )
}

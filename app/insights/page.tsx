"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { ArrowLeft, TrendingUp, AlertCircle, Lightbulb } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export default function InsightsPage() {
  const monthlyData = [
    { month: "Week 1", score: 70 },
    { month: "Week 2", score: 73 },
    { month: "Week 3", score: 75 },
    { month: "Week 4", score: 78 },
  ]

  const categoryBreakdown = [
    { name: "Healthy", value: 45, color: "#22c55e" },
    { name: "Moderate", value: 35, color: "#eab308" },
    { name: "Risky", value: 20, color: "#ef4444" },
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-background to-muted">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Health Insights</h1>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Monthly Trend */}
          <Card className="p-6 mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Monthly Progress</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: `1px solid var(--color-border)`,
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="var(--color-primary)"
                  strokeWidth={3}
                  dot={{ fill: "var(--color-primary)", r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Category Breakdown */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">Food Category Breakdown</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            {/* Key Metrics */}
            <div className="space-y-4">
              <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <div className="flex items-start gap-4">
                  <TrendingUp className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-green-900 mb-1">Positive Trend</h3>
                    <p className="text-sm text-green-800">Your health score has improved by 8 points this month</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-yellow-900 mb-1">Watch Out</h3>
                    <p className="text-sm text-yellow-800">You've scanned 3 high-risk items this week</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <div className="flex items-start gap-4">
                  <Lightbulb className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">Recommendation</h3>
                    <p className="text-sm text-blue-800">Try replacing sugary snacks with nuts and fruits</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Detailed Recommendations */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">Personalized Recommendations</h2>
            <div className="space-y-4">
              {[
                {
                  title: "Increase Whole Grains",
                  description:
                    "You've been choosing refined grains. Try whole wheat alternatives for better nutrition.",
                  impact: "Could improve score by 5-10 points",
                },
                {
                  title: "Reduce Added Sugars",
                  description:
                    "Your recent scans show high sugar content. Look for products with less than 5g per serving.",
                  impact: "Could improve score by 8-15 points",
                },
                {
                  title: "More Plant-Based Options",
                  description: "Consider adding more vegetables and legumes to your diet for better health outcomes.",
                  impact: "Could improve score by 10-20 points",
                },
              ].map((rec, idx) => (
                <div key={idx} className="p-4 bg-muted rounded-lg border border-border">
                  <h3 className="font-semibold text-foreground mb-2">{rec.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{rec.description}</p>
                  <p className="text-xs text-primary font-semibold">{rec.impact}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </>
  )
}

"use client"

import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

export function HealthTrends() {
  const weeklyData = [
    { day: "Mon", score: 72, scans: 2 },
    { day: "Tue", score: 75, scans: 3 },
    { day: "Wed", score: 78, scans: 2 },
    { day: "Thu", score: 76, scans: 1 },
    { day: "Fri", score: 80, scans: 4 },
    { day: "Sat", score: 79, scans: 3 },
    { day: "Sun", score: 77, scans: 2 },
  ]

  const categoryData = [
    { category: "Healthy", count: 24 },
    { category: "Moderate", count: 18 },
    { category: "Risky", count: 8 },
  ]

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Weekly Trend */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Weekly Health Score Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="day" stroke="var(--color-muted-foreground)" />
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
              strokeWidth={2}
              dot={{ fill: "var(--color-primary)", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Category Distribution */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Food Category Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="category" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: `1px solid var(--color-border)`,
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="count" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}

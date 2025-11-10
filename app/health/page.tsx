"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navbar } from "@/components/navbar"
import { Heart, Droplet, Activity, Moon, TrendingUp, AlertCircle, Download, Filter } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts"

export default function HealthPage() {
  const [healthData, setHealthData] = useState({
    bloodPressure: "",
    sugarLevel: "",
    pulse: "",
    bmi: "",
    cholesterol: "",
    waterIntake: "",
    sleepHours: "",
    steps: "",
    mood: "normal",
    stress: "low",
    exerciseMinutes: "",
    weight: "",
    temperature: "",
    oxygenLevel: "",
    allergies: "",
    medications: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("week")

  const healthHistory = [
    { date: "Oct 20", bp: 120, sugar: 95, pulse: 72, bmi: 24.5, steps: 8234, sleep: 7.5, exercise: 30 },
    { date: "Oct 21", bp: 118, sugar: 92, pulse: 70, bmi: 24.4, steps: 9120, sleep: 7.8, exercise: 45 },
    { date: "Oct 22", bp: 122, sugar: 98, pulse: 75, bmi: 24.6, steps: 7890, sleep: 7.2, exercise: 25 },
    { date: "Oct 23", bp: 119, sugar: 94, pulse: 71, bmi: 24.5, steps: 10234, sleep: 8.0, exercise: 60 },
    { date: "Oct 24", bp: 121, sugar: 96, pulse: 73, bmi: 24.7, steps: 8567, sleep: 7.4, exercise: 35 },
    { date: "Oct 25", bp: 120, sugar: 93, pulse: 72, bmi: 24.5, steps: 9876, sleep: 7.9, exercise: 50 },
    { date: "Oct 26", bp: 119, sugar: 95, pulse: 70, bmi: 24.4, steps: 8945, sleep: 7.6, exercise: 40 },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setHealthData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Health data submitted:", healthData)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const healthMetrics = [
    {
      icon: Heart,
      title: "Blood Pressure",
      normal: "120/80 mmHg",
      current: "120/78",
      status: "normal",
      color: "red",
      details:
        "Systolic/Diastolic pressure in mmHg. Normal range: 90-120 / 60-80. Elevated BP increases heart disease risk.",
      trend: "↓ 2% improvement",
    },
    {
      icon: Droplet,
      title: "Blood Sugar",
      normal: "70-100 mg/dL",
      current: "95 mg/dL",
      status: "normal",
      color: "blue",
      details: "Fasting glucose level. Elevated levels may indicate prediabetes. Optimal range: 70-100 mg/dL.",
      trend: "↑ 1% increase",
    },
    {
      icon: Activity,
      title: "Steps & Activity",
      normal: "10,000 steps",
      current: "8,234 steps",
      status: "good",
      color: "green",
      details: "Daily activity tracking. Aim for 10,000 steps for optimal cardiovascular health and weight management.",
      trend: "↓ 5% decrease",
    },
    {
      icon: Moon,
      title: "Sleep Quality",
      normal: "7-9 hours",
      current: "7.5 hours",
      status: "normal",
      color: "purple",
      details: "Sleep duration and quality. Affects metabolism, immune system, and mental health. Aim for 7-9 hours.",
      trend: "↑ 3% improvement",
    },
  ]

  const riskCategories = [
    {
      category: "Cardiovascular",
      risk: "Low",
      color: "green",
      metrics: ["BP: 120/78", "Pulse: 72 bpm", "Cholesterol: 180 mg/dL"],
      recommendation: "Maintain current exercise routine and diet",
    },
    {
      category: "Metabolic",
      risk: "Low",
      color: "green",
      metrics: ["Blood Sugar: 95 mg/dL", "BMI: 24.5", "Weight: 70 kg"],
      recommendation: "Continue balanced diet and regular exercise",
    },
    {
      category: "Respiratory",
      risk: "Low",
      color: "green",
      metrics: ["Oxygen Level: 98%", "Temperature: 37°C", "Exercise Capacity: Good"],
      recommendation: "Maintain current activity levels",
    },
    {
      category: "Sleep & Recovery",
      risk: "Moderate",
      color: "yellow",
      metrics: ["Sleep Hours: 7.5", "Sleep Quality: Good", "Stress Level: Moderate"],
      recommendation: "Try to maintain consistent sleep schedule",
    },
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-background via-muted to-background p-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Daily Health Tracking</h1>
              <p className="text-muted-foreground">
                Log your vital signs and lifestyle metrics for personalized recommendations
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {healthMetrics.map((metric, idx) => {
              const Icon = metric.icon
              return (
                <Card
                  key={idx}
                  className="p-4 bg-gradient-to-br from-card to-muted border-l-4 border-l-primary hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-700">
                      {metric.status.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground text-sm mb-1">{metric.title}</h3>
                  <p className="text-2xl font-bold text-primary mb-2">{metric.current}</p>
                  <p className="text-xs text-muted-foreground mb-2">Normal: {metric.normal}</p>
                  <p className="text-xs text-muted-foreground italic mb-2">{metric.details}</p>
                  <p className="text-xs font-semibold text-green-600">{metric.trend}</p>
                </Card>
              )
            })}
          </div>

          {/* Time Range Selector */}
          <div className="flex gap-2 mb-8">
            {(["week", "month", "year"] as const).map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? "default" : "outline"}
                onClick={() => setTimeRange(range)}
                size="sm"
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </Button>
            ))}
          </div>

          {/* Vital Signs Trends */}
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Vital Signs Trends ({timeRange === "week" ? "7-Day" : timeRange === "month" ? "30-Day" : "Annual"})
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={healthHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="bp" stroke="#ef4444" name="Blood Pressure (Systolic)" strokeWidth={2} />
                <Line type="monotone" dataKey="sugar" stroke="#3b82f6" name="Blood Sugar (mg/dL)" strokeWidth={2} />
                <Line type="monotone" dataKey="pulse" stroke="#8b5cf6" name="Pulse (bpm)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Activity & Sleep Trends */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Activity Trends
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={healthHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="steps" fill="#10b981" name="Steps" />
                  <Bar dataKey="exercise" fill="#f59e0b" name="Exercise (min)" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Moon className="w-5 h-5" />
                Sleep Trends
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={healthHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="sleep" fill="#8b5cf6" stroke="#8b5cf6" name="Sleep Hours" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Health Risk Assessment */}
          <Card className="p-6 mb-8 border-l-4 border-l-yellow-500">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              Comprehensive Health Risk Assessment
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {riskCategories.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border-2 ${
                    item.color === "green"
                      ? "bg-green-50 border-green-200"
                      : item.color === "yellow"
                        ? "bg-yellow-50 border-yellow-200"
                        : "bg-red-50 border-red-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <p
                      className={`text-sm font-semibold ${item.color === "green" ? "text-green-900" : item.color === "yellow" ? "text-yellow-900" : "text-red-900"}`}
                    >
                      {item.category}
                    </p>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        item.color === "green"
                          ? "bg-green-200 text-green-800"
                          : item.color === "yellow"
                            ? "bg-yellow-200 text-yellow-800"
                            : "bg-red-200 text-red-800"
                      }`}
                    >
                      {item.risk} Risk
                    </span>
                  </div>
                  <div className="space-y-1 mb-3">
                    {item.metrics.map((metric, midx) => (
                      <p
                        key={midx}
                        className={`text-xs ${item.color === "green" ? "text-green-700" : item.color === "yellow" ? "text-yellow-700" : "text-red-700"}`}
                      >
                        • {metric}
                      </p>
                    ))}
                  </div>
                  <p
                    className={`text-xs font-semibold ${item.color === "green" ? "text-green-800" : item.color === "yellow" ? "text-yellow-800" : "text-red-800"}`}
                  >
                    {item.recommendation}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Health Data Form */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">Log Your Health Data</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="bloodPressure">Blood Pressure (mmHg)</Label>
                  <Input
                    id="bloodPressure"
                    name="bloodPressure"
                    placeholder="120/80"
                    value={healthData.bloodPressure}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sugarLevel">Blood Sugar (mg/dL)</Label>
                  <Input
                    id="sugarLevel"
                    name="sugarLevel"
                    type="number"
                    placeholder="100"
                    value={healthData.sugarLevel}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pulse">Pulse (bpm)</Label>
                  <Input
                    id="pulse"
                    name="pulse"
                    type="number"
                    placeholder="72"
                    value={healthData.pulse}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bmi">BMI</Label>
                  <Input
                    id="bmi"
                    name="bmi"
                    type="number"
                    placeholder="24.5"
                    step="0.1"
                    value={healthData.bmi}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cholesterol">Cholesterol (mg/dL)</Label>
                  <Input
                    id="cholesterol"
                    name="cholesterol"
                    type="number"
                    placeholder="200"
                    value={healthData.cholesterol}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="waterIntake">Water Intake (liters)</Label>
                  <Input
                    id="waterIntake"
                    name="waterIntake"
                    type="number"
                    placeholder="2.5"
                    step="0.1"
                    value={healthData.waterIntake}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sleepHours">Sleep Hours</Label>
                  <Input
                    id="sleepHours"
                    name="sleepHours"
                    type="number"
                    placeholder="8"
                    step="0.5"
                    value={healthData.sleepHours}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="steps">Steps Today</Label>
                  <Input
                    id="steps"
                    name="steps"
                    type="number"
                    placeholder="8000"
                    value={healthData.steps}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="exerciseMinutes">Exercise Minutes</Label>
                  <Input
                    id="exerciseMinutes"
                    name="exerciseMinutes"
                    type="number"
                    placeholder="30"
                    value={healthData.exerciseMinutes}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    placeholder="70"
                    step="0.1"
                    value={healthData.weight}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="temperature">Temperature (°C)</Label>
                  <Input
                    id="temperature"
                    name="temperature"
                    type="number"
                    placeholder="37"
                    step="0.1"
                    value={healthData.temperature}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="oxygenLevel">Oxygen Level (%)</Label>
                  <Input
                    id="oxygenLevel"
                    name="oxygenLevel"
                    type="number"
                    placeholder="98"
                    value={healthData.oxygenLevel}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mood">Mood</Label>
                  <select
                    id="mood"
                    name="mood"
                    value={healthData.mood}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  >
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="normal">Normal</option>
                    <option value="poor">Poor</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stress">Stress Level</Label>
                  <select
                    id="stress"
                    name="stress"
                    value={healthData.stress}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  >
                    <option value="low">Low</option>
                    <option value="moderate">Moderate</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="allergies">Known Allergies</Label>
                  <Input
                    id="allergies"
                    name="allergies"
                    placeholder="e.g., Peanuts, Shellfish"
                    value={healthData.allergies}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medications">Current Medications</Label>
                  <Input
                    id="medications"
                    name="medications"
                    placeholder="e.g., Aspirin, Metformin"
                    value={healthData.medications}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {submitted && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                  Health data logged successfully! Check your personalized recommendations.
                </div>
              )}

              <Button type="submit" className="w-full">
                Log Health Data
              </Button>
            </form>
          </Card>
        </div>
      </main>
    </>
  )
}

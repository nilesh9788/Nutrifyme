"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/navbar"
import { ArrowLeft, Search, Trash2 } from "lucide-react"

interface ScanItem {
  id: string
  name: string
  brand: string
  score: number
  risk: "low" | "medium" | "high"
  date: string
  category: string
}

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterRisk, setFilterRisk] = useState<"all" | "low" | "medium" | "high">("all")

  const allScans: ScanItem[] = [
    {
      id: "1",
      name: "Organic Whole Wheat Bread",
      brand: "Nature's Best",
      score: 78,
      risk: "low",
      date: "Today",
      category: "Bread",
    },
    { id: "2", name: "Greek Yogurt", brand: "Fage", score: 85, risk: "low", date: "Yesterday", category: "Dairy" },
    {
      id: "3",
      name: "Granola Cereal",
      brand: "Nature Valley",
      score: 62,
      risk: "medium",
      date: "2 days ago",
      category: "Cereal",
    },
    {
      id: "4",
      name: "Almond Butter",
      brand: "Justin's",
      score: 88,
      risk: "low",
      date: "3 days ago",
      category: "Spreads",
    },
    {
      id: "5",
      name: "Chocolate Chip Cookies",
      brand: "Oreo",
      score: 35,
      risk: "high",
      date: "4 days ago",
      category: "Snacks",
    },
    {
      id: "6",
      name: "Whole Grain Pasta",
      brand: "Barilla",
      score: 72,
      risk: "low",
      date: "5 days ago",
      category: "Pasta",
    },
    {
      id: "7",
      name: "Flavored Yogurt",
      brand: "Yoplait",
      score: 58,
      risk: "medium",
      date: "6 days ago",
      category: "Dairy",
    },
    { id: "8", name: "Olive Oil", brand: "Extra Virgin", score: 92, risk: "low", date: "1 week ago", category: "Oils" },
  ]

  const filteredScans = allScans.filter((scan) => {
    const matchesSearch =
      scan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scan.brand.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRisk = filterRisk === "all" || scan.risk === filterRisk
    return matchesSearch && matchesRisk
  })

  const getRiskColor = (risk: string) => {
    switch (risk) {
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
            <h1 className="text-2xl font-bold text-foreground">Scan History</h1>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search and Filter */}
          <Card className="p-6 mb-8">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search by product name or brand..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  variant={filterRisk === "all" ? "default" : "outline"}
                  onClick={() => setFilterRisk("all")}
                  size="sm"
                >
                  All Items
                </Button>
                <Button
                  variant={filterRisk === "low" ? "default" : "outline"}
                  onClick={() => setFilterRisk("low")}
                  size="sm"
                  className={filterRisk === "low" ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  Low Risk
                </Button>
                <Button
                  variant={filterRisk === "medium" ? "default" : "outline"}
                  onClick={() => setFilterRisk("medium")}
                  size="sm"
                  className={filterRisk === "medium" ? "bg-yellow-600 hover:bg-yellow-700" : ""}
                >
                  Medium Risk
                </Button>
                <Button
                  variant={filterRisk === "high" ? "default" : "outline"}
                  onClick={() => setFilterRisk("high")}
                  size="sm"
                  className={filterRisk === "high" ? "bg-red-600 hover:bg-red-700" : ""}
                >
                  High Risk
                </Button>
              </div>
            </div>
          </Card>

          {/* Scans List */}
          <div className="space-y-4">
            {filteredScans.length > 0 ? (
              filteredScans.map((scan) => (
                <Card key={scan.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground">{scan.name}</h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span>{scan.brand}</span>
                        <span>•</span>
                        <span>{scan.category}</span>
                        <span>•</span>
                        <span>{scan.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className={`px-4 py-2 rounded-lg border font-semibold text-sm ${getRiskColor(scan.risk)}`}>
                        {scan.risk.charAt(0).toUpperCase() + scan.risk.slice(1)} Risk
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-primary">{scan.score}</div>
                        <p className="text-xs text-muted-foreground">Score</p>
                      </div>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground text-lg">No scans found matching your filters</p>
              </Card>
            )}
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="p-6 text-center">
              <p className="text-muted-foreground mb-2">Total Scans</p>
              <p className="text-4xl font-bold text-primary">{allScans.length}</p>
            </Card>
            <Card className="p-6 text-center">
              <p className="text-muted-foreground mb-2">Average Score</p>
              <p className="text-4xl font-bold text-primary">
                {Math.round(allScans.reduce((sum, s) => sum + s.score, 0) / allScans.length)}
              </p>
            </Card>
            <Card className="p-6 text-center">
              <p className="text-muted-foreground mb-2">Healthy Choices</p>
              <p className="text-4xl font-bold text-green-600">{allScans.filter((s) => s.risk === "low").length}</p>
            </Card>
          </div>
        </div>
      </main>
    </>
  )
}

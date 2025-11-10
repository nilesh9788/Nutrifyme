"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Camera, History, TrendingUp, Users } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { HealthMetrics } from "@/components/health-metrics"
import { HealthTrends } from "@/components/health-trends"

export default function DashboardPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-background to-muted">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-2">Welcome Back!</h1>
            <p className="text-lg text-muted-foreground">Track your food choices and improve your health</p>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Link href="/scanner">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <Camera className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Scan Food</h3>
                <p className="text-muted-foreground text-sm">Analyze a new product</p>
              </Card>
            </Link>

            <Link href="/history">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <History className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Scan History</h3>
                <p className="text-muted-foreground text-sm">View your recent scans</p>
              </Card>
            </Link>

            <Link href="/insights">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <TrendingUp className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Health Insights</h3>
                <p className="text-muted-foreground text-sm">Your nutrition trends</p>
              </Card>
            </Link>

            <Link href="/community">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <Users className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Community</h3>
                <p className="text-muted-foreground text-sm">Connect with others</p>
              </Card>
            </Link>
          </div>

          {/* Health Metrics */}
          <HealthMetrics />

          {/* Health Trends */}
          <div className="mt-12">
            <HealthTrends />
          </div>

          {/* Recent Scans */}
          <Card className="p-6 mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Recent Scans</h2>
              <Link href="/history">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {[
                { name: "Organic Whole Wheat Bread", score: 78, date: "Today", risk: "low" },
                { name: "Greek Yogurt", score: 85, date: "Yesterday", risk: "low" },
                { name: "Granola Cereal", score: 62, date: "2 days ago", risk: "medium" },
              ].map((scan, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{scan.name}</p>
                    <p className="text-sm text-muted-foreground">{scan.date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        scan.risk === "low"
                          ? "bg-green-100 text-green-800"
                          : scan.risk === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {scan.risk.charAt(0).toUpperCase() + scan.risk.slice(1)} Risk
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{scan.score}</div>
                      <p className="text-xs text-muted-foreground">Score</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </>
  )
}

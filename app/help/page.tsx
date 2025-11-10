"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, MessageSquare, Mail, Phone } from "lucide-react"
import { useState } from "react"

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const helpArticles = [
    {
      category: "Getting Started",
      articles: [
        { title: "How to scan your first food", slug: "scan-first-food" },
        { title: "Understanding health scores", slug: "health-scores" },
        { title: "Setting up your profile", slug: "setup-profile" },
      ],
    },
    {
      category: "Features",
      articles: [
        { title: "Using the camera scanner", slug: "camera-scanner" },
        { title: "Viewing your scan history", slug: "scan-history" },
        { title: "Understanding allergen warnings", slug: "allergens" },
        { title: "Sharing with the community", slug: "community-sharing" },
      ],
    },
    {
      category: "Account & Privacy",
      articles: [
        { title: "Changing your password", slug: "change-password" },
        { title: "Privacy settings", slug: "privacy-settings" },
        { title: "Deleting your account", slug: "delete-account" },
      ],
    },
  ]

  const filteredArticles = helpArticles
    .map((category) => ({
      ...category,
      articles: category.articles.filter((article) => article.title.toLowerCase().includes(searchQuery.toLowerCase())),
    }))
    .filter((category) => category.articles.length > 0)

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Help & Support</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search */}
        <Card className="p-6 mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </Card>

        {/* Articles */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-8">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((category) => (
                <div key={category.category}>
                  <h2 className="text-2xl font-bold text-foreground mb-4">{category.category}</h2>
                  <div className="space-y-3">
                    {category.articles.map((article) => (
                      <Card key={article.slug} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                        <p className="font-semibold text-foreground hover:text-primary">{article.title}</p>
                        <p className="text-sm text-muted-foreground mt-1">Read article →</p>
                      </Card>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No articles found matching your search</p>
              </Card>
            )}
          </div>

          {/* Contact Support */}
          <div className="space-y-4">
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <h3 className="text-lg font-bold text-foreground mb-4">Need More Help?</h3>
              <div className="space-y-3">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Live Chat
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Support
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Us
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-bold text-foreground mb-3">Quick Links</h3>
              <div className="space-y-2">
                <Link href="/about" className="block text-primary hover:underline">
                  About Us
                </Link>
                <Link href="#" className="block text-primary hover:underline">
                  Privacy Policy
                </Link>
                <Link href="#" className="block text-primary hover:underline">
                  Terms of Service
                </Link>
                <Link href="#" className="block text-primary hover:underline">
                  Contact Us
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}

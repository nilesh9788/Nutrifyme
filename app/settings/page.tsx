"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navbar } from "@/components/navbar"
import { ArrowLeft, Trash2 } from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"account" | "notifications" | "privacy" | "preferences">("account")
  const [formData, setFormData] = useState({
    name: "Sarah Johnson",
    email: "sarah@example.com",
    location: "San Francisco, CA",
    website: "www.sarahjohnson.com",
    bio: "Health enthusiast | Nutritionist | Food lover",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
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
            <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-2">
                {[
                  { id: "account", label: "Account", icon: "👤" },
                  { id: "notifications", label: "Notifications", icon: "🔔" },
                  { id: "privacy", label: "Privacy & Security", icon: "🔒" },
                  { id: "preferences", label: "Preferences", icon: "⚙️" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground"
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Account Settings */}
              {activeTab === "account" && (
                <Card className="p-6 space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-6">Account Settings</h2>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          name="website"
                          value={formData.website}
                          onChange={handleInputChange}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <textarea
                          id="bio"
                          name="bio"
                          value={formData.bio}
                          onChange={handleInputChange}
                          className="mt-2 w-full p-2 border border-border rounded-lg bg-background text-foreground"
                          rows={4}
                        />
                      </div>
                      <Button className="w-full">Save Changes</Button>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-border">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input id="confirm-password" type="password" className="mt-2" />
                      </div>
                      <Button variant="outline" className="w-full bg-transparent">
                        Update Password
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              {/* Notifications */}
              {activeTab === "notifications" && (
                <Card className="p-6 space-y-6">
                  <h2 className="text-2xl font-bold text-foreground">Notification Preferences</h2>
                  <div className="space-y-4">
                    {[
                      { title: "Email Notifications", description: "Receive updates via email" },
                      { title: "Health Alerts", description: "Get notified about high-risk foods" },
                      { title: "Community Updates", description: "New posts from people you follow" },
                      { title: "Product Recommendations", description: "Personalized product suggestions" },
                      { title: "Weekly Summary", description: "Get your weekly health summary" },
                    ].map((notif, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div>
                          <p className="font-semibold text-foreground">{notif.title}</p>
                          <p className="text-sm text-muted-foreground">{notif.description}</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-5 h-5" />
                      </div>
                    ))}
                  </div>
                  <Button className="w-full">Save Preferences</Button>
                </Card>
              )}

              {/* Privacy & Security */}
              {activeTab === "privacy" && (
                <Card className="p-6 space-y-6">
                  <h2 className="text-2xl font-bold text-foreground">Privacy & Security</h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-foreground">Profile Visibility</p>
                        <select className="bg-background border border-border rounded px-2 py-1">
                          <option>Public</option>
                          <option>Private</option>
                          <option>Friends Only</option>
                        </select>
                      </div>
                      <p className="text-sm text-muted-foreground">Control who can see your profile</p>
                    </div>

                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-foreground">Scan History Visibility</p>
                        <input type="checkbox" defaultChecked className="w-5 h-5" />
                      </div>
                      <p className="text-sm text-muted-foreground">Allow others to see your scan history</p>
                    </div>

                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-foreground">Two-Factor Authentication</p>
                        <Button size="sm" variant="outline">
                          Enable
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>

                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-foreground">Active Sessions</p>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">Manage your active login sessions</p>
                    </div>
                  </div>
                </Card>
              )}

              {/* Preferences */}
              {activeTab === "preferences" && (
                <Card className="p-6 space-y-6">
                  <h2 className="text-2xl font-bold text-foreground">Preferences</h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="font-semibold text-foreground mb-2">Theme</p>
                      <div className="flex gap-2">
                        {["Light", "Dark", "Auto"].map((theme) => (
                          <Button key={theme} variant="outline" size="sm">
                            {theme}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-muted rounded-lg">
                      <p className="font-semibold text-foreground mb-2">Language</p>
                      <select className="w-full bg-background border border-border rounded px-3 py-2">
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                      </select>
                    </div>

                    <div className="p-4 bg-muted rounded-lg">
                      <p className="font-semibold text-foreground mb-2">Dietary Preferences</p>
                      <div className="space-y-2">
                        {["Vegetarian", "Vegan", "Gluten-Free", "Keto", "Paleo"].map((diet) => (
                          <label key={diet} className="flex items-center gap-2">
                            <input type="checkbox" className="w-4 h-4" />
                            <span className="text-foreground">{diet}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-muted rounded-lg">
                      <p className="font-semibold text-foreground mb-2">Allergen Alerts</p>
                      <div className="space-y-2">
                        {["Peanuts", "Tree Nuts", "Dairy", "Shellfish", "Soy"].map((allergen) => (
                          <label key={allergen} className="flex items-center gap-2">
                            <input type="checkbox" className="w-4 h-4" />
                            <span className="text-foreground">{allergen}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button className="w-full">Save Preferences</Button>
                </Card>
              )}
            </div>
          </div>

          {/* Danger Zone */}
          <Card className="p-6 mt-8 border-red-200 bg-red-50">
            <h3 className="text-lg font-bold text-red-900 mb-4">Danger Zone</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete All Scan History
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </>
  )
}

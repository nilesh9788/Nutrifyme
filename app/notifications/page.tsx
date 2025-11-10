"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Bell, AlertCircle, Heart, MessageSquare, Users } from "lucide-react"

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: "alert",
      icon: AlertCircle,
      title: "High-Risk Product Alert",
      message: "The granola cereal you scanned has high sugar content",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      type: "like",
      icon: Heart,
      title: "Sarah liked your post",
      message: "Your post about organic bread got a like",
      time: "4 hours ago",
      read: false,
    },
    {
      id: 3,
      type: "comment",
      icon: MessageSquare,
      title: "New comment on your post",
      message: "Mike commented: 'Great recommendation!'",
      time: "6 hours ago",
      read: true,
    },
    {
      id: 4,
      type: "follow",
      icon: Users,
      title: "Emma started following you",
      message: "Emma Wilson is now following your profile",
      time: "1 day ago",
      read: true,
    },
    {
      id: 5,
      type: "alert",
      icon: AlertCircle,
      title: "Weekly Health Summary",
      message: "Your health score improved by 5 points this week",
      time: "2 days ago",
      read: true,
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Bell className="w-6 h-6" />
              Notifications
            </h1>
          </div>
          <Button variant="outline" size="sm">
            Mark all as read
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-3">
          {notifications.map((notif) => {
            const Icon = notif.icon
            return (
              <Card
                key={notif.id}
                className={`p-4 cursor-pointer hover:shadow-md transition-shadow ${
                  !notif.read ? "bg-primary/5 border-primary/20" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-muted rounded-lg flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className={`font-semibold ${!notif.read ? "text-foreground" : "text-muted-foreground"}`}>
                          {notif.title}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                      </div>
                      {!notif.read && <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{notif.time}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {notifications.length === 0 && (
          <Card className="p-12 text-center">
            <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground text-lg">No notifications yet</p>
          </Card>
        )}
      </div>
    </main>
  )
}

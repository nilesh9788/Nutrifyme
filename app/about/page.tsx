"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Heart, Users, Zap } from "lucide-react"

export default function AboutPage() {
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
          <h1 className="text-2xl font-bold text-foreground">About nutrifyMe</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mission */}
        <Card className="p-8 mb-12 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
          <p className="text-lg text-muted-foreground">
            To empower people to make informed food choices by providing AI-powered analysis of packaged foods,
            understanding ingredients, and delivering personalized health recommendations.
          </p>
        </Card>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: Heart,
              title: "Health First",
              description: "We prioritize your health and wellbeing in everything we do",
            },
            {
              icon: Zap,
              title: "Innovation",
              description: "Using cutting-edge AI to analyze food and provide insights",
            },
            {
              icon: Users,
              title: "Community",
              description: "Building a supportive community of health-conscious individuals",
            },
          ].map((value, idx) => (
            <Card key={idx} className="p-6">
              <value.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </Card>
          ))}
        </div>

        {/* Team */}
        <Card className="p-8 mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Our Team</h2>
          <p className="text-muted-foreground mb-6">
            nutrifyMe was founded by a team of nutritionists, software engineers, and health enthusiasts dedicated to
            making food analysis accessible to everyone.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Dr. Sarah Chen", role: "Founder & Nutritionist", bio: "PhD in Nutrition Science" },
              { name: "Mike Johnson", role: "CTO & AI Engineer", bio: "10+ years in ML/AI" },
              { name: "Emma Wilson", role: "Head of Community", bio: "Community health advocate" },
            ].map((member, idx) => (
              <div key={idx} className="text-center p-4 bg-muted rounded-lg">
                <div className="w-16 h-16 bg-primary rounded-full mx-auto mb-3" />
                <p className="font-semibold text-foreground">{member.name}</p>
                <p className="text-sm text-primary font-medium">{member.role}</p>
                <p className="text-xs text-muted-foreground mt-1">{member.bio}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* FAQ */}
        <Card className="p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: "How accurate is the AI analysis?",
                a: "Our AI model is trained on thousands of food products and achieves 95%+ accuracy in ingredient identification and health scoring.",
              },
              {
                q: "Is my data private?",
                a: "Yes, we take privacy seriously. All your scan history and personal data is encrypted and never shared with third parties.",
              },
              {
                q: "Can I export my data?",
                a: "Yes, you can export your scan history and health reports from your settings page at any time.",
              },
              {
                q: "Is nutrifyMe available on mobile?",
                a: "We're currently working on iOS and Android apps. Sign up for early access on our website.",
              },
            ].map((faq, idx) => (
              <div key={idx} className="p-4 bg-muted rounded-lg">
                <p className="font-semibold text-foreground mb-2">{faq.q}</p>
                <p className="text-muted-foreground text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </main>
  )
}

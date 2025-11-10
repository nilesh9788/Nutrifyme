import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Smartphone, Zap, BarChart3, Users, Heart, Brain, TrendingUp, MessageSquare, Shield, Leaf } from "lucide-react"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">N</span>
            </div>
            <span className="text-xl font-bold text-foreground">nutrifyMe</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="space-y-6">
          <h1 className="text-5xl sm:text-6xl font-bold text-foreground text-balance">
            Know What You're <span className="text-primary">Eating</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            AI-powered food analysis with personalized health tracking, community insights, and demographic-based health
            recommendations tailored to your profile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Start Scanning
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero Image Placeholder */}
        <div className="mt-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 p-8 border border-border">
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <Smartphone className="w-16 h-16 text-muted-foreground" />
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Core Features</h2>
          <p className="text-lg text-muted-foreground">Everything you need to make informed food choices</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              icon: Smartphone,
              title: "Instant Scanning",
              description: "Scan barcodes or take photos of food labels instantly with AI recognition",
            },
            {
              icon: Zap,
              title: "AI Analysis",
              description: "Advanced AI analyzes ingredients, nutritional content, and health risks",
            },
            {
              icon: BarChart3,
              title: "Health Scoring",
              description: "Get personalized health risk assessments based on your profile",
            },
            {
              icon: Users,
              title: "Community",
              description: "Share insights and learn from thousands of health-conscious users",
            },
          ].map((feature, idx) => (
            <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Advanced Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-12 mb-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Advanced Health Tracking</h2>
          <p className="text-lg text-muted-foreground">Comprehensive health monitoring and personalized insights</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Heart,
              title: "Vital Signs Tracking",
              description:
                "Monitor blood pressure, heart rate, blood sugar, BMI, cholesterol, and more with detailed health trends",
            },
            {
              icon: Brain,
              title: "Lifestyle Metrics",
              description:
                "Track sleep quality, exercise, water intake, stress levels, and mood for holistic health insights",
            },
            {
              icon: TrendingUp,
              title: "Health Trends",
              description: "Visualize 7-day and monthly health trends with AI-powered recommendations",
            },
            {
              icon: Shield,
              title: "Risk Assessment",
              description: "Get personalized health risk assessments based on your vital signs and lifestyle",
            },
            {
              icon: Leaf,
              title: "Dietary Recommendations",
              description: "Receive AI-powered diet and exercise plans tailored to your health goals",
            },
            {
              icon: MessageSquare,
              title: "Expert Guidance",
              description: "Connect with nutritionists and health experts in the community",
            },
          ].map((feature, idx) => (
            <Card key={idx} className="p-6 hover:shadow-lg transition-shadow bg-background">
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Demographic Health Index Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Demographic Health Index</h2>
          <p className="text-lg text-muted-foreground">
            Personalized health scores based on your age, health goals, and conditions
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <h3 className="text-2xl font-bold text-blue-900 mb-6">Age-Based Recommendations</h3>
            <div className="space-y-4">
              {[
                { age: "18-25", focus: "Fitness & Energy", score: 85 },
                { age: "25-35", focus: "Wellness & Balance", score: 82 },
                { age: "35-50", focus: "Prevention & Health", score: 78 },
                { age: "50+", focus: "Longevity & Care", score: 75 },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div>
                    <p className="font-semibold text-blue-900">{item.age}</p>
                    <p className="text-sm text-blue-700">{item.focus}</p>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">{item.score}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <h3 className="text-2xl font-bold text-green-900 mb-6">Health Goal Optimization</h3>
            <div className="space-y-4">
              {[
                { goal: "Weight Loss", score: 88 },
                { goal: "Muscle Gain", score: 85 },
                { goal: "Heart Health", score: 90 },
                { goal: "Diabetes Management", score: 82 },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <p className="font-semibold text-green-900">{item.goal}</p>
                  <span className="text-2xl font-bold text-green-600">{item.score}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Community Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Thriving Community</h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of health-conscious users sharing insights and discoveries
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              stat: "12,450+",
              label: "Active Members",
              description: "Health-conscious users sharing daily insights",
            },
            {
              stat: "8,920+",
              label: "Products Reviewed",
              description: "Comprehensive community reviews and ratings",
            },
            {
              stat: "3,240+",
              label: "Posts Weekly",
              description: "Fresh discoveries and health recommendations",
            },
          ].map((item, idx) => (
            <Card key={idx} className="p-8 text-center hover:shadow-lg transition-shadow">
              <p className="text-4xl font-bold text-primary mb-2">{item.stat}</p>
              <p className="text-lg font-semibold text-foreground mb-2">{item.label}</p>
              <p className="text-muted-foreground">{item.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20 p-12 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Take Control?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of health-conscious users making smarter food choices every day with AI-powered insights and
            community support.
          </p>
          <Link href="/signup">
            <Button size="lg">Get Started Free</Button>
          </Link>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-muted-foreground">
          <p>&copy; 2025 nutrifyMe. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}

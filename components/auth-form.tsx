"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

interface AuthFormProps {
  type: "login" | "signup"
}

export function AuthForm({ type }: AuthFormProps) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showDummyCredentials, setShowDummyCredentials] = useState(false)

  const dummyCredentials = {
    email: "demo@nutrify.com",
    password: "Demo@123456",
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const endpoint = type === "login" ? "/api/auth/login" : "/api/auth/register"
      const payload = type === "login" ? { email, password } : { email, password, name }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Authentication failed")
        return
      }

      // Store token and user data
      if (data.token) {
        localStorage.setItem("authToken", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))
      }

      // Redirect to dashboard on success
      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const fillDummyCredentials = () => {
    setEmail(dummyCredentials.email)
    setPassword(dummyCredentials.password)
    setShowDummyCredentials(false)
  }

  return (
    <Card className="w-full max-w-md p-8">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">{type === "login" ? "Welcome Back" : "Create Account"}</h1>
          <p className="text-muted-foreground mt-2">
            {type === "login" ? "Sign in to your nutrifyMe account" : "Join nutrifyMe to start analyzing your food"}
          </p>
        </div>

        {type === "login" && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <button
              type="button"
              onClick={() => setShowDummyCredentials(!showDummyCredentials)}
              className="text-sm font-semibold text-blue-700 hover:text-blue-800 w-full text-left"
            >
              Demo Credentials Available
            </button>
            {showDummyCredentials && (
              <div className="mt-3 space-y-2 text-sm">
                <p className="text-blue-700">
                  <strong>Email:</strong> {dummyCredentials.email}
                </p>
                <p className="text-blue-700">
                  <strong>Password:</strong> {dummyCredentials.password}
                </p>
                <Button
                  type="button"
                  onClick={fillDummyCredentials}
                  size="sm"
                  className="w-full mt-2 bg-transparent"
                  variant="outline"
                >
                  Use Demo Credentials
                </Button>
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {type === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={type === "signup"}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{error}</div>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Loading..." : type === "login" ? "Sign In" : "Create Account"}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <Button variant="outline" className="w-full bg-transparent">
          Continue with Google
        </Button>

        <div className="text-center text-sm">
          {type === "login" ? (
            <>
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline font-semibold">
                Sign up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline font-semibold">
                Sign in
              </Link>
            </>
          )}
        </div>
      </div>
    </Card>
  )
}

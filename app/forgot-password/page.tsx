"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-muted to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="space-y-6">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Button>
          </Link>

          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Reset Password</h1>
            <p className="text-muted-foreground mt-2">
              {submitted
                ? "Check your email for password reset instructions"
                : "Enter your email to receive password reset instructions"}
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Send Reset Link
              </Button>
            </form>
          ) : (
            <div className="space-y-4 text-center">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                Didn't receive the email? Check your spam folder or{" "}
                <button onClick={() => setSubmitted(false)} className="text-primary hover:underline">
                  try again
                </button>
              </p>
            </div>
          )}
        </div>
      </Card>
    </main>
  )
}

"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, LogOut } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("user")
    router.push("/login")
  }

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/scanner", label: "Scanner" },
    { href: "/health", label: "Health" },
    { href: "/diet-plan", label: "Diet Plan" },
    { href: "/exercise-plan", label: "Exercise" },
    { href: "/health-insights", label: "Insights" },
    { href: "/community", label: "Community" },
    { href: "/settings", label: "Settings" },
  ]

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">N</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline">nutrifyMe</span>
          </Link>

          <div className="hidden md:flex gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button variant="ghost" size="sm">
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handleLogout} className="hidden sm:flex">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>

            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 hover:bg-muted rounded-lg">
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  {link.label}
                </Button>
              </Link>
            ))}
            <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}

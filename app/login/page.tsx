import { AuthForm } from "@/components/auth-form"

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-muted to-background flex items-center justify-center p-4">
      <div className="w-full">
        <AuthForm type="login" />
      </div>
    </main>
  )
}

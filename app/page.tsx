"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Building2 } from "lucide-react"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (username === "admin" && password === "admin") {
        document.cookie = "auth=true; path=/"
        router.push("/dashboard-mapa-grande")
      } else {
        setError("Usuário ou senha incorretos.")
      }
    } catch {
      setError("Algo deu errado. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-300 dark:from-zinc-900 dark:to-black p-4 transition-all duration-500">
      <div className="w-full max-w-md animate-fade-in">
        <Card className="rounded-2xl shadow-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-all duration-500 ease-in-out">
          <CardHeader className="flex flex-col items-center space-y-2 animate-slide-up">
            <div className="bg-primary/10 p-3 rounded-full transition-all hover:scale-110">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-semibold text-center text-zinc-800 dark:text-white">
              Bem-vindo de volta
            </CardTitle>
            <CardDescription className="text-center text-sm text-muted-foreground">
              Faça login para acessar o sistema
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="username">Usuário</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="ex: joao.silva"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="transition-all focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <a href="#" className="text-sm text-primary hover:underline transition-all">
                    Esqueceu?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="transition-all focus:ring-2 focus:ring-primary"
                />
              </div>
              {error && (
                <div className="text-sm text-red-500 font-medium transition-all">
                  {error}
                </div>
              )}
            </CardContent>

            <CardFooter>
              <Button type="submit" className="w-full transition-all duration-300" disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </CardFooter>
          </form>

          <div className="p-6 pt-0 text-center text-xs text-muted-foreground">
            Problemas? Fale com o administrador.
          </div>
        </Card>
      </div>
    </div>
  )
}

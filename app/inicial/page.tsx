import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/layout/header"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header></Header>
      <main className="flex-1 container py-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Dashboard</CardTitle>
              <CardDescription>Visão geral do sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Acesse o painel principal do sistema.</p>
              <Link href="/dashboard-mapa-grande">
              <Button className="mt-4">Acessar</Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Gestão de Acessos</CardTitle>
              <CardDescription>Gerenciamento de usuários</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Gerencie os usuários e permissões do sistema.</p>
              <Link href="/gestao-acessos">
                <Button className="mt-4">Acessar</Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Configurações</CardTitle>
              <CardDescription>Configurações do sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Configure os parâmetros do sistema.</p>
              <Button className="mt-4">Acessar</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

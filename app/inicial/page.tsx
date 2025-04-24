import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Header } from "@/components/layout/header"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-white dark:bg-gray-900 shadow-md">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Dashboard</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">Visão geral do sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">Acesse o painel principal do sistema.</p>
              <Link href="/dashboard-mapa-grande">
                <Button className="mt-4">Acessar</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-900 shadow-md">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Gestão de Acessos</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">Gerenciamento de usuários</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">Gerencie os usuários e permissões do sistema.</p>
              <Link href="/gestao-acesso2">
                <Button className="mt-4">Acessar</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-900 shadow-md">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Configurações</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">Configurações do sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">Configure os parâmetros do sistema.</p>
              <Button className="mt-4">Acessar</Button>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-900 shadow-md">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Historico</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">movimentação de patrimonio</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">Acesse o painel de movimentações.</p>
              <Link href="/notify">
              <Button className="mt-4">Acessar</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

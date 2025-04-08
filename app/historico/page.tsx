import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/layout/header"

export default function Historico() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header></Header>
      {/* <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-14 items-center px-4">
          <h1 className="text-lg font-semibold">Sistema de Controle de Estoque</h1>
          <nav className="ml-auto flex gap-4">
            <Link href="/">
              <Button variant="ghost">Início</Button>
            </Link>
            <Link href="/estoque-geral">
              <Button variant="ghost">Estoque Geral</Button>
            </Link>
            <Link href="/estoque-individual">
              <Button variant="ghost">Estoque Individual</Button>
            </Link>
            <Link href="/historico">
              <Button variant="ghost">Histórico</Button>
            </Link>
          </nav>
        </div>
      </header> */}
      <main className="flex-1 container py-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">HISTÓRICO DE MOVIMENTAÇÃO</h2>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="w-full md:w-1/3">
                  <Input placeholder="Pesquisar movimentações..." />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">Exportar</Button>
                  <Button>Filtrar</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border px-4 py-2 text-left text-xs">DATA</th>
                      <th className="border px-4 py-2 text-left text-xs">CÓDIGO</th>
                      <th className="border px-4 py-2 text-left text-xs">ITEM</th>
                      <th className="border px-4 py-2 text-left text-xs">ENTRADA</th>
                      <th className="border px-4 py-2 text-left text-xs">SAÍDA</th>
                      <th className="border px-4 py-2 text-left text-xs">USUÁRIO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 10 }).map((_, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : ""}>
                        <td className="border px-4 py-2 text-xs">{`${(new Date()).getDate()}/${new Date().getMonth() + 1}/${(new Date()).getFullYear()}`}</td>
                        <td className="border px-4 py-2 text-xs">{1000 + i}</td>
                        <td className="border px-4 py-2 text-xs">Item {i + 1}</td>
                        <td className="border px-4 py-2 text-xs">{i % 2 === 0 ? Math.floor(Math.random() * 10) : 0}</td>
                        <td className="border px-4 py-2 text-xs">{i % 2 === 1 ? Math.floor(Math.random() * 10) : 0}</td>
                        <td className="border px-4 py-2 text-xs">Usuário {(i % 3) + 1}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

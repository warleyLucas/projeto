import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/layout/header"

export default function EstoqueGeral() {
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
          <h2 className="text-2xl font-bold tracking-tight">ESTOQUE GERAL</h2>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="w-full md:w-1/3">
                  <Input placeholder="Pesquisar itens..." />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">Exportar</Button>
                  <Button>Adicionar Item</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border px-4 py-2 text-left text-xs">CÓDIGO</th>
                      <th className="border px-4 py-2 text-left text-xs">ITEM</th>
                      <th className="border px-4 py-2 text-left text-xs">DESCRIÇÃO</th>
                      <th className="border px-4 py-2 text-left text-xs">ESTOQUE</th>
                      <th className="border px-4 py-2 text-left text-xs">MÍNIMO</th>
                      <th className="border px-4 py-2 text-left text-xs">MÁXIMO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 10 }).map((_, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : ""}>
                        <td className="border px-4 py-2 text-xs">{1000 + i}</td>
                        <td className="border px-4 py-2 text-xs">Item {i + 1}</td>
                        <td className="border px-4 py-2 text-xs">Descrição do item {i + 1}</td>
                        <td className="border px-4 py-2 text-xs">{Math.floor(Math.random() * 100)}</td>
                        <td className="border px-4 py-2 text-xs">{10}</td>
                        <td className="border px-4 py-2 text-xs">{100}</td>
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

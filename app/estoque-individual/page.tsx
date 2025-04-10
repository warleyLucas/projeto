import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/layout/header"

export default function EstoqueIndividual() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">ESTOQUE INDIVIDUAL</h2>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="w-full md:w-1/3">
                  <Input placeholder="Pesquisar item específico..." />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">Exportar</Button>
                  <Button>Movimentar</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr>
                      <th className="border px-4 py-2 text-left text-xs text-muted-foreground">CÓDIGO</th>
                      <th className="border px-4 py-2 text-left text-xs text-muted-foreground">ITEM</th>
                      <th className="border px-4 py-2 text-left text-xs text-muted-foreground">DESCRIÇÃO</th>
                      <th className="border px-4 py-2 text-left text-xs text-muted-foreground">ESTOQUE</th>
                      <th className="border px-4 py-2 text-left text-xs text-muted-foreground">MÍNIMO</th>
                      <th className="border px-4 py-2 text-left text-xs text-muted-foreground">MÁXIMO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 10 }).map((_, i) => (
                      <tr
                        key={i}
                        className={i % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"}
                      >
                        <td className="border px-4 py-2 text-xs">{1000 + i}</td>
                        <td className="border px-4 py-2 text-xs">Item {i + 1}</td>
                        <td className="border px-4 py-2 text-xs">Descrição do item {i + 1}</td>
                        <td className="border px-4 py-2 text-xs">{Math.floor(Math.random() * 100)}</td>
                        <td className="border px-4 py-2 text-xs">10</td>
                        <td className="border px-4 py-2 text-xs">100</td>
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

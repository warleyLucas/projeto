import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/layout/header"

export default function Historico() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
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
                <table className="w-full border-collapse text-sm">
                  <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr>
                      <th className="border px-4 py-2 text-left text-xs text-muted-foreground">DATA</th>
                      <th className="border px-4 py-2 text-left text-xs text-muted-foreground">CÓDIGO</th>
                      <th className="border px-4 py-2 text-left text-xs text-muted-foreground">ITEM</th>
                      <th className="border px-4 py-2 text-left text-xs text-muted-foreground">ENTRADA</th>
                      <th className="border px-4 py-2 text-left text-xs text-muted-foreground">SAÍDA</th>
                      <th className="border px-4 py-2 text-left text-xs text-muted-foreground">USUÁRIO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 10 }).map((_, i) => (
                      <tr
                        key={i}
                        className={i % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"}
                      >
                        <td className="border px-4 py-2 text-xs">
                          {`${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`}
                        </td>
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

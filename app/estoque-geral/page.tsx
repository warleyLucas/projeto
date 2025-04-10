'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/layout/header"
import { useRouter } from "next/navigation"

export default function EstoqueGeral() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container max-w-full px-6 py-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">ESTOQUE GERAL</h2>
          <Card className="w-full">
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="w-full md:w-1/3">
                  <Input placeholder="Pesquisar itens..." />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">Exportar</Button>
                  <Button onClick={() => router.push('/form-estoque')}>
                    Adicionar Item
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-800">
                      <th className="border px-4 py-2 text-left text-xs text-black dark:text-white">CÓDIGO</th>
                      <th className="border px-4 py-2 text-left text-xs text-black dark:text-white">ITEM</th>
                      <th className="border px-4 py-2 text-left text-xs text-black dark:text-white">DESCRIÇÃO</th>
                      <th className="border px-4 py-2 text-left text-xs text-black dark:text-white">ESTOQUE</th>
                      <th className="border px-4 py-2 text-left text-xs text-black dark:text-white">MÍNIMO</th>
                      <th className="border px-4 py-2 text-left text-xs text-black dark:text-white">MÁXIMO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 10 }).map((_, i) => (
                      <tr
                        key={i}
                        className={`${
                          i % 2 === 0
                            ? 'bg-white dark:bg-gray-900'
                            : 'bg-gray-50 dark:bg-gray-800'
                        }`}
                      >
                        <td className="border px-4 py-2 text-xs text-black dark:text-white">{1000 + i}</td>
                        <td className="border px-4 py-2 text-xs text-black dark:text-white">Item {i + 1}</td>
                        <td className="border px-4 py-2 text-xs text-black dark:text-white">Descrição do item {i + 1}</td>
                        <td className="border px-4 py-2 text-xs text-black dark:text-white">{Math.floor(Math.random() * 100)}</td>
                        <td className="border px-4 py-2 text-xs text-black dark:text-white">10</td>
                        <td className="border px-4 py-2 text-xs text-black dark:text-white">100</td>
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

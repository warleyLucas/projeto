import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b bg-zinc-900">
      <div className="container flex h-14 items-center px-4">
        <h1 className="text-lg font-semibold text-white">Sistema de Controle de Estoque</h1>
        <nav className="ml-auto flex gap-4 text-white">
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
          <Link href="/dashboard-mapa-grande">
            <Button variant="ghost">Dashboard</Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}

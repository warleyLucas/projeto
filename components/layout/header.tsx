import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from 'next/image'

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b bg-[rgba(21,45,93)]">
      <div className="container flex h-14 items-center px-4">
        <Link href="/">
      <Image src="/logo.svg" alt="Logo" width={100} height={100} />
      </Link>
        <nav className="ml-auto flex gap-4 text-white">
          <Link href="/"><Button variant="ghost">Início</Button></Link>
          <Link href="/estoque-geral"><Button variant="ghost">Estoque Geral</Button></Link>
          <Link href="/estoque-individual"><Button variant="ghost">Estoque Individual</Button></Link>
          <Link href="/historico"><Button variant="ghost">Histórico</Button></Link>
          <Link href="/dashboard-mapa-grande"><Button variant="ghost">Dashboard</Button></Link>
        </nav>
      </div>
    </header>
  )
}

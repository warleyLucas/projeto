'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { useState } from "react";
import { Menu, X } from "lucide-react"; // ícones

export function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header className="sticky top-0 z-10 border-b bg-[rgba(21,45,93)]">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/inicial">
          <Image src="/logo.svg" alt="Logo" width={100} height={100} />
        </Link>

        {/* Ícone para mobile */}
        <div className="md:hidden">
          <Button variant="ghost" onClick={() => setMenuAberto(!menuAberto)} className="text-white">
            {menuAberto ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Navegação Desktop */}
        <nav className="hidden md:flex gap-4 text-white ml-auto">
          <Link href="/inicial"><Button variant="ghost">Início</Button></Link>
          <Link href="/estoque-geral"><Button variant="ghost">Estoque Geral</Button></Link>
          <Link href="/estoque-individual"><Button variant="ghost">Estoque Individual</Button></Link>
          <Link href="/historico"><Button variant="ghost">Histórico</Button></Link>
          <Link href="/dashboard-mapa-grande"><Button variant="ghost">Dashboard</Button></Link>
          <Link href="/"><Button variant="ghost">Logout</Button></Link>
        </nav>
      </div>

      {/* Menu Mobile */}
      {menuAberto && (
        <div className="md:hidden bg-[rgba(21,45,93)] text-white flex flex-col gap-2 px-4 pb-4">
          <Link href="/"><Button variant="ghost" className="w-full justify-start">Início</Button></Link>
          <Link href="/estoque-geral"><Button variant="ghost" className="w-full justify-start">Estoque Geral</Button></Link>
          <Link href="/estoque-individual"><Button variant="ghost" className="w-full justify-start">Estoque Individual</Button></Link>
          <Link href="/historico"><Button variant="ghost" className="w-full justify-start">Histórico</Button></Link>
          <Link href="/dashboard-mapa-grande"><Button variant="ghost" className="w-full justify-start">Dashboard</Button></Link>
        </div>
      )}
    </header>
  );
}
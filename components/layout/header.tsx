'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { useState } from "react";
import { Menu, X, LogOut, Settings, Moon, Sun } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";

export function Header() {
  const [menuAberto, setMenuAberto] = useState(false);
  const { theme, setTheme } = useTheme();
  const userName = "João Silva";
  const userInitial = userName.charAt(0).toUpperCase();
  const userAvatar = null;

  return (
    <header className="sticky top-0 z-20 border-b bg-[rgba(21,45,93)]">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/inicial">
          <Image src="/logo.svg" alt="Logo" width={100} height={100} />
        </Link>

        {/* Mobile Toggle */}
        <div className="custom-lg:hidden">
          <Button variant="ghost" onClick={() => setMenuAberto(!menuAberto)} className="text-white">
            {menuAberto ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden custom-lg:flex gap-4 text-white ml-auto items-center">
          <Link href="/inicial"><Button variant="ghost">Início</Button></Link>
          <Link href="/estoque-geral"><Button variant="ghost">Estoque Geral</Button></Link>
          <Link href="/estoque-individual"><Button variant="ghost">Estoque Individual</Button></Link>
          <Link href="/historico"><Button variant="ghost">Histórico</Button></Link>
          <Link href="/dashboard-mapa-grande"><Button variant="ghost">Dashboard</Button></Link>

          {/* Avatar */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarImage src={userAvatar ?? undefined} alt={userName} />
                <AvatarFallback>{userInitial}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>{userName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? (
                  <>
                    <Sun className="mr-2 h-4 w-4" /> Modo Claro
                  </>
                ) : (
                  <>
                    <Moon className="mr-2 h-4 w-4" /> Modo Escuro
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Configurações
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/">
                  <div className="flex items-center">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </div>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>

      {/* Mobile Menu */}
      {menuAberto && (
        <div className="custom-lg:hidden bg-[rgba(21,45,93)] text-white flex flex-col gap-2 px-4 pb-4 transition-all duration-300">
          <Link href="/inicial"><Button variant="ghost" className="w-full justify-start">Início</Button></Link>
          <Link href="/estoque-geral"><Button variant="ghost" className="w-full justify-start">Estoque Geral</Button></Link>
          <Link href="/estoque-individual"><Button variant="ghost" className="w-full justify-start">Estoque Individual</Button></Link>
          <Link href="/historico"><Button variant="ghost" className="w-full justify-start">Histórico</Button></Link>
          <Link href="/dashboard-mapa-grande"><Button variant="ghost" className="w-full justify-start">Dashboard</Button></Link>
        </div>
      )}
    </header>
  );
}

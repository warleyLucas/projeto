// app/dashboard/page.tsx
'use client';

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import dynamic from 'next/dynamic';

const Mapa = dynamic(() => import('@/components/Mapa'), { ssr: false });

type Produto = {
  id: number;
  nome: string;
  categoria: string;
  preco: string;
  estoque: number;
  fornecedor: string;
};

export default function Dashboard() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    const dadosFicticios: Produto[] = [
      { id: 1, nome: 'Camiseta', categoria: 'Roupas', preco: 'R$ 49,90', estoque: 25, fornecedor: 'Loja A' },
      { id: 2, nome: 'Notebook', categoria: 'Eletrônicos', preco: 'R$ 3.200,00', estoque: 7, fornecedor: 'Fornecedor X' },
      { id: 3, nome: 'Café', categoria: 'Alimentos', preco: 'R$ 17,50', estoque: 120, fornecedor: 'Mercado Central' },
    ];
    setProdutos(dadosFicticios);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <Header />

      {/* Subheader */}
      <div className="bg-zinc-400 h-6 w-full" />

      {/* Main Content */}
      <div className="p-4 grid grid-cols-6 gap-4">
        {/* Left - Mapa */}
        <div className="col-span-4 space-y-4">
          <Card><CardContent className="h-6 w-1/3" /></Card>

          <Card className="h-72">
            <CardContent className="h-full p-0 overflow-hidden">
              <Mapa />
            </CardContent>
          </Card>
        </div>

        {/* Right - Painéis Laterais */}
        <div className="col-span-2 space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <Card><CardContent className="h-6" /></Card>
            <Card><CardContent className="h-6" /></Card>
          </div>
          {[...Array(3)].map((_, i) => (
            <Card key={i}><CardContent className="h-20" /></Card>
          ))}
        </div>
      </div>

      {/* Controles e Tabela */}
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-12 gap-4 items-center">
          <Card className="col-span-2"><CardContent className="h-6" /></Card>
          <div className="col-span-10 grid grid-cols-6 gap-2">
            {[...Array(6)].map((_, i) => (
              <button
                key={i}
                className="bg-zinc-800 text-white rounded px-2 py-1 text-sm"
              >
                DEFINIR
              </button>
            ))}
          </div>
        </div>

        {/* Cabeçalho da Tabela */}
        <div className="grid grid-cols-6 gap-px bg-zinc-800 text-white font-medium text-center">
          <div className="bg-zinc-700 p-2">Nome</div>
          <div className="bg-zinc-700 p-2">Categoria</div>
          <div className="bg-zinc-700 p-2">Preço</div>
          <div className="bg-zinc-700 p-2">Estoque</div>
          <div className="bg-zinc-700 p-2">Fornecedor</div>
          <div className="bg-zinc-700 p-2">Ações</div>
        </div>

        {/* Linhas com Dados */}
        {produtos.map((produto) => (
          <div key={produto.id} className="grid grid-cols-6 gap-px bg-zinc-800 text-sm text-center">
            <div className="bg-zinc-200 p-2">{produto.nome}</div>
            <div className="bg-zinc-200 p-2">{produto.categoria}</div>
            <div className="bg-zinc-200 p-2">{produto.preco}</div>
            <div className="bg-zinc-200 p-2">{produto.estoque}</div>
            <div className="bg-zinc-200 p-2">{produto.fornecedor}</div>
            <div className="bg-zinc-200 p-2">
              <button className="bg-red-600 text-white px-2 py-1 rounded text-xs">
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

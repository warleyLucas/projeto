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

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-950 dark:text-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="p-4 grid grid-cols-6 gap-4">
        {/* Left - Mapa */}
        <div className="col-span-4 space-y-4">
          <Card className="bg-blue-900 rounded-xl p-4 text-white space-y-4 h-[500px]">
            {/* Campo de filtro no canto superior esquerdo */}
            <div>
              <input
                type="text"
                placeholder="Filtro"
                className="bg-zinc-200 text-black rounded-md px-4 py-2 w-1/3"
              />
            </div>

            {/* Mapa Interativo em tempo real */}
            <Card className="h-[400px]">
              <CardContent className="h-full relative rounded-lg overflow-hidden p-0">
                <Mapa />
              </CardContent>
            </Card>
          </Card>
        </div>

        {/* Painel lateral fixo e responsivo */}
        <div className="col-span-2 h-full">
          <div className="bg-blue-900 p-4 rounded-xl space-y-4 h-full flex flex-col">
            {/* Inputs */}
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                className="bg-white rounded-md px-4 py-2 w-full"
                placeholder="Busca"
              />
              <input
                type="text"
                className="bg-white rounded-md px-3 py-2 w-10"
                placeholder=""
              />
            </div>

            {/* Cards cinzas preenchendo a altura disponível */}
            <div className="flex flex-col gap-4 flex-grow">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-zinc-300 dark:bg-zinc-700 rounded-lg flex-grow min-h-[80px]"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Controles e Tabela */}
      <div className="p-4">
        <div className="rounded-xl border-4 border-blue-900 overflow-hidden">
          {/* Topo azul com inputs */}
          <div className="bg-blue-900 p-4 flex flex-wrap gap-4 items-center">
          <input
                type="text"
                className="bg-white rounded-md px-4 py-2"
                placeholder="Busca"
              />
          </div>

          {/* Botões DEFINIR */}
          <div className="bg-[rgba(45,67,63)] text-white grid grid-cols-6 text-center">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="p-2 border-r border-gray-400 text-xs font-medium">
                DEFINIR
              </div>
            ))}
          </div>

          {/* Linhas da Tabela */}
          <div>
            {[...Array(4)].map((_, rowIndex) => (
              <div
                key={rowIndex}
                className={`grid grid-cols-6 text-center text-sm ${
                  rowIndex % 2 === 0
                    ? 'bg-white text-black dark:bg-zinc-800 dark:text-white'
                    : 'bg-[rgba(45,67,63)] text-white'
                }`}
              >
                {[...Array(6)].map((_, colIndex) => (
                  <div key={colIndex} className="p-4 border-r border-gray-300">
                    |
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// app/dashboard/page.tsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link"
import { Header } from "@/components/layout/header";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
        <Header></Header>

      {/* Subheader */}
      <div className="bg-zinc-400 h-6 w-full" />

      {/* Main Content */}
      <div className="p-4 grid grid-cols-6 gap-4">
        {/* Left - Mapa */}
        <div className="col-span-4 space-y-4">
          <Card><CardContent className="h-6 w-1/3" /></Card>

          <Card className="h-72">
            <CardContent className="h-full flex items-center justify-center text-sm font-medium text-center">
              MAPA INTERATIVO EM TEMPO REAL
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

        {/* Tabela */}
        <div className="grid grid-cols-6 gap-px bg-zinc-800">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-zinc-700 text-white flex items-center justify-center h-10 font-medium">
              DEFINIR
            </div>
          ))}
        </div>
        {[...Array(3)].map((_, row) => (
          <div key={row} className="grid grid-cols-6 gap-px bg-zinc-800 mt-px">
            {[...Array(6)].map((_, col) => (
              <div key={col} className="bg-zinc-200 h-10" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

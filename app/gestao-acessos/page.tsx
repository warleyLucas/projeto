"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function GestaoAcessos() {
  const [selectedUser, setSelectedUser] = useState("usuario1")
  const [userStatus, setUserStatus] = useState(true)

  const usuarios = [
    { id: "usuario1", nome: "USUÁRIO 1" },
    { id: "usuario2", nome: "USUÁRIO 2" },
    { id: "usuario3", nome: "USUÁRIO 3" },
    { id: "usuario4", nome: "USUÁRIO 4" },
    { id: "usuario5", nome: "USUÁRIO 5" },
    { id: "usuario6", nome: "USUÁRIO 6" },
  ]

  const permissoes = [
    { id: "perm1", nome: "Dashboard" },
    { id: "perm2", nome: "Estoque" },
    { id: "perm3", nome: "Relatórios" },
    { id: "perm4", nome: "Usuários" },
    { id: "perm5", nome: "Configurações" },
    { id: "perm6", nome: "Financeiro" },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-14 items-center px-4">
          <h1 className="text-lg font-semibold">Sistema de Gestão</h1>
        </div>
      </header>
      <main className="flex-1 container py-6">
        <Card className="border-0 shadow-md">
          <CardHeader className="bg-gray-200 py-2">
            <CardTitle className="text-md font-medium">GESTÃO DE ACESSOS</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Lista de usuários */}
              <div className="md:col-span-3">
                <div className="bg-gray-100 p-2 rounded-md">
                  <Label className="text-xs mb-2 block">USUÁRIOS</Label>
                  <div className="space-y-1">
                    {usuarios.map((usuario) => (
                      <div
                        key={usuario.id}
                        className={`flex items-center p-2 rounded-sm cursor-pointer ${
                          selectedUser === usuario.id ? "bg-gray-300" : "hover:bg-gray-200"
                        }`}
                        onClick={() => setSelectedUser(usuario.id)}
                      >
                        <Checkbox
                          checked={selectedUser === usuario.id}
                          onCheckedChange={() => setSelectedUser(usuario.id)}
                          className="mr-2"
                        />
                        <span className="text-xs">{usuario.nome}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Button className="w-full mt-4 bg-gray-700 hover:bg-gray-800 text-white">NOVO USUÁRIO</Button>
              </div>

              {/* Detalhes do usuário */}
              <div className="md:col-span-9">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  {/* Informações do usuário */}
                  <div className="md:col-span-8">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="nome" className="text-xs">
                          NOME COMPLETO
                        </Label>
                        <Input id="nome" placeholder="Nome do usuário" className="mt-1" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email" className="text-xs">
                            EMAIL
                          </Label>
                          <Input id="email" placeholder="email@exemplo.com" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="telefone" className="text-xs">
                            TELEFONE
                          </Label>
                          <Input id="telefone" placeholder="(00) 00000-0000" className="mt-1" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="departamento" className="text-xs">
                            DEPARTAMENTO
                          </Label>
                          <Input id="departamento" placeholder="Departamento" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="cargo" className="text-xs">
                            CARGO
                          </Label>
                          <Input id="cargo" placeholder="Cargo" className="mt-1" />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="observacoes" className="text-xs">
                          OBSERVAÇÕES
                        </Label>
                        <textarea
                          id="observacoes"
                          placeholder="Observações sobre o usuário"
                          className="w-full mt-1 p-2 border rounded-md h-20 text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Foto do usuário */}
                  <div className="md:col-span-4">
                    <div className="bg-gray-200 rounded-md h-40 flex items-center justify-center">
                      <Avatar className="h-24 w-24">
                        <AvatarFallback className="bg-gray-300 text-gray-600">
                          {selectedUser.substring(0, 1).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </div>

                {/* Status e controles */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="login" className="text-xs block mb-1">
                      LOGIN
                    </Label>
                    <Input id="login" placeholder="Nome de usuário" />
                  </div>
                  <div>
                    <Label htmlFor="senha" className="text-xs block mb-1">
                      SENHA
                    </Label>
                    <Input id="senha" type="password" placeholder="••••••••" />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <Label htmlFor="status" className="text-xs mr-2">
                      SITUAÇÃO DO CADASTRO
                    </Label>
                    <Switch id="status" checked={userStatus} onCheckedChange={setUserStatus} />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Cancelar
                    </Button>
                    <Button size="sm">Salvar</Button>
                  </div>
                </div>

                {/* Permissões de acesso */}
                <div className="mt-6">
                  <Label className="text-xs block mb-2">CONTROLE DE ACESSO</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {permissoes.map((permissao) => (
                      <div key={permissao.id} className="bg-gray-200 p-2 rounded-md flex items-center">
                        <Checkbox id={permissao.id} className="mr-2" />
                        <Label htmlFor={permissao.id} className="text-xs cursor-pointer">
                          {permissao.nome}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

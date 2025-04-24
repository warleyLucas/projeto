"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { UserPlus, Search, Users, ArrowLeft, Trash2, UserX, UserCheck, PencilLine } from "lucide-react"

export default function GestaoAcessos() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [editingUserFull, setEditingUserFull] = useState<null | User>(null)
  const [usuarios, setUsuarios] = useState<User[]>([
    {
      id: 1,
      nome: "João Silva",
      email: "joao.silva@empresa.com",
      cargo: "Administrador",
      status: "Ativo",
      permissoes: {
        cadastro: true,
        visualizacao: true,
        edicao: true,
        exclusao: true,
        relatorios: true,
        administracao: true,
      },
    },
    {
      id: 2,
      nome: "Maria Santos",
      email: "maria.santos@empresa.com",
      cargo: "Operador",
      status: "Ativo",
      permissoes: {
        cadastro: true,
        visualizacao: true,
        edicao: true,
        exclusao: false,
        relatorios: true,
        administracao: false,
      },
    },
    {
      id: 3,
      nome: "Carlos Oliveira",
      email: "carlos.oliveira@empresa.com",
      cargo: "Visualizador",
      status: "Inativo",
      permissoes: {
        cadastro: false,
        visualizacao: true,
        edicao: false,
        exclusao: false,
        relatorios: true,
        administracao: false,
      },
    },
    {
      id: 4,
      nome: "Ana Pereira",
      email: "ana.pereira@empresa.com",
      cargo: "Gerente",
      status: "Ativo",
      permissoes: {
        cadastro: true,
        visualizacao: true,
        edicao: true,
        exclusao: true,
        relatorios: true,
        administracao: false,
      },
    },
  ])

  const usuariosFiltrados = usuarios.filter(
    (usuario) =>
      usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.cargo.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const adicionarUsuario = (novoUsuario: Omit<User, "id">) => {
    const id = usuarios.length > 0 ? Math.max(...usuarios.map((u) => u.id)) + 1 : 1
    setUsuarios([...usuarios, { ...novoUsuario, id }])
    setIsDialogOpen(false)
  }

  const atualizarUsuario = (usuarioAtualizado: User) => {
    setUsuarios(usuarios.map((usuario) => (usuario.id === usuarioAtualizado.id ? usuarioAtualizado : usuario)))
    setEditingUserFull(null)
  }

  const alterarStatusUsuario = (id: number, novoStatus: "Ativo" | "Inativo") => {
    setUsuarios(usuarios.map((usuario) => (usuario.id === id ? { ...usuario, status: novoStatus } : usuario)))
  }

  const excluirUsuario = (id: number) => {
    setUsuarios(usuarios.filter((usuario) => usuario.id !== id))
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Link href="/inicial">
            <Button variant="ghost" size="sm" className="gap-2 pl-1">
              <ArrowLeft className="h-4 w-4" />
              Voltar para página inicial
            </Button>
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestão de Acessos</h1>
            <p className="text-muted-foreground">Gerencie usuários e permissões do sistema de patrimônio</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <UserPlus className="h-4 w-4" />
                Novo Usuário
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <NovoUsuarioForm onSubmit={adicionarUsuario} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Usuários do Sistema
              </CardTitle>
              <CardDescription>Total de {usuarios.length} usuários cadastrados</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar usuários..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="todos">
            <TabsList className="mb-4">
              <TabsTrigger value="todos">Todos</TabsTrigger>
              <TabsTrigger value="ativos">Ativos</TabsTrigger>
              <TabsTrigger value="inativos">Inativos</TabsTrigger>
            </TabsList>
            <TabsContent value="todos">
              <TabelaUsuarios
                usuarios={usuariosFiltrados}
                onEditUsuario={(usuario) => setEditingUserFull(usuario)}
                onAlterarStatus={alterarStatusUsuario}
                onExcluir={excluirUsuario}
              />
            </TabsContent>
            <TabsContent value="ativos">
              <TabelaUsuarios
                usuarios={usuariosFiltrados.filter((u) => u.status === "Ativo")}
                onEditUsuario={(usuario) => setEditingUserFull(usuario)}
                onAlterarStatus={alterarStatusUsuario}
                onExcluir={excluirUsuario}
              />
            </TabsContent>
            <TabsContent value="inativos">
              <TabelaUsuarios
                usuarios={usuariosFiltrados.filter((u) => u.status === "Inativo")}
                onEditUsuario={(usuario) => setEditingUserFull(usuario)}
                onAlterarStatus={alterarStatusUsuario}
                onExcluir={excluirUsuario}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Modal para editar usuário completo */}
      <Dialog open={!!editingUserFull} onOpenChange={(open) => !open && setEditingUserFull(null)}>
        <DialogContent className="sm:max-w-[500px]">
          {editingUserFull && <EditarUsuarioForm usuario={editingUserFull} onSubmit={atualizarUsuario} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Componente para a tabela de usuários
function TabelaUsuarios({
  usuarios,
  onEditUsuario,
  onAlterarStatus,
  onExcluir,
}: {
  usuarios: User[]
  onEditUsuario: (usuario: User) => void
  onAlterarStatus: (id: number, status: "Ativo" | "Inativo") => void
  onExcluir: (id: number) => void
}) {
  const [usuarioParaExcluir, setUsuarioParaExcluir] = useState<number | null>(null)
  const [usuarioParaAlterarStatus, setUsuarioParaAlterarStatus] = useState<{
    id: number
    status: "Ativo" | "Inativo"
  } | null>(null)

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Permissões</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usuarios.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Nenhum usuário encontrado.
                </TableCell>
              </TableRow>
            ) : (
              usuarios.map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell className="font-medium">{usuario.nome}</TableCell>
                  <TableCell>{usuario.email}</TableCell>
                  <TableCell>{usuario.cargo}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        usuario.status === "Ativo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {usuario.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(usuario.permissoes)
                        .filter(([_, value]) => value)
                        .map(([key]) => (
                          <span key={key} className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded-full text-xs">
                            {formatarPermissao(key)}
                          </span>
                        ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => onEditUsuario(usuario)} title="Editar usuário">
                        <PencilLine className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          setUsuarioParaAlterarStatus({
                            id: usuario.id,
                            status: usuario.status === "Ativo" ? "Inativo" : "Ativo",
                          })
                        }
                        title={usuario.status === "Ativo" ? "Inativar usuário" : "Ativar usuário"}
                      >
                        {usuario.status === "Ativo" ? (
                          <UserX className="h-4 w-4 text-amber-600" />
                        ) : (
                          <UserCheck className="h-4 w-4 text-green-600" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setUsuarioParaExcluir(usuario.id)}
                        title="Excluir usuário"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Modal de confirmação para exclusão */}
      <Dialog open={usuarioParaExcluir !== null} onOpenChange={(open) => !open && setUsuarioParaExcluir(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-red-600">Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setUsuarioParaExcluir(null)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (usuarioParaExcluir !== null) {
                  onExcluir(usuarioParaExcluir)
                  setUsuarioParaExcluir(null)
                }
              }}
            >
              Excluir
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de confirmação para alteração de status */}
      <Dialog
        open={usuarioParaAlterarStatus !== null}
        onOpenChange={(open) => !open && setUsuarioParaAlterarStatus(null)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {usuarioParaAlterarStatus?.status === "Inativo" ? "Ativar Usuário" : "Inativar Usuário"}
            </DialogTitle>
            <DialogDescription>
              {usuarioParaAlterarStatus?.status === "Inativo"
                ? "Deseja ativar este usuário? Ele poderá acessar o sistema novamente."
                : "Deseja inativar este usuário? Ele não poderá mais acessar o sistema."}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setUsuarioParaAlterarStatus(null)}>
              Cancelar
            </Button>
            <Button
              variant={usuarioParaAlterarStatus?.status === "Inativo" ? "default" : "secondary"}
              onClick={() => {
                if (usuarioParaAlterarStatus !== null) {
                  onAlterarStatus(usuarioParaAlterarStatus.id, usuarioParaAlterarStatus.status)
                  setUsuarioParaAlterarStatus(null)
                }
              }}
            >
              {usuarioParaAlterarStatus?.status === "Inativo" ? "Ativar" : "Inativar"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

// Componente para o formulário de novo usuário
function NovoUsuarioForm({ onSubmit }: { onSubmit: (usuario: Omit<User, "id">) => void }) {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cargo: "",
    senha: "",
    confirmarSenha: "",
    status: "Ativo" as "Ativo" | "Inativo",
    permissoes: {
      cadastro: false,
      visualizacao: true,
      edicao: false,
      exclusao: false,
      relatorios: false,
      administracao: false,
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem!")
      return
    }

    const { confirmarSenha, ...userData } = formData
    onSubmit(userData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          Adicionar Novo Usuário
        </DialogTitle>
        <DialogDescription>Preencha os dados para criar um novo usuário no sistema</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome Completo</Label>
            <Input id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="cargo">Cargo</Label>
            <Input id="cargo" name="cargo" value={formData.cargo} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              name="status"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as "Ativo" | "Inativo" })}
            >
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="senha">Senha</Label>
            <Input id="senha" name="senha" type="password" value={formData.senha} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
            <Input
              id="confirmarSenha"
              name="confirmarSenha"
              type="password"
              value={formData.confirmarSenha}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Permissões</Label>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="cadastro"
                checked={formData.permissoes.cadastro}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    permissoes: {
                      ...formData.permissoes,
                      cadastro: checked === true,
                    },
                  })
                }
              />
              <Label htmlFor="cadastro">Cadastro</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="visualizacao"
                checked={formData.permissoes.visualizacao}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    permissoes: {
                      ...formData.permissoes,
                      visualizacao: checked === true,
                    },
                  })
                }
              />
              <Label htmlFor="visualizacao">Visualização</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="edicao"
                checked={formData.permissoes.edicao}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    permissoes: {
                      ...formData.permissoes,
                      edicao: checked === true,
                    },
                  })
                }
              />
              <Label htmlFor="edicao">Edição</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="exclusao"
                checked={formData.permissoes.exclusao}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    permissoes: {
                      ...formData.permissoes,
                      exclusao: checked === true,
                    },
                  })
                }
              />
              <Label htmlFor="exclusao">Exclusão</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="relatorios"
                checked={formData.permissoes.relatorios}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    permissoes: {
                      ...formData.permissoes,
                      relatorios: checked === true,
                    },
                  })
                }
              />
              <Label htmlFor="relatorios">Relatórios</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="administracao"
                checked={formData.permissoes.administracao}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    permissoes: {
                      ...formData.permissoes,
                      administracao: checked === true,
                    },
                  })
                }
              />
              <Label htmlFor="administracao">Administração</Label>
            </div>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Criar Usuário</Button>
      </DialogFooter>
    </form>
  )
}

// Componente para o formulário de edição completa de usuário
function EditarUsuarioForm({ usuario, onSubmit }: { usuario: User; onSubmit: (usuario: User) => void }) {
  const [formData, setFormData] = useState({
    ...usuario,
    senha: "",
    confirmarSenha: "",
    alterarSenha: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.alterarSenha && formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem!")
      return
    }

    const { confirmarSenha, alterarSenha, ...userData } = formData

    // Se não estiver alterando a senha, não envie o campo senha
    if (!alterarSenha) {
      const { senha, ...userDataSemSenha } = userData
      onSubmit(userDataSemSenha as User)
    } else {
      onSubmit(userData as User)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <PencilLine className="h-5 w-5" />
          Editar Usuário
        </DialogTitle>
        <DialogDescription>Atualize as informações do usuário</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="edit-nome">Nome Completo</Label>
            <Input id="edit-nome" name="nome" value={formData.nome} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-email">Email</Label>
            <Input id="edit-email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="edit-cargo">Cargo</Label>
            <Input id="edit-cargo" name="cargo" value={formData.cargo} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-status">Status</Label>
            <select
              id="edit-status"
              name="status"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as "Ativo" | "Inativo" })}
            >
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="alterarSenha"
              checked={formData.alterarSenha}
              onCheckedChange={(checked) =>
                setFormData({
                  ...formData,
                  alterarSenha: checked === true,
                  senha: "",
                  confirmarSenha: "",
                })
              }
            />
            <Label htmlFor="alterarSenha">Alterar senha</Label>
          </div>
        </div>

        {formData.alterarSenha && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-senha">Nova Senha</Label>
              <Input
                id="edit-senha"
                name="senha"
                type="password"
                value={formData.senha}
                onChange={handleChange}
                required={formData.alterarSenha}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-confirmarSenha">Confirmar Nova Senha</Label>
              <Input
                id="edit-confirmarSenha"
                name="confirmarSenha"
                type="password"
                value={formData.confirmarSenha}
                onChange={handleChange}
                required={formData.alterarSenha}
              />
            </div>
          </div>
        )}

        <div className="space-y-2 pt-2 border-t">
          <Label>Permissões</Label>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="edit-cadastro"
                checked={formData.permissoes.cadastro}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    permissoes: {
                      ...formData.permissoes,
                      cadastro: checked === true,
                    },
                  })
                }
              />
              <Label htmlFor="edit-cadastro">Cadastro</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="edit-visualizacao"
                checked={formData.permissoes.visualizacao}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    permissoes: {
                      ...formData.permissoes,
                      visualizacao: checked === true,
                    },
                  })
                }
              />
              <Label htmlFor="edit-visualizacao">Visualização</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="edit-edicao"
                checked={formData.permissoes.edicao}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    permissoes: {
                      ...formData.permissoes,
                      edicao: checked === true,
                    },
                  })
                }
              />
              <Label htmlFor="edit-edicao">Edição</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="edit-exclusao"
                checked={formData.permissoes.exclusao}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    permissoes: {
                      ...formData.permissoes,
                      exclusao: checked === true,
                    },
                  })
                }
              />
              <Label htmlFor="edit-exclusao">Exclusão</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="edit-relatorios"
                checked={formData.permissoes.relatorios}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    permissoes: {
                      ...formData.permissoes,
                      relatorios: checked === true,
                    },
                  })
                }
              />
              <Label htmlFor="edit-relatorios">Relatórios</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="edit-administracao"
                checked={formData.permissoes.administracao}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    permissoes: {
                      ...formData.permissoes,
                      administracao: checked === true,
                    },
                  })
                }
              />
              <Label htmlFor="edit-administracao">Administração</Label>
            </div>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Salvar Alterações</Button>
      </DialogFooter>
    </form>
  )
}

// Função auxiliar para formatar nomes de permissões
function formatarPermissao(permissao: string): string {
  const formatacoes: Record<string, string> = {
    cadastro: "Cadastro",
    visualizacao: "Visualização",
    edicao: "Edição",
    exclusao: "Exclusão",
    relatorios: "Relatórios",
    administracao: "Administração",
  }

  return formatacoes[permissao] || permissao
}

// Tipos
interface Permissoes {
  cadastro: boolean
  visualizacao: boolean
  edicao: boolean
  exclusao: boolean
  relatorios: boolean
  administracao: boolean
}

interface User {
  id: number
  nome: string
  email: string
  cargo: string
  status: "Ativo" | "Inativo"
  permissoes: Permissoes
}

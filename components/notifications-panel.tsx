"use client"

import { useEffect, useState } from "react"
import { Bell, AlertTriangle, ArrowRight, Activity, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { simulateRFIDData } from "@/lib/rfid-simulator"
import { type Notification, NotificationItem } from "@/components/notification-item"
import { ActivityChart } from "@/components/activity-chart"
import { TopAssetsList } from "@/components/top-assets-list"

export function NotificationsPanel() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [activeTab, setActiveTab] = useState("todas")

  useEffect(() => {
    // Inicializa com algumas notificações
    setNotifications(simulateRFIDData(5))

    // Simula novas notificações chegando a cada 8-15 segundos
    const interval = setInterval(
      () => {
        setNotifications((prev) => {
          const newNotification = simulateRFIDData(1)[0]
          return [newNotification, ...prev].slice(0, 50) // Mantém apenas as 50 mais recentes
        })
      },
      Math.floor(Math.random() * 7000) + 8000,
    )

    return () => clearInterval(interval)
  }, [])

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "todas") return true
    if (activeTab === "alertas") return notification.type === "alert"
    if (activeTab === "movimentacoes") return notification.type === "movement"
    if (activeTab === "entradas") return notification.type === "entry"
    if (activeTab === "saidas") return notification.type === "exit"
    return true
  })

  const alertCount = notifications.filter((n) => n.type === "alert").length

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between p-4 sm:p-6">
          <div>
            <CardTitle className="text-lg sm:text-xl">Notificações em Tempo Real</CardTitle>
            <CardDescription className="hidden sm:block">
              Acompanhe a movimentação dos ativos em tempo real
            </CardDescription>
          </div>
          <div className="flex items-center">
            <Bell className="h-5 w-5 mr-2 text-muted-foreground" />
            <Badge variant="destructive">{notifications.length}</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          <Tabs defaultValue="todas" onValueChange={setActiveTab}>
            <TabsList className="mb-4 w-full overflow-x-auto">
              <TabsTrigger value="todas">Todas</TabsTrigger>
              <TabsTrigger value="alertas" className="relative">
                Alertas
                {alertCount > 0 && (
                  <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 flex items-center justify-center">
                    {alertCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="movimentacoes">
                <span className="hidden sm:inline">Movimentações</span>
                <span className="sm:hidden">Movim.</span>
              </TabsTrigger>
              <TabsTrigger value="entradas">Entradas</TabsTrigger>
              <TabsTrigger value="saidas">Saídas</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab} className="mt-0">
              <ScrollArea className="h-[350px] sm:h-[400px] md:h-[500px] pr-2 sm:pr-4">
                {filteredNotifications.length > 0 ? (
                  <div className="space-y-3 sm:space-y-4">
                    {filteredNotifications.map((notification) => (
                      <NotificationItem key={notification.id} notification={notification} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[300px] sm:h-[400px] text-muted-foreground">
                    <Bell className="h-12 w-12 mb-4 opacity-20" />
                    <p>Nenhuma notificação encontrada</p>
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="space-y-4 sm:space-y-6">
        <Card>
          <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-3">
            <CardTitle className="text-base sm:text-lg">Atividade por Hora</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Distribuição de eventos nas últimas 24h</CardDescription>
          </CardHeader>
          <CardContent className="p-2 sm:p-4">
            <ActivityChart notifications={notifications} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-3">
            <CardTitle className="text-base sm:text-lg">Ativos Mais Movimentados</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Top 5 ativos com mais atividade</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-2 sm:pt-3">
            <TopAssetsList notifications={notifications} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-3">
            <CardTitle className="text-base sm:text-lg">Resumo de Atividades</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Últimas 24 horas</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-2 sm:pt-3">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Activity className="h-4 w-4 mr-2 text-blue-500" />
                  <span className="text-sm">Movimentações</span>
                </div>
                <Badge variant="outline">{notifications.filter((n) => n.type === "movement").length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-green-500" />
                  <span className="text-sm">Entradas</span>
                </div>
                <Badge variant="outline">{notifications.filter((n) => n.type === "entry").length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-orange-500 transform rotate-180" />
                  <span className="text-sm">Saídas</span>
                </div>
                <Badge variant="outline">{notifications.filter((n) => n.type === "exit").length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
                  <span className="text-sm">Alertas</span>
                </div>
                <Badge variant="outline">{notifications.filter((n) => n.type === "alert").length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Zap className="h-4 w-4 mr-2 text-purple-500" />
                  <span className="text-sm">Total</span>
                </div>
                <Badge>{notifications.length}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

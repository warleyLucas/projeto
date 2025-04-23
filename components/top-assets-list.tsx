"use client"

import { useMemo } from "react"
import { Activity, AlertTriangle, ArrowRight } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import type { Notification } from "@/components/notification-item"

interface TopAssetsListProps {
  notifications: Notification[]
}

interface AssetActivity {
  assetId: string
  assetName: string
  count: number
  movements: number
  entries: number
  exits: number
  alerts: number
  lastSeen: Date
  lastLocation: string
}

export function TopAssetsList({ notifications }: TopAssetsListProps) {
  // Processa os dados para encontrar os ativos mais ativos
  const topAssets = useMemo(() => {
    // Agrupa notificações por assetId
    const assetMap = new Map<string, AssetActivity>()

    notifications.forEach((notification) => {
      if (!assetMap.has(notification.assetId)) {
        assetMap.set(notification.assetId, {
          assetId: notification.assetId,
          assetName: notification.assetName,
          count: 0,
          movements: 0,
          entries: 0,
          exits: 0,
          alerts: 0,
          lastSeen: notification.timestamp,
          lastLocation: notification.location,
        })
      }

      const asset = assetMap.get(notification.assetId)!
      asset.count += 1

      // Incrementa o contador do tipo específico
      if (notification.type === "movement") asset.movements += 1
      if (notification.type === "entry") asset.entries += 1
      if (notification.type === "exit") asset.exits += 1
      if (notification.type === "alert") asset.alerts += 1

      // Atualiza a última localização se esta notificação for mais recente
      if (notification.timestamp > asset.lastSeen) {
        asset.lastSeen = notification.timestamp
        asset.lastLocation = notification.location
      }
    })

    // Converte para array e ordena por contagem
    const assetsArray = Array.from(assetMap.values())
    assetsArray.sort((a, b) => b.count - a.count)

    // Retorna os 5 primeiros
    return assetsArray.slice(0, 5)
  }, [notifications])

  // Encontra o valor máximo para normalizar a barra de progresso
  const maxCount = useMemo(() => {
    return topAssets.length > 0 ? topAssets[0].count : 0
  }, [topAssets])

  if (topAssets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[120px] sm:h-[180px] text-muted-foreground">
        <Activity className="h-10 w-10 sm:h-12 sm:w-12 mb-2 sm:mb-4 opacity-20" />
        <p className="text-sm">Sem dados suficientes</p>
      </div>
    )
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {topAssets.map((asset) => (
        <div key={asset.assetId} className="space-y-1 sm:space-y-2">
          <div className="flex justify-between items-center">
            <div className="truncate font-medium text-xs sm:text-sm max-w-[70%]">{asset.assetName}</div>
            <Badge variant="outline" className="text-xs">
              {asset.count}
            </Badge>
          </div>
          <Progress value={(asset.count / maxCount) * 100} className="h-1.5 sm:h-2" />
          <div className="flex flex-wrap justify-between text-[10px] sm:text-xs text-muted-foreground">
            <div className="flex flex-wrap gap-1 sm:gap-2">
              <span className="flex items-center">
                <Activity className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 sm:mr-1 text-blue-500" />
                {asset.movements}
              </span>
              <span className="flex items-center">
                <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 sm:mr-1 text-green-500" />
                {asset.entries}
              </span>
              <span className="flex items-center">
                <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 sm:mr-1 text-orange-500 transform rotate-180" />
                {asset.exits}
              </span>
              <span className="flex items-center">
                <AlertTriangle className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 sm:mr-1 text-red-500" />
                {asset.alerts}
              </span>
            </div>
            <span className="truncate max-w-[120px]">{asset.lastLocation}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

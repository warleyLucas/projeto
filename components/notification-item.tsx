"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { AlertTriangle, ArrowRight, MapPin, MoreHorizontal, Clock, ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export type NotificationType = "movement" | "alert" | "entry" | "exit"

export interface Notification {
  id: string
  type: NotificationType
  assetId: string
  assetName: string
  location: string
  previousLocation?: string
  timestamp: Date
  description: string
  priority: "low" | "medium" | "high"
}

interface NotificationItemProps {
  notification: Notification
}

export function NotificationItem({ notification }: NotificationItemProps) {
  const [expanded, setExpanded] = useState(false)

  const getIcon = () => {
    switch (notification.type) {
      case "alert":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "movement":
        return <MapPin className="h-5 w-5 text-blue-500" />
      case "entry":
        return <ArrowRight className="h-5 w-5 text-green-500" />
      case "exit":
        return <ArrowRight className="h-5 w-5 text-orange-500 transform rotate-180" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getTypeLabel = () => {
    switch (notification.type) {
      case "alert":
        return "Alerta"
      case "movement":
        return "Movimentação"
      case "entry":
        return "Entrada"
      case "exit":
        return "Saída"
      default:
        return "Notificação"
    }
  }

  const getBadgeVariant = () => {
    switch (notification.type) {
      case "alert":
        return "destructive"
      case "movement":
        return "default"
      case "entry":
        return "success"
      case "exit":
        return "warning"
      default:
        return "secondary"
    }
  }

  const getPriorityBadge = () => {
    switch (notification.priority) {
      case "high":
        return (
          <Badge variant="destructive" className="hidden sm:inline-flex">
            Alta
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="warning" className="hidden sm:inline-flex">
            Média
          </Badge>
        )
      case "low":
        return (
          <Badge variant="secondary" className="hidden sm:inline-flex">
            Baixa
          </Badge>
        )
      default:
        return null
    }
  }

  const timeAgo = formatDistanceToNow(notification.timestamp, {
    addSuffix: true,
    locale: ptBR,
  })

  return (
    <Card
      className={`border-l-4 ${
        notification.type === "alert"
          ? "border-l-red-500"
          : notification.type === "movement"
            ? "border-l-blue-500"
            : notification.type === "entry"
              ? "border-l-green-500"
              : "border-l-orange-500"
      }`}
    >
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-2 sm:space-x-4">
            <div className="mt-1">{getIcon()}</div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="font-medium text-sm sm:text-base truncate max-w-[150px] sm:max-w-full">
                  {notification.assetName}
                </h4>
                <Badge variant={getBadgeVariant()} className="text-xs">
                  {getTypeLabel()}
                </Badge>
                {getPriorityBadge()}
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2 sm:line-clamp-none">
                {notification.description}
              </p>

              {expanded && (
                <div className="mt-3 space-y-2 text-xs sm:text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <span className="text-muted-foreground">ID do Ativo:</span>
                      <p className="truncate">{notification.assetId}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Localização:</span>
                      <p className="truncate">{notification.location}</p>
                    </div>
                    {notification.previousLocation && (
                      <div>
                        <span className="text-muted-foreground">Localização Anterior:</span>
                        <p className="truncate">{notification.previousLocation}</p>
                      </div>
                    )}
                    <div>
                      <span className="text-muted-foreground">Data/Hora:</span>
                      <p>{notification.timestamp.toLocaleString("pt-BR")}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center mt-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                <span>{timeAgo}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2 ml-2">
            <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)} className="h-7 w-7 p-0">
              {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                <DropdownMenuItem>Marcar como lida</DropdownMenuItem>
                <DropdownMenuItem>Rastrear ativo</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { useMemo } from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import type { Notification } from "@/components/notification-item"

interface ActivityChartProps {
  notifications: Notification[]
}

export function ActivityChart({ notifications }: ActivityChartProps) {
  // Processa os dados para o gráfico
  const chartData = useMemo(() => {
    // Inicializa um array com 24 horas, cada uma com contagem 0
    const hourlyData = Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      count: 0,
      label: `${i}:00`,
    }))

    // Conta as notificações por hora
    notifications.forEach((notification) => {
      const hour = notification.timestamp.getHours()
      hourlyData[hour].count += 1
    })

    // Retorna apenas as horas com dados ou as últimas 12 horas se não houver dados suficientes
    const filteredData = hourlyData.filter((item) => item.count > 0)
    return filteredData.length > 0 ? filteredData : hourlyData.slice(12, 24)
  }, [notifications])

  return (
    <div className="h-[140px] sm:h-[180px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
          <XAxis
            dataKey="label"
            tick={{ fontSize: 9 }}
            tickFormatter={(value) => value.split(":")[0]}
            interval="preserveStartEnd"
          />
          <YAxis tick={{ fontSize: 9 }} width={20} />
          <Tooltip
            formatter={(value: number) => [`${value} eventos`, "Quantidade"]}
            labelFormatter={(label) => `${label} horas`}
            contentStyle={{ fontSize: "12px" }}
          />
          <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Eventos" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

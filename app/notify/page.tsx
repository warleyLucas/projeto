import { NotificationsPanel } from "@/components/notifications-panel"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
          Sistema de Monitoramento de Patrimônio RFID
        </h1>
        <NotificationsPanel />
      </div>
    </div>
  )
}

import { Header } from "@/components/layout/header"
import { NotificationsPanel } from "@/components/notifications-panel"

export default function Home() {
  return (
    
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto py-8 px-4">
        <NotificationsPanel />
      </div>
    </div>
  )
}

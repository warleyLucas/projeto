import { NotificationsPanel } from "@/components/notifications-panel"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto py-4 sm:py-8 px-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
          <Button variant="outline" size="sm" className="w-fit flex items-center gap-1" asChild>
            <Link href="/inicial">
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar</span>
            </Link>
          </Button>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
            Sistema de Monitoramento de Patrimônio RFID
          </h1>
        </div>
        <NotificationsPanel />
      </div>
    </div>
  )
}

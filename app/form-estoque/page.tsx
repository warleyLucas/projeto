import { Forms } from "@/components/forms"
import { AssetRegistrationForm } from "@/components/page"

export default function Home() {
  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Sistema de Registro de Patrimônio</h1>
      <div className="max-w-3xl mx-auto">
        <AssetRegistrationForm />
      </div>
    </main>
  )
}

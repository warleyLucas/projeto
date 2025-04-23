import type { Notification } from "@/components/notification-item"

// Localizações possíveis
const locations = [
  "Recepção",
  "Escritório Principal",
  "Sala de Reuniões",
  "Almoxarifado",
  "Departamento Técnico",
  "Saída",
]

// Tipos de ativos
const assetTypes = [
  "Laptop",
  "Monitor",
  "Projetor",
  "Cadeira Ergonômica",
  "Mesa",
  "Impressora",
  "Servidor",
  "Tablet",
  "Telefone IP",
  "Ar Condicionado",
]

// Gera um ID aleatório
function generateId() {
  return Math.random().toString(36).substring(2, 10).toUpperCase()
}

// Gera um timestamp aleatório nas últimas 24 horas
function generateTimestamp() {
  const now = new Date()
  const hoursAgo = Math.floor(Math.random() * 24)
  const minutesAgo = Math.floor(Math.random() * 60)
  const secondsAgo = Math.floor(Math.random() * 60)

  return new Date(now.getTime() - hoursAgo * 60 * 60 * 1000 - minutesAgo * 60 * 1000 - secondsAgo * 1000)
}

// Gera uma descrição baseada no tipo de notificação
function generateDescription(
  type: Notification["type"],
  assetName: string,
  location: string,
  previousLocation?: string,
) {
  switch (type) {
    case "movement":
      return `${assetName} foi movido de ${previousLocation} para ${location}`
    case "alert":
      const alertTypes = [
        `${assetName} em área não autorizada: ${location}`,
        `${assetName} em movimento fora do horário permitido`,
        `${assetName} sem registro de saída`,
        `Tentativa de remoção não autorizada de ${assetName}`,
      ]
      return alertTypes[Math.floor(Math.random() * alertTypes.length)]
    case "entry":
      return `${assetName} registrado na entrada: ${location}`
    case "exit":
      return `${assetName} registrado na saída: ${location}`
    default:
      return `Atualização de status: ${assetName} em ${location}`
  }
}

// Gera uma notificação aleatória
function generateRandomNotification(): Notification {
  // Gera IDs e nomes de ativos consistentes
  const assetId = generateId()
  const assetTypeIndex = Math.floor(Math.random() * assetTypes.length)
  const assetName = `${assetTypes[assetTypeIndex]} ${assetId.substring(0, 4)}`

  // Seleciona localizações
  const locationIndex = Math.floor(Math.random() * locations.length)
  let previousLocationIndex
  do {
    previousLocationIndex = Math.floor(Math.random() * locations.length)
  } while (previousLocationIndex === locationIndex)

  const location = locations[locationIndex]
  const previousLocation = locations[previousLocationIndex]

  // Determina o tipo de notificação
  const typeRandom = Math.random()
  let type: Notification["type"]

  if (typeRandom < 0.15) {
    type = "alert"
  } else if (typeRandom < 0.6) {
    type = "movement"
  } else if (typeRandom < 0.8) {
    type = "entry"
  } else {
    type = "exit"
  }

  // Determina a prioridade
  let priority: "low" | "medium" | "high"
  if (type === "alert") {
    priority = "high"
  } else if (type === "movement") {
    priority = Math.random() < 0.3 ? "medium" : "low"
  } else {
    priority = "low"
  }

  // Gera a descrição
  const description = generateDescription(type, assetName, location, previousLocation)

  return {
    id: generateId(),
    type,
    assetId,
    assetName,
    location,
    previousLocation: type === "movement" ? previousLocation : undefined,
    timestamp: generateTimestamp(),
    description,
    priority,
  }
}

// Função principal para simular dados RFID
export function simulateRFIDData(count = 1): Notification[] {
  const notifications: Notification[] = []

  for (let i = 0; i < count; i++) {
    notifications.push(generateRandomNotification())
  }

  // Ordena por timestamp (mais recente primeiro)
  return notifications.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
}

// Função para gerar dados de teste iniciais
export function generateInitialData(count = 10): Notification[] {
  return simulateRFIDData(count)
}

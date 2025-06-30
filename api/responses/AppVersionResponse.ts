export interface AppVersionResponse {
  statusCode: number
  timestamp: Date
  success: boolean
  message: string
  data: AppVersionData
}

export interface AppVersionData {
  app: App
}

export interface App {
  version: string
}

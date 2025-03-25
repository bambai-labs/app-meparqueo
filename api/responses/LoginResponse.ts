export interface LoginResponse {
  statusCode: number
  timestamp: Date
  success: boolean
  message: string
  data: Data
}

export interface Data {
  token: string
  user: User
}

export interface User {
  id: string
  email: string
  password: string
  personId: null
  role: string
  globalStatus: string
  createdAt: Date
  updatedAt: Date
}

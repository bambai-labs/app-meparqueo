import AsyncStorage from '@react-native-async-storage/async-storage'
import io, { Socket } from 'socket.io-client'

interface UserConnectionEvent {
  userId: string
  role: string
}

interface UserDisconnectionEvent {
  userId: string
}

class MeParqueoSocket {
  private static instance: MeParqueoSocket
  private socket: Socket | null = null
  private connectionListeners: {
    onUserConnected?: (data: UserConnectionEvent) => void
    onUserDisconnected?: (data: UserDisconnectionEvent) => void
  } = {}

  private constructor() {}

  public static getInstance(): MeParqueoSocket {
    if (!MeParqueoSocket.instance) {
      MeParqueoSocket.instance = new MeParqueoSocket()
    }
    return MeParqueoSocket.instance
  }

  public async initialize(): Promise<Socket> {
    if (this.socket?.connected) return this.socket

    const token = await AsyncStorage.getItem('userToken')

    this.socket = io(process.env.EXPO_PUBLIC_MEPARQUEO_API, {
      transports: ['websocket'],
      autoConnect: true,
      withCredentials: true,
      auth: { token: token },
    })

    this.setupGlobalListeners()
    return this.socket
  }

  public getSocket(): Socket {
    if (!this.socket) {
      throw new Error('Uninitialized socket. Call initialize() first.')
    }
    return this.socket
  }

  public async updateToken(newToken: string): Promise<void> {
    await AsyncStorage.setItem('userToken', newToken)
    if (this.socket) {
      this.socket.auth = { token: newToken }
      this.socket.disconnect().connect()
    }
  }

  private setupGlobalListeners(): void {
    if (!this.socket) return

    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket?.id)
    })

    this.socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason)
    })

    this.socket.on('connect_error', (err) => {
      console.log('Connection error:', err.message)
    })

    // Backend-specific events
    this.socket.on('user_connected', (data: UserConnectionEvent) => {
      console.log('User connected:', data)
      this.connectionListeners.onUserConnected?.(data)
    })

    this.socket.on('user_disconnected', (data: UserDisconnectionEvent) => {
      console.log('User disconnected:', data)
      this.connectionListeners.onUserDisconnected?.(data)
    })

    this.socket.on('error', (err) => {
      console.log('Connection error:', err.message)
    })
  }

  // Method to register custom connection event listeners
  public setConnectionListeners(listeners: {
    onUserConnected?: (data: UserConnectionEvent) => void
    onUserDisconnected?: (data: UserDisconnectionEvent) => void
  }) {
    this.connectionListeners = listeners
  }
}

export const socketManager = MeParqueoSocket.getInstance()

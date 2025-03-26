import AsyncStorage from '@react-native-async-storage/async-storage'
import io, { Socket } from 'socket.io-client'

let socket: Socket | null = null

export const initializeSocket = async () => {
  const token = await AsyncStorage.getItem('userToken')

  socket = io(process.env.EXPO_PUBLIC_MEPARQUEO_API, {
    transports: ['websocket'],
    autoConnect: true,
    withCredentials: true,
    auth: {
      token: token,
    },
  })

  return socket
}

export const getSocket = () => {
  if (!socket) {
    throw new Error('Socket no inicializado. Llama a initializeSocket primero.')
  }
  return socket
}

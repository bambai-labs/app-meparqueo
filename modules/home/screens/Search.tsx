import { Box } from '@/components/ui/box'
import { VStack } from '@/components/ui/vstack'
import { Camera, MapView, MarkerView } from '@rnmapbox/maps'
import Constants from 'expo-constants'
import { Stack } from 'expo-router'
import React, { useEffect, useRef } from 'react'
import { StyleSheet, Text } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { ParkingResultCard, SearchBar } from '../components'

export const SearchScreen = () => {
  const cameraRef = useRef<Camera>(null)

  useEffect(() => {
    cameraRef.current?.setCamera({
      centerCoordinate: [-75.861874, 8.785986],
      zoomLevel: 14,
      pitch: 0,
      heading: 0,
      animationDuration: 1000,
    })
  }, [])

  const setCameraPosition = (position: [number, number]) => {
    cameraRef.current?.setCamera({
      centerCoordinate: position,
      zoomLevel: 14,
      pitch: 45,
      heading: 0,
      animationDuration: 1000,
    })
  }

  return (
    <GestureHandlerRootView>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <VStack
        style={{
          paddingTop: Constants.statusBarHeight + 20,
        }}
        className="h-screen w-full"
      >
        <Box className="px-4">
          <SearchBar />
        </Box>

        <Box className="flex-1 mt-4 relative">
          <MapView
            style={{
              height: '100%',
              width: '100%',
            }}
            logoEnabled={false}
          >
            <Camera ref={cameraRef} />

            <MarkerView
              coordinate={[-75.861874, 8.785986]} // Ejemplo: coordenadas (longitud, latitud)
            >
              <Box className="p-3 bg-white rounded-full">
                <Text>Parqueadero casa del pino</Text>
              </Box>
            </MarkerView>

            <MarkerView
              coordinate={[-75.862803, 8.77373]} // Ejemplo: coordenadas (longitud, latitud)
            >
              <Box className="p-3 bg-white rounded-full">
                <Text>Parqueadero de la castellana</Text>
              </Box>
            </MarkerView>

            <MarkerView
              coordinate={[-75.892234, 8.736762]} // Ejemplo: coordenadas (longitud, latitud)
            >
              <Box className="p-3 bg-white rounded-full">
                <Text>Parqueadero donde el Fronti</Text>
              </Box>
            </MarkerView>
          </MapView>

          <ParkingResultCard
            className="absolute bottom-5 left-5"
            onPress={setCameraPosition}
          />
        </Box>
      </VStack>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    height: 300,
    width: 300,
    backgroundColor: 'tomato',
  },
  map: {
    flex: 1,
  },
})

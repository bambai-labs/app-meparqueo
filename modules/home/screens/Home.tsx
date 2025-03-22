import { Box } from '@/components/ui/box'
import { Button, ButtonText } from '@/components/ui/button'
import { HStack } from '@/components/ui/hstack'
import { ArrowRightIcon, Icon } from '@/components/ui/icon'
import { Input, InputField } from '@/components/ui/input'
import { VStack } from '@/components/ui/vstack'
import { Chip, ScreenWrapper } from '@/modules/common'
import Constants from 'expo-constants'
import { Stack } from 'expo-router'
import { useState } from 'react'
import { FlatList, Image, Text, View } from 'react-native'
import { RecentParkingCard } from '../components'
import {
  ParkingLotAvailability,
  ParkingStatus,
  RecentParkingLot,
} from '../types'

const recentParkings: RecentParkingLot[] = [
  {
    availability: ParkingLotAvailability.MORE_THAN_FIVE,
    status: ParkingStatus.OPEN,
    images: [],
    latitude: -75.7149219,
    longitude: 8.7990835,
    name: 'Parking Splash',
    paymentMethods: [],
    phoneNumber: '+1234567890',
    price: 2500,
    services: [],
    timestamp: new Date().getTime(),
  },
]

export const HomeScreen = () => {
  const [chipSelected, setChipSelected] = useState(false)

  const toggleChip = () => {
    setChipSelected(!chipSelected)
  }

  return (
    <ScreenWrapper>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <VStack
        style={{
          paddingTop: Constants.statusBarHeight + 20,
        }}
      >
        <HStack>
          <Input
            style={{
              borderEndStartRadius: 0,
              borderEndEndRadius: 0,
              borderStartStartRadius: 8,
              borderStartEndRadius: 8,
            }}
            className="flex-1"
            variant="outline"
            size="xl"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
          >
            <InputField placeholder="A que dirección quieres ir?" />
          </Input>

          <Button
            size="xl"
            style={{
              borderStartStartRadius: 0,
              borderStartEndRadius: 0,
              borderEndStartRadius: 8,
              borderEndEndRadius: 8,
            }}
          >
            <Icon as={ArrowRightIcon} size="md" color="white" />
          </Button>
        </HStack>

        <Box className="w-full items-start mt-6">
          <Chip selected={chipSelected} onPress={toggleChip}>
            <ButtonText>Recientes</ButtonText>
          </Chip>
        </Box>

        {!chipSelected && (
          <VStack className="h-[80%] flex-col justify-center items-center">
            <Image source={require('@/assets/images/parking.png')} />
            <View>
              <Text className="font-bold text-2xl text-center">
                Comienza tu experiencia con Me Parqueo. Busca tu destino 👆
              </Text>
            </View>
          </VStack>
        )}

        <FlatList
          className="mt-5"
          data={recentParkings}
          renderItem={({ item }) => <RecentParkingCard recentParking={item} />}
          keyExtractor={(item) => item.name}
        />
      </VStack>
    </ScreenWrapper>
  )
}

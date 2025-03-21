import { Box } from '@/components/ui/box'
import { Button, ButtonText } from '@/components/ui/button'
import { HStack } from '@/components/ui/hstack'
import { ArrowRightIcon, Icon } from '@/components/ui/icon'
import { Input, InputField } from '@/components/ui/input'
import { VStack } from '@/components/ui/vstack'
import { ScreenWrapper } from '@/modules/components'
import Constants from 'expo-constants'
import { Stack } from 'expo-router'
import React from 'react'
import { Image, Text, View } from 'react-native'

export const HomeScreen = () => {
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
          <Button className="rounded-full">
            <ButtonText>Recientes</ButtonText>
          </Button>
        </Box>
        <VStack className="h-[80%] flex-col justify-center items-center">
          <Image source={require('@/assets/images/parking.png')} />
          <View>
            <Text className="font-bold text-2xl text-center">
              Comienza tu experiencia con Me Parqueo. Busca tu destino 👆
            </Text>
          </View>
        </VStack>
      </VStack>
    </ScreenWrapper>
  )
}

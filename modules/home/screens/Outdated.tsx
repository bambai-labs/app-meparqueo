import { Button, ButtonText } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { HStack } from '@/components/ui/hstack'
import { Icon } from '@/components/ui/icon'
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalHeader,
} from '@/components/ui/modal'
import { VStack } from '@/components/ui/vstack'
import { ScreenWrapper } from '@/modules/common'
import * as Linking from 'expo-linking'
import { Stack } from 'expo-router'
import { Download } from 'lucide-react-native'
import { Platform, Text } from 'react-native'

export const OutdatedScreen = () => {
  const handleUpdate = async () => {
    try {
      if (Platform.OS === 'ios') {
        const appStoreUrl = 'https://apps.apple.com/app/id6747217841'
        await Linking.openURL(appStoreUrl)
        return
      }

      const playStoreUrl =
        'https://play.google.com/store/apps/details?id=com.markuswater.meparqueoapp'
      await Linking.openURL(playStoreUrl)
    } catch (error) {
      console.error('Error al abrir la tienda:', error)
    }
  }

  return (
    <ScreenWrapper>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <Modal isOpen={true} onClose={() => {}}>
        <ModalBackdrop />
        <ModalContent>
          <HStack className="w-full justify-center" space="md">
            <Icon size="xl" as={Download} color="#3b7ef6" />
          </HStack>

          <ModalHeader>
            <Heading>Actualización disponible</Heading>
          </ModalHeader>

          <ModalBody>
            <VStack className="w-full" space="md">
              <Text>
                Actualiza a la última versión y accede a nuevas funciones,
                mejoras de rendimiento y mayor seguridad.
              </Text>

              <Button onPress={handleUpdate}>
                <ButtonText>Actualizar</ButtonText>
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </ScreenWrapper>
  )
}

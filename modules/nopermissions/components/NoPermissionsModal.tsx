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
import { Download } from 'lucide-react-native'
import { Text } from 'react-native'
import { useNoPermissionsModal } from '../hooks'

export const NoPermissionsModal = () => {
  const { handleOpenConfig } = useNoPermissionsModal()

  return (
    <Modal isOpen={true} onClose={() => {}}>
      <ModalBackdrop />
      <ModalContent>
        <HStack className="w-full justify-center" space="md">
          <Icon size="xl" as={Download} color="#3b7ef6" />
        </HStack>

        <ModalHeader>
          <Heading>Permisos requeridos</Heading>
        </ModalHeader>

        <ModalBody>
          <VStack className="w-full" space="md">
            <Text>
              Para usar la aplicación, necesitamos acceder a tu ubicación. Por
              favor, habilita los permisos en la configuración de tu
              dispositivo.
            </Text>

            <Button onPress={handleOpenConfig}>
              <ButtonText>Abrir configuración</ButtonText>
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

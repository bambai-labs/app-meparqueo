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
import { Spinner } from '@/components/ui/spinner'
import { VStack } from '@/components/ui/vstack'
import { MapPin } from 'lucide-react-native'
import { Text } from 'react-native'
import { useNoPermissionsModal } from '../hooks'

interface Props {
  isOpen: boolean
  onClose: () => void
  onCheckPermissions: () => void
  isCheckingPermissions?: boolean
  errorMessage?: string | null
}

export const NoPermissionsModal = ({
  isOpen,
  onClose,
  onCheckPermissions,
  isCheckingPermissions = false,
  errorMessage,
}: Props) => {
  const { handleOpenConfig } = useNoPermissionsModal()

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent>
        <HStack className="w-full justify-center" space="md">
          <Icon style={{ width: 50, height: 50 }} as={MapPin} color="#3b7ef6" />
        </HStack>

        <ModalHeader className="mt-4">
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

            <Button
              onPress={onCheckPermissions}
              disabled={isCheckingPermissions}
              variant="outline"
            >
              {isCheckingPermissions ? (
                <HStack space="sm" className="items-center">
                  <Spinner />
                  <ButtonText>Verificando permisos...</ButtonText>
                </HStack>
              ) : (
                <ButtonText>Verificar permisos</ButtonText>
              )}
            </Button>
            {errorMessage && (
              <Text className="text-red-500 font-bold mt-1 text-center">
                {errorMessage}
              </Text>
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

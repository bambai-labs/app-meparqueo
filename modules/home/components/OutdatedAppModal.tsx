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
import { useOutdatedAppModal } from '../hooks'

export const OutdatedAppModal = () => {
  const { handleUpdate } = useOutdatedAppModal()

  return (
    <Modal isOpen={true} onClose={() => {}}>
      <ModalBackdrop />
      <ModalContent>
        <HStack className="w-full justify-center" space="md">
          <Icon
            style={{ width: 50, height: 50 }}
            as={Download}
            color="#3b7ef6"
          />
        </HStack>

        <ModalHeader>
          <Heading>Actualización disponible</Heading>
        </ModalHeader>

        <ModalBody>
          <VStack className="w-full" space="md">
            <Text>
              Actualiza a la última versión y accede a nuevas funciones, mejoras
              de rendimiento y mayor seguridad.
            </Text>

            <Button onPress={handleUpdate}>
              <ButtonText>Actualizar</ButtonText>
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

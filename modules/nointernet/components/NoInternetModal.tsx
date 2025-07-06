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
import { WifiOff } from 'lucide-react-native'
import { Text } from 'react-native'

export const NoInternetModal = () => {
  return (
    <Modal isOpen={true} onClose={() => {}}>
      <ModalBackdrop />
      <ModalContent>
        <HStack className="w-full justify-center" space="md">
          <Icon
            style={{ width: 50, height: 50 }}
            as={WifiOff}
            color="#3b7ef6"
          />
        </HStack>

        <ModalHeader>
          <Heading>Sin conexión a internet</Heading>
        </ModalHeader>

        <ModalBody>
          <VStack className="w-full" space="md">
            <Text>
              Por favor, verifica tu conexión a internet y vuelve a entrar a la
              aplicación.
            </Text>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

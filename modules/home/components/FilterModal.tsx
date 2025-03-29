import { Button, ButtonText } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { HStack } from '@/components/ui/hstack'
import { CloseIcon, Icon } from '@/components/ui/icon'
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@/components/ui/modal'
import { Check } from 'lucide-react-native'
import { useState } from 'react'
import { Pressable, Text } from 'react-native'
import { FilterType, getFilterTypes } from '../types'
import { parseFilterType } from '../utils/parseFilterType'

interface Props {
  opened: boolean
  onCancel: () => void
  onConfirm: () => void
}

export const FilterModal = ({ opened, onCancel, onConfirm }: Props) => {
  const [filterType, setFilterType] = useState<FilterType | undefined>(
    undefined,
  )

  return (
    <Modal isOpen={opened} onClose={onCancel}>
      <ModalBackdrop />

      <ModalContent>
        <ModalHeader>
          <Heading>Filtros</Heading>
          <ModalCloseButton>
            <Icon
              as={CloseIcon}
              size="md"
              className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
            />
          </ModalCloseButton>
        </ModalHeader>

        <ModalBody>
          <Heading>Ordenar por</Heading>
          {getFilterTypes().map((filter) => (
            <Pressable onPress={() => setFilterType(filter)}>
              <HStack className="p-2 justify-between">
                <Text>{parseFilterType(filter)}</Text>
                {filterType === filter && <Icon as={Check} size="lg" />}
              </HStack>
            </Pressable>
          ))}
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" action="secondary" onPress={onCancel}>
            <ButtonText>Cancelar</ButtonText>
          </Button>
          <Button onPress={onConfirm}>
            <ButtonText>Reportar</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

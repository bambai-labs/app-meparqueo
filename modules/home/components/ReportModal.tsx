import { Button, ButtonText } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
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
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from '@/components/ui/select'
import { Textarea, TextareaInput } from '@/components/ui/textarea'
import { ChevronDownIcon } from 'lucide-react-native'

interface Props {
  opened: boolean
  onCancel: () => void
  onConfirm: () => void
}

export const ReportModal = ({ opened, onCancel, onConfirm }: Props) => {
  return (
    <Modal isOpen={opened} onClose={onCancel}>
      <ModalBackdrop />

      <ModalContent>
        <ModalHeader>
          <Heading>Reportar parqueadero</Heading>
          <ModalCloseButton>
            <Icon
              as={CloseIcon}
              size="md"
              className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
            />
          </ModalCloseButton>
        </ModalHeader>

        <ModalBody>
          <Select className="w-full">
            <SelectTrigger variant="outline" size="md">
              <SelectInput placeholder="Razón del reporte" className="flex-1" />
              <SelectIcon className="mr-3" as={ChevronDownIcon} />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                <SelectItem label="Mala atención" value="ma" />
                <SelectItem
                  label="No era la disponibilidad correcta"
                  value="nd"
                />
                <SelectItem
                  label="Otro"
                  value="Cross Platform Development Process"
                />
              </SelectContent>
            </SelectPortal>
          </Select>

          <Textarea size="md" className="mt-3">
            <TextareaInput placeholder="Comentarios" />
          </Textarea>
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

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
import { Spinner } from '@/components/ui/spinner'
import { Textarea, TextareaInput } from '@/components/ui/textarea'
import { ChevronDownIcon } from 'lucide-react-native'
import { useReportParkingLot } from '../hooks'
import { ParkingLot } from '../types'

interface Props {
  opened: boolean
  parkingLot: ParkingLot
  onCancel: () => void
  onConfirm: () => void
}

export const ReportModal = ({
  opened,
  onCancel,
  onConfirm,
  parkingLot,
}: Props) => {
  const { values, loading, handleSubmit, handleChange, resetForm } =
    useReportParkingLot(parkingLot.id)

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
          <Select
            selectedValue={values.reason}
            onValueChange={(value) => {
              handleChange({
                target: {
                  name: 'reason',
                  value,
                },
              })
            }}
            className="w-full"
          >
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
                <SelectItem label="Mal servicio" value="BAD_SERVICE" />
                <SelectItem
                  label="Información incorrecta"
                  value="INCORRECT_INFO"
                />
                <SelectItem
                  label="Cuestion de seguridad"
                  value="SAFETY_ISSUE"
                />
                <SelectItem label="Otro" value="OTHER" />
              </SelectContent>
            </SelectPortal>
          </Select>

          <Textarea size="md" className="mt-3">
            <TextareaInput
              value={values.comment}
              onChange={handleChange}
              placeholder="Comentarios"
              onChangeText={handleChange('comment')}
            />
          </Textarea>
        </ModalBody>

        <ModalFooter>
          <Button
            variant="outline"
            action="secondary"
            onPress={() => {
              onCancel()
              resetForm()
            }}
          >
            <ButtonText>Cancelar</ButtonText>
          </Button>
          <Button
            disabled={loading}
            onPress={() => {
              handleSubmit()
              onConfirm()
            }}
          >
            <ButtonText>{loading ? 'Reportando...' : 'Reportar'}</ButtonText>
            {loading && <Spinner color="#fff" />}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

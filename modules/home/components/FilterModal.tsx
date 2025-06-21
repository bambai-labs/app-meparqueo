import { Button, ButtonText } from '@/components/ui/button'
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control'
import { Heading } from '@/components/ui/heading'
import { HStack } from '@/components/ui/hstack'
import { Modal, ModalBackdrop, ModalContent } from '@/components/ui/modal'
import { Switch } from '@/components/ui/switch'
import { VStack } from '@/components/ui/vstack'
import { useAppDispatch, useAppSelector } from '@/modules/common'
import {
  setOnlyAvailable,
  setOnlyPaymentTransfer,
  setRadiusMt,
  setWithTwentyFourSeven,
  setWithValetParking,
} from '@/store'

interface Props {
  opened: boolean
  onCancel: () => void
  handleSubmit: () => void
}

export const FilterModal = ({ opened, onCancel, handleSubmit }: Props) => {
  const {
    radiusMt,
    onlyAvailable,
    paymentTransfer,
    valetParking,
    twentyFourSeven,
  } = useAppSelector((state) => state.search)

  const dispatch = useAppDispatch()

  const handleOnlyAvailableChange = (value: boolean) => {
    dispatch(setOnlyAvailable(value))
  }

  const handlePaymentTransferChange = (value: boolean) => {
    dispatch(setOnlyPaymentTransfer(value))
  }

  const handleValetParkingChange = (value: boolean) => {
    dispatch(setWithValetParking(value))
  }

  const handleTwentyFourSevenChange = (value: boolean) => {
    dispatch(setWithTwentyFourSeven(value))
  }

  const handleRadiusMtChange = (value: number) => {
    dispatch(setRadiusMt(value))
  }

  return (
    <Modal isOpen={opened} onClose={onCancel} avoidKeyboard={true}>
      <ModalBackdrop />
      <ModalContent>
        <VStack className="bg-white p-2 rounded-xl">
          <FormControl>
            <Heading>Filtros</Heading>
            <VStack className="w-full" space="md">
              <HStack className="w-full justify-between">
                <FormControlLabel>
                  <FormControlLabelText style={{ fontFamily: 'Neuwelt-Light' }}>
                    Solo parqueaderos disponibles
                  </FormControlLabelText>
                </FormControlLabel>
                <Switch
                  value={onlyAvailable}
                  onValueChange={handleOnlyAvailableChange}
                />
              </HStack>

              <HStack className="w-full justify-between">
                <FormControlLabel>
                  <FormControlLabelText style={{ fontFamily: 'Neuwelt-Light' }}>
                    Acepta pagos por transferencia
                  </FormControlLabelText>
                </FormControlLabel>
                <Switch
                  value={paymentTransfer}
                  onValueChange={handlePaymentTransferChange}
                />
              </HStack>

              <HStack className="w-full justify-between">
                <FormControlLabel>
                  <FormControlLabelText style={{ fontFamily: 'Neuwelt-Light' }}>
                    Valet parking
                  </FormControlLabelText>
                </FormControlLabel>
                <Switch
                  value={valetParking}
                  onValueChange={handleValetParkingChange}
                />
              </HStack>

              <HStack className="w-full justify-between">
                <FormControlLabel>
                  <FormControlLabelText style={{ fontFamily: 'Neuwelt-Light' }}>
                    Servicio 24/7
                  </FormControlLabelText>
                </FormControlLabel>
                <Switch
                  value={twentyFourSeven}
                  onValueChange={handleTwentyFourSevenChange}
                />
              </HStack>

              <Heading>Radio de búsqueda</Heading>

              <HStack space="md">
                <Button
                  variant={radiusMt === 100 ? 'solid' : 'outline'}
                  onPress={() => handleRadiusMtChange(100)}
                  size="sm"
                  action="primary"
                  className="flex-1"
                >
                  <ButtonText>100m</ButtonText>
                </Button>
                <Button
                  variant={radiusMt === 200 ? 'solid' : 'outline'}
                  onPress={() => handleRadiusMtChange(200)}
                  size="sm"
                  action="primary"
                  className="flex-1"
                >
                  <ButtonText>200m</ButtonText>
                </Button>
                <Button
                  variant={radiusMt === 300 ? 'solid' : 'outline'}
                  onPress={() => handleRadiusMtChange(300)}
                  size="sm"
                  action="primary"
                  className="flex-1"
                >
                  <ButtonText>300m</ButtonText>
                </Button>
              </HStack>
            </VStack>
          </FormControl>

          <HStack className="w-full justify-between mt-8" space="md">
            <Button variant="outline" action="secondary" onPress={onCancel}>
              <ButtonText style={{ fontFamily: 'Neuwelt-Light' }}>
                Cancelar
              </ButtonText>
            </Button>
            <Button onPress={handleSubmit}>
              <ButtonText style={{ fontFamily: 'Neuwelt-Light' }}>
                Filtrar
              </ButtonText>
            </Button>
          </HStack>
        </VStack>
      </ModalContent>
    </Modal>
  )
}

import { Button, ButtonText } from '@/components/ui/button'
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control'
import { HStack } from '@/components/ui/hstack'
import { Switch } from '@/components/ui/switch'
import { VStack } from '@/components/ui/vstack'
import { useEffect } from 'react'
import Modal from 'react-native-modal'
import { FilterModalValues } from '../types'

interface Props {
  values: FilterModalValues
  opened: boolean
  onCancel: () => void
  handleSwitchChange: (name: string) => (value: boolean) => void
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void
}

export const FilterModal = ({
  values,
  opened,
  onCancel,
  handleSwitchChange,
  handleSubmit,
}: Props) => {
  useEffect(() => {
    console.log('modal values', values)
  })

  return (
    <Modal
      isVisible={opened}
      onBackdropPress={onCancel}
      onBackButtonPress={onCancel}
    >
      <VStack className="bg-white p-5 rounded-xl">
        <FormControl>
          <VStack className="w-full space-y-4">
            <HStack className="w-full justify-between">
              <FormControlLabel>
                <FormControlLabelText style={{ fontFamily: 'Neuwelt-Light' }}>
                  Solo parqueaderos disponibles
                </FormControlLabelText>
              </FormControlLabel>
              <Switch
                value={values.onlyAvailable}
                onValueChange={handleSwitchChange('onlyAvailable')}
              />
            </HStack>

            <HStack className="w-full justify-between">
              <FormControlLabel>
                <FormControlLabelText style={{ fontFamily: 'Neuwelt-Light' }}>
                  Acepta pagos por transferencia
                </FormControlLabelText>
              </FormControlLabel>
              <Switch
                value={values.paymentTransfer}
                onValueChange={handleSwitchChange('paymentTransfer')}
              />
            </HStack>

            <HStack className="w-full justify-between">
              <FormControlLabel>
                <FormControlLabelText style={{ fontFamily: 'Neuwelt-Light' }}>
                  Valet parking
                </FormControlLabelText>
              </FormControlLabel>
              <Switch
                value={values.valetParking}
                onValueChange={handleSwitchChange('valetParking')}
              />
            </HStack>

            <HStack className="w-full justify-between">
              <FormControlLabel>
                <FormControlLabelText style={{ fontFamily: 'Neuwelt-Light' }}>
                  Servicio 24/7
                </FormControlLabelText>
              </FormControlLabel>
              <Switch
                value={values.twentyFourSeven}
                onValueChange={handleSwitchChange('twentyFourSeven')}
              />
            </HStack>
          </VStack>
        </FormControl>

        <HStack className="w-full justify-end mt-3" space="md">
          <Button variant="outline" action="secondary" onPress={onCancel}>
            <ButtonText style={{ fontFamily: 'Neuwelt-Light' }}>
              Cancelar
            </ButtonText>
          </Button>
          <Button onPress={() => handleSubmit()}>
            <ButtonText style={{ fontFamily: 'Neuwelt-Light' }}>
              Filtrar
            </ButtonText>
          </Button>
        </HStack>
      </VStack>
    </Modal>
  )
}

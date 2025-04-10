import { Button, ButtonText } from '@/components/ui/button'
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control'
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
import { Switch } from '@/components/ui/switch'
import { VStack } from '@/components/ui/vstack'
import { useFormik } from 'formik'
import { useEffect } from 'react'

interface Props {
  opened: boolean
  onCancel: () => void
  onConfirm: (values: FormValues) => void
}

export interface FormValues {
  availability: string
  paymentMethods: string
  priceMax: string
  priceMin: string
  services: string
  radiusKm: number
  onlyAvailable: boolean
  paymentTransfer: boolean
  valetParking: boolean
  twentyFourSeven: boolean
}

export const FilterModal = ({ opened, onCancel, onConfirm }: Props) => {
  const { values, handleSubmit, handleChange, resetForm } =
    useFormik<FormValues>({
      initialValues: {
        availability: '',
        paymentMethods: '',
        priceMax: '',
        priceMin: '',
        services: '',
        radiusKm: 5,
        onlyAvailable: false,
        paymentTransfer: false,
        valetParking: false,
        twentyFourSeven: false,
      },
      onSubmit: (values) => {
        console.log(values)
        //onConfirm(values)
      },
    })

  useEffect(() => {
    return () => {
      resetForm()
    }
  }, [])

  return (
    <Modal isOpen={opened} onClose={onCancel}>
      <ModalBackdrop />

      <ModalContent>
        <ModalHeader>
          <Heading style={{ fontFamily: 'Neuwelt-Light' }}>Filtros</Heading>
          <ModalCloseButton>
            <Icon
              as={CloseIcon}
              size="md"
              className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
            />
          </ModalCloseButton>
        </ModalHeader>

        <ModalBody>
          <FormControl>
            <VStack className="w-full">
              <HStack className="w-full justify-between">
                <FormControlLabel>
                  <FormControlLabelText style={{ fontFamily: 'Neuwelt-Light' }}>
                    Solo parqueaderos disponibles
                  </FormControlLabelText>
                </FormControlLabel>
                <Switch
                  value={values.onlyAvailable}
                  onValueChange={(value) => {
                    handleChange({
                      target: {
                        name: 'onlyAvailable',
                        value: value,
                      },
                    })
                  }}
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
                  onValueChange={(value) => {
                    handleChange({
                      target: {
                        name: 'paymentTransfer',
                        value,
                      },
                    })
                  }}
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
                  onValueChange={(value) => {
                    handleChange({
                      target: {
                        name: 'valetParking',
                        value,
                      },
                    })
                  }}
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
                  onValueChange={(value) => {
                    handleChange({
                      target: {
                        name: 'twentyFourSeven',
                        value,
                      },
                    })
                  }}
                />
              </HStack>
            </VStack>
          </FormControl>
        </ModalBody>

        <ModalFooter>
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
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

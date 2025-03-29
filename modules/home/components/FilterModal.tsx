import { Button, ButtonText } from '@/components/ui/button'
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control'
import { Heading } from '@/components/ui/heading'
import { CloseIcon, Icon } from '@/components/ui/icon'
import { Input, InputField } from '@/components/ui/input'
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
import { useFormik } from 'formik'
import { ChevronDownIcon } from 'lucide-react-native'
import { useEffect } from 'react'
import { getAvailabilities, getPaymentMethods } from '../types'
import {
  getServices,
  ParkingLotAvailability,
  PaymentMethod,
  Service,
} from '../types/Parking'
import { parsePaymentMethod, parseService } from '../utils'
import { parseAvailability } from '../utils/parseAvailability'

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
      },
      onSubmit: (values) => {
        onConfirm(values)
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
          <FormControl>
            <Heading>Ordenar por</Heading>
            <FormControlLabel>
              <FormControlLabelText>Disponibilidad</FormControlLabelText>
            </FormControlLabel>
            <Select
              className="w-full"
              selectedValue={parseAvailability(
                values.availability as ParkingLotAvailability,
              )}
              onValueChange={handleChange('availability')}
            >
              <SelectTrigger variant="outline" size="md">
                <SelectInput
                  placeholder="Seleccione Disponibilidad"
                  className="flex-1"
                />
                <SelectIcon className="mr-3" as={ChevronDownIcon} />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  {getAvailabilities().map((availability) => (
                    <SelectItem
                      key={availability}
                      label={parseAvailability(availability)}
                      value={availability}
                    />
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>

            <FormControlLabel>
              <FormControlLabelText>Método de pago</FormControlLabelText>
            </FormControlLabel>
            <Select
              className="w-full"
              onValueChange={handleChange('paymentMethods')}
              selectedValue={parsePaymentMethod(
                values.paymentMethods as PaymentMethod,
              )}
            >
              <SelectTrigger variant="outline" size="md">
                <SelectInput
                  placeholder="Seleccione método de pago"
                  className="flex-1"
                />
                <SelectIcon className="mr-3" as={ChevronDownIcon} />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  {getPaymentMethods().map((paymentMethod) => (
                    <SelectItem
                      key={paymentMethod}
                      label={parsePaymentMethod(paymentMethod)}
                      value={paymentMethod}
                    />
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>

            <FormControlLabel>
              <FormControlLabelText>Servicio</FormControlLabelText>
            </FormControlLabel>
            <Select
              className="w-full"
              selectedValue={parseService(values.services as Service)}
              onValueChange={handleChange('services')}
            >
              <SelectTrigger variant="outline" size="md">
                <SelectInput
                  placeholder="Seleccione método de pago"
                  className="flex-1"
                />
                <SelectIcon className="mr-3" as={ChevronDownIcon} />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  {getServices().map((service) => (
                    <SelectItem
                      key={service}
                      label={parseService(service)}
                      value={service}
                    />
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>

            <FormControlLabel>
              <FormControlLabelText>Proximidad</FormControlLabelText>
            </FormControlLabel>
            <Select
              className="w-full"
              onValueChange={handleChange('radiusKm')}
              selectedValue={`${values.radiusKm} km`}
            >
              <SelectTrigger variant="outline" size="md">
                <SelectInput placeholder="Proximidad" className="flex-1" />
                <SelectIcon className="mr-3" as={ChevronDownIcon} />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  <SelectItem label="5 km" value="5" />

                  <SelectItem label="10 km" value="10" />

                  <SelectItem label="15 km" value="15" />
                </SelectContent>
              </SelectPortal>
            </Select>

            <FormControlLabel>
              <FormControlLabelText>Precio máximo</FormControlLabelText>
            </FormControlLabel>
            <Input variant="outline" size="md">
              <InputField
                placeholder="Ingresar precio maximo"
                keyboardType="numeric"
                value={values.priceMax}
                onChangeText={handleChange('priceMax')}
              />
            </Input>

            <FormControlLabel>
              <FormControlLabelText>Precio mínimo</FormControlLabelText>
            </FormControlLabel>
            <Input variant="outline" size="md">
              <InputField
                placeholder="Ingresar precio mínimo"
                keyboardType="numeric"
                value={values.priceMin}
                onChangeText={handleChange('priceMin')}
              />
            </Input>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" action="secondary" onPress={onCancel}>
            <ButtonText>Cancelar</ButtonText>
          </Button>
          <Button onPress={() => handleSubmit()}>
            <ButtonText>Filtrar</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

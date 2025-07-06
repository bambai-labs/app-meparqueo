import { Button, ButtonText } from '@/components/ui/button'
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control'
import { Heading } from '@/components/ui/heading'
import { HStack } from '@/components/ui/hstack'
import { Icon } from '@/components/ui/icon'
import { Switch } from '@/components/ui/switch'
import { VStack } from '@/components/ui/vstack'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { ChevronDown } from 'lucide-react-native'
import React, { forwardRef } from 'react'
import { useFilterSheet } from '../hooks'

interface Props {
  onCancel: () => void
  handleSubmit: () => void
}

export const FilterSheet = forwardRef<BottomSheet, Props>(
  ({ onCancel, handleSubmit }, ref) => {
    const {
      radiusMt,
      onlyAvailable,
      paymentTransfer,
      valetParking,
      twentyFourSeven,
      handleOnlyAvailableChange,
      handlePaymentTransferChange,
      handleValetParkingChange,
      handleTwentyFourSevenChange,
      handleRadiusMtChange,
    } = useFilterSheet()

    return (
      <BottomSheet
        ref={ref}
        enablePanDownToClose={true}
        snapPoints={['25%']}
        index={-1}
        style={{
          backgroundColor: '#f3f4f6',
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }}
        handleComponent={() => (
          <HStack
            className="items-center justify-center w-full bg-[#f3f4f6]"
            style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
          >
            <Icon as={ChevronDown} className="w-9 h-9" />
          </HStack>
        )}
      >
        <BottomSheetView>
          <FormControl className="p-5 gap-3 w-full bg-[#f3f4f6]">
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

            <Button onPress={handleSubmit}>
              <ButtonText style={{ fontFamily: 'Neuwelt-Light' }}>
                Aplicar filtros
              </ButtonText>
            </Button>
          </FormControl>
        </BottomSheetView>
      </BottomSheet>
    )
  },
)

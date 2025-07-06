import { Button, ButtonText } from '@/components/ui/button'
import { FormControl } from '@/components/ui/form-control'
import { Heading } from '@/components/ui/heading'
import { HStack } from '@/components/ui/hstack'
import { Icon } from '@/components/ui/icon'
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
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet'
import { ChevronDown, ChevronDownIcon } from 'lucide-react-native'
import React, { forwardRef } from 'react'
import { useReportParkingLot } from '../hooks'
import { ParkingLot } from '../types'

interface Props {
  parkingLot: ParkingLot
  onConfirm: () => void
}

export const ReportSheet = forwardRef<BottomSheet, Props>(
  ({ onConfirm, parkingLot }, ref) => {
    const { values, loading, handleSubmit, handleChange } = useReportParkingLot(
      parkingLot.id,
    )

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
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
        handleComponent={() => (
          <HStack
            className="items-center justify-center w-full bg-[#f3f4f6]"
            style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
          >
            <Icon as={ChevronDown} className="w-9 h-9" />
          </HStack>
        )}
      >
        <BottomSheetScrollView>
          <FormControl className="p-5 gap-3 bg-[#f3f4f6]">
            <Heading style={{ fontFamily: 'Neuwelt-Bold' }}>
              Reportar parqueadero
            </Heading>

            <Select
              selectedValue={values.reason}
              onValueChange={handleChange('reason')}
              className="w-full bg-white"
            >
              <SelectTrigger variant="outline" size="md">
                <SelectInput
                  style={{ fontFamily: 'Neuwelt-Bold' }}
                  placeholder="Razón del reporte"
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

            <BottomSheetTextInput
              className="w-full mt-4"
              value={values.comment}
              onChangeText={handleChange('comment')}
              placeholder="Comentarios"
              multiline
              style={{
                minHeight: 80,
                padding: 12,
                textAlignVertical: 'top',
                backgroundColor: 'white',
                borderRadius: 6,
              }}
            />

            <Button
              disabled={loading}
              onPress={() => {
                handleSubmit()
                onConfirm()
              }}
            >
              <ButtonText style={{ fontFamily: 'Neuwelt-Bold' }}>
                {loading ? 'Reportando...' : 'Reportar'}
              </ButtonText>
              {loading && <Spinner color="#fff" />}
            </Button>
          </FormControl>
        </BottomSheetScrollView>
      </BottomSheet>
    )
  },
)

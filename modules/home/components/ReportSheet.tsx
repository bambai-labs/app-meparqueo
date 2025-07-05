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
import { Textarea, TextareaInput } from '@/components/ui/textarea'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
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
          backgroundColor: '#FFFAFA',
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }}
        handleComponent={() => (
          <HStack
            className="items-center justify-center w-full bg-[#FFFAFA]"
            style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
          >
            <Icon as={ChevronDown} className="w-9 h-9" />
          </HStack>
        )}
      >
        <BottomSheetView>
          <FormControl className="p-5 gap-3 bg-[#FFFAFA]">
            <Heading style={{ fontFamily: 'Neuwelt-Bold' }}>
              Reportar parqueadero
            </Heading>

            <Select
              selectedValue={values.reason}
              onValueChange={handleChange('reason')}
              className="w-full"
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

            <Textarea size="md" className="mt-3">
              <TextareaInput
                style={{ fontFamily: 'Neuwelt-Bold' }}
                value={values.comment}
                placeholder="Comentarios"
                onChangeText={handleChange('comment')}
              />
            </Textarea>

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
        </BottomSheetView>
      </BottomSheet>
    )
  },
)

import { Button, ButtonText } from '@/components/ui/button'
import { FormControl } from '@/components/ui/form-control'
import { Heading } from '@/components/ui/heading'
import { HStack } from '@/components/ui/hstack'
import { Icon } from '@/components/ui/icon'
import { Textarea, TextareaInput } from '@/components/ui/textarea'
import { VStack } from '@/components/ui/vstack'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { ChevronDown } from 'lucide-react-native'
import { Text } from 'react-native'
import StarRating from 'react-native-star-rating-widget'
import { useRatingModal } from '../hooks'

export const RatingSheet = () => {
  const {
    values,
    errors,
    touched,
    bottomSheetModalRef,
    handleChange,
    handleSubmit,
  } = useRatingModal()

  const handleStarRateChange = (rate: number) => {
    handleChange({ target: { name: 'rate', value: rate } })
  }

  return (
    <BottomSheet
      enablePanDownToClose={true}
      ref={bottomSheetModalRef}
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
        <FormControl className="w-full p-4 bg-[#f3f4f6]">
          <VStack className="w-full items-center">
            <Heading>¿Que te parece MeParqueo?</Heading>

            <StarRating
              style={{
                marginTop: 10,
              }}
              maxStars={5}
              rating={values.rate}
              onChange={handleStarRateChange}
            />

            {errors.rate && touched.rate && (
              <Text className="text-red-500 font-bold my-2">{errors.rate}</Text>
            )}

            <Textarea size="md" className="w-full mt-3 rounded-md bg-white">
              <TextareaInput
                value={values.comment}
                onChangeText={handleChange('comment')}
                placeholder="Dejanos tus sugerencias aquí :)"
              />
            </Textarea>

            {errors.comment && touched.comment && (
              <Text className="text-red-500 font-bold mt-2">
                {errors.comment}*
              </Text>
            )}
            <Button className="w-full mt-5" onPress={() => handleSubmit()}>
              <ButtonText>Enviar</ButtonText>
            </Button>
          </VStack>
        </FormControl>
      </BottomSheetView>
    </BottomSheet>
  )
}

import { Button, ButtonText } from '@/components/ui/button'
import { FormControl } from '@/components/ui/form-control'
import { Heading } from '@/components/ui/heading'
import { HStack } from '@/components/ui/hstack'
import { Modal, ModalBackdrop, ModalContent } from '@/components/ui/modal'
import { Textarea, TextareaInput } from '@/components/ui/textarea'
import { VStack } from '@/components/ui/vstack'
import { Text } from 'react-native'
import StarRating from 'react-native-star-rating-widget'
import { useRatingModal } from '../hooks'

interface Props {
  opened: boolean
  onHide: () => void
}

export const RatingModal = ({ opened, onHide }: Props) => {
  const { values, errors, touched, handleChange, handleSubmit } =
    useRatingModal()

  const handleStarRateChange = (rate: number) => {
    handleChange({ target: { name: 'rate', value: rate } })
  }

  return (
    <Modal avoidKeyboard={true} isOpen={opened} onClose={onHide}>
      <ModalBackdrop />
      <ModalContent>
        <VStack className="bg-white p-2 rounded-xl">
          <FormControl>
            <VStack>
              <Heading>¿Que te parece MeParqueo?</Heading>

              <StarRating
                style={{
                  marginTop: 10,
                  width: '100%',
                }}
                maxStars={5}
                rating={values.rate}
                onChange={handleStarRateChange}
              />

              {errors.rate && touched.rate && (
                <Text className="text-red-500 font-bold my-2">
                  {errors.rate}
                </Text>
              )}

              <Textarea size="md" className="w-full mt-3">
                <TextareaInput
                  value={values.comment}
                  onChangeText={handleChange('comment')}
                  placeholder="Dejanos tus sugerencias aquí :)"
                />
              </Textarea>

              {errors.comment && touched.comment && (
                <Text className="text-red-500 font-bold ,y2">
                  {errors.comment}*
                </Text>
              )}

              <HStack className="w-full justify-end mt-5">
                <HStack space="md">
                  <Button variant="outline" onPress={onHide}>
                    <ButtonText>Cancelar</ButtonText>
                  </Button>
                  <Button onPress={() => handleSubmit()}>
                    <ButtonText>Enviar</ButtonText>
                  </Button>
                </HStack>
              </HStack>
            </VStack>
          </FormControl>
        </VStack>
      </ModalContent>
    </Modal>
  )
}

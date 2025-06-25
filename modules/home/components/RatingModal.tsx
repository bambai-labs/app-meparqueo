import { Button, ButtonText } from '@/components/ui/button'
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control'
import { Heading } from '@/components/ui/heading'
import { HStack } from '@/components/ui/hstack'
import { Input, InputField } from '@/components/ui/input'
import { Modal, ModalBackdrop, ModalContent } from '@/components/ui/modal'
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
    <Modal isOpen={opened} onClose={onHide}>
      <ModalBackdrop />
      <ModalContent>
        <VStack className="bg-white p-2 rounded-xl">
          <FormControl>
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

            <FormControlLabel>
              <FormControlLabelText className="text-lg">
                Cuentanos sobre que opinas de MeParqueo
              </FormControlLabelText>
            </FormControlLabel>
            <Input variant="outline" size="md">
              <InputField
                value={values.comment}
                onChangeText={handleChange('comment')}
                placeholder="Dejanos tus sugerencias aquí :)"
              />
            </Input>

            {errors.comment && touched.comment && (
              <Text className="text-red-500 font-bold ,y2">
                {errors.comment}*
              </Text>
            )}

            <HStack className="w-full justify-end mt-3">
              <HStack space="md">
                <Button variant="outline" onPress={onHide}>
                  <ButtonText>Cancelar</ButtonText>
                </Button>
                <Button onPress={() => handleSubmit()}>
                  <ButtonText>Enviar</ButtonText>
                </Button>
              </HStack>
            </HStack>
          </FormControl>
        </VStack>
      </ModalContent>
    </Modal>
  )
}

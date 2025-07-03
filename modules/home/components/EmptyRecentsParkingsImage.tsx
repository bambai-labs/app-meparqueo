import { Image } from '@/components/ui/image'
import { VStack } from '@/components/ui/vstack'
import { Text, View } from 'react-native'

export const EmptyRecentsParkingsImage = () => {
  return (
    <VStack className="h-[80%] flex-col justify-center items-center">
      <Image
        source={require('@/assets/images/parking.png')}
        resizeMode="contain"
        className="w-[250px] h-[200px]"
        alt="Sin parqueaderos recientes"
      />
      <View>
        <Text className="font-bold text-2xl text-center">
          Comienza tu experiencia con Me Parqueo. Busca tu destino 👆
        </Text>
      </View>
    </VStack>
  )
}

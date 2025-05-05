import { Sponsors } from '@/api/responses/SponsosrsResponse'
import { FlatList, Image, Text, View } from 'react-native'

interface Props {
  sponsors: Sponsors[]
}

export const SponsorsCard = ({ sponsors }: Props) => {
  return (
    <View className="mt-xl">
      <Text
        className="text-2xl text-center text-gray-500"
        style={{
          fontFamily: 'Neuwelt-Bold',
        }}
      >
        Nuestros patrocinadores
      </Text>
      <FlatList
        className="pt-8"
        data={sponsors}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View className="w-1/2 mb-2 h-32 items-center justify-center">
            <Image
              style={{
                width: '90%',
                height: 100,
                opacity: 1,
                borderRadius: 7,
                alignSelf: 'center',
                marginBottom: 11,
                padding: 10,
              }}
              source={{ uri: item.image }}
            />
          </View>
        )}
      />
    </View>
  )
}

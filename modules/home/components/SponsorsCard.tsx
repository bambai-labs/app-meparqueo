import { Sponsors } from '@/api/responses/SponsosrsResponse'
import { FlatList, Image, SafeAreaView, Text, View } from 'react-native'

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
      <SafeAreaView>
        <FlatList
          className="pt-8"
          data={sponsors}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View className="w-1/3 p-2 items-center justify-center">
              <Image
                style={{
                  width: '100%',
                  height: 100,
                  opacity: 1,
                  borderRadius: 7,
                  alignSelf: 'center',
                }}
                source={{ uri: item.image }}
              />
            </View>
          )}
        />
      </SafeAreaView>
    </View>
  )
}

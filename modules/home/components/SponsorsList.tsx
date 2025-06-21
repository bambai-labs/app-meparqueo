import { Sponsors } from '@/api/responses/SponsosrsResponse'
import { FlatList, SafeAreaView, Text, View } from 'react-native'
import { SponsorCard } from './SponsorCard'

interface Props {
  sponsors: Sponsors[]
}

export const SponsorsList = ({ sponsors }: Props) => {
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
          renderItem={({ item }) => <SponsorCard sponsor={item} />}
        />
      </SafeAreaView>
    </View>
  )
}

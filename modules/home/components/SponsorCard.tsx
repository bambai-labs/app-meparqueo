import { Sponsors } from '@/api'
import { Image, View } from 'react-native'

interface Props {
  sponsor: Sponsors
}

export const SponsorCard = ({ sponsor }: Props) => {
  return (
    <View className="w-1/3 p-2 items-center justify-center">
      <Image
        style={{
          width: '100%',
          height: 100,
          opacity: 1,
          borderRadius: 7,
          alignSelf: 'center',
        }}
        source={{ uri: sponsor.image }}
        alt="Logo del patrocinador"
      />
    </View>
  )
}

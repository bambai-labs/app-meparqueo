import { Box } from '@/components/ui/box'
import { Image } from '@/components/ui/image'
import { TouchableOpacity } from 'react-native'
import { useHomeBanner } from '../hooks'

export const HomeBanner = () => {
  const { bannerData, handleBannerPress } = useHomeBanner()

  if (!bannerData || !bannerData.visibility) return null

  return (
    <Box className="w-full">
      <TouchableOpacity onPress={handleBannerPress}>
        <Image
          source={{ uri: bannerData.image }}
          className="w-full h-[110px] rounded-2xl"
          alt="Banner de encuesta"
        />
      </TouchableOpacity>
    </Box>
  )
}

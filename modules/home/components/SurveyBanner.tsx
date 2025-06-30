import { Box } from '@/components/ui/box'
import { Image } from '@/components/ui/image'
import { TouchableOpacity } from 'react-native'
import { useSurveyBanner } from '../hooks'

export const SurveyBanner = () => {
  const { bannerData, handleBannerPress } = useSurveyBanner()

  return (
    <Box className="w-full">
      {bannerData && bannerData.visibility && (
        <TouchableOpacity onPress={handleBannerPress}>
          <Image
            source={{
              uri: bannerData.image,
            }}
            className="w-full h-[110px] rounded-2xl"
          />
        </TouchableOpacity>
      )}
    </Box>
  )
}

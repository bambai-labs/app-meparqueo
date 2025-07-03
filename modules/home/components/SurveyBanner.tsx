import { Box } from '@/components/ui/box'
import { Image } from '@/components/ui/image'
import { TouchableOpacity } from 'react-native'
import { useSurveyBanner } from '../hooks'

export const SurveyBanner = () => {
  const { bannerData, handleBannerPress } = useSurveyBanner()

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

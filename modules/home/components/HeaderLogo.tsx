import { HStack } from '@/components/ui/hstack'
import { Icon } from '@/components/ui/icon'
import { Image } from '@/components/ui/image'
import { useAppSelector } from '@/modules/common'
import { usePathname, useRouter } from 'expo-router'
import { ArrowLeft } from 'lucide-react-native'
import { useMemo } from 'react'
import { Pressable, Text, View } from 'react-native'

export const HeaderLogo = () => {
  const router = useRouter()
  const pathName = usePathname()
  const { isExpanded } = useAppSelector((state) => state.bottomsheet)
  const shouldShowBackArrow = useMemo(
    () => pathName.startsWith('/home/') && pathName !== '/home' && !isExpanded,
    [pathName, isExpanded],
  )

  const goBack = () => {
    router.back()
  }

  return (
    <HStack className="w-full items-center justify-between px-3 bg-white">
      <View className="w-[20px]">
        {shouldShowBackArrow && (
          <Pressable onPress={goBack} className="mb-3">
            <Icon className="p-4" as={ArrowLeft} size="xl" />
          </Pressable>
        )}
      </View>
      <HStack className="items-center justify-center mb-2" space="sm">
        <Image
          source={require('@/assets/images/hero.png')}
          alt="Hero icon"
          className="w-[50px] h-[50px] rounded-full"
        />
        <Text style={{ fontFamily: 'Neuwelt-Bold' }} className="text-2xl">
          MeParqueo
        </Text>
      </HStack>
      <View className="w-[20px]" />
    </HStack>
  )
}

import { ButtonText } from '@/components/ui/button'
import { HStack } from '@/components/ui/hstack'
import { Image } from '@/components/ui/image'
import { VStack } from '@/components/ui/vstack'
import { Chip, ScreenWrapper } from '@/modules/common'
import Constants from 'expo-constants'
import { Stack, useRouter } from 'expo-router'
import { Text } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import {
  ParkingDetailsSheet,
  RecentParkingsList,
  ReportModal,
  SearchBar,
} from '../components'
import { useHome } from '../hooks'

export const HomeScreen = () => {
  const {
    bottomSheetRef,
    callParkingLot,
    currentParking,
    handleParkingCardPress,
    handleSearchBarPress,
    hideReportModal,
    isReportModalOpen,
    openMapDirection,
    showReportModal,
  } = useHome()

  const router = useRouter()

  return (
    <GestureHandlerRootView>
      <ScreenWrapper>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />

        <VStack
          style={{
            paddingTop: Constants.statusBarHeight,
          }}
        >
          <HStack className="items-center mb-2" space="sm">
            <Image
              source={require('@/assets/images/hero.png')}
              alt="Hero icon"
              className="w-[50px] h-[50px] rounded-full"
            />
            <Text style={{ fontFamily: 'Neuwelt-Bold' }} className="text-2xl">
              MeParqueo
            </Text>
          </HStack>

          <SearchBar
            query=""
            onQueryChange={() => {}}
            readonly={true}
            onPress={handleSearchBarPress}
            pointerEvents="none"
            placeholder="A donde quieres ir?"
            onSearch={() => {}}
          />

          <HStack space="md" className="w-full items-start mt-4">
            <Chip
              selected={false}
              onPress={() => router.push('/home/allparkinglots')}
            >
              <ButtonText style={{ fontFamily: 'Neuwelt-Light' }}>
                Ver todos los parqueaderos
              </ButtonText>
            </Chip>
          </HStack>

          <RecentParkingsList onCardPress={handleParkingCardPress} />
        </VStack>

        {currentParking && (
          <ParkingDetailsSheet
            ref={bottomSheetRef}
            parkingLot={currentParking}
            onCallParkingLot={callParkingLot}
            onOpenMapDirection={openMapDirection}
            onShowReportModal={showReportModal}
          />
        )}

        <ReportModal
          opened={isReportModalOpen}
          onCancel={hideReportModal}
          onConfirm={hideReportModal}
        />
      </ScreenWrapper>
    </GestureHandlerRootView>
  )
}

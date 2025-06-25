import { useAppDispatch } from '@/modules/common'
import { openReviewModal } from '@/store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications'

const TWO_HOURS_IN_SECONDS = 2 * 60 * 60

export const useParkingDetailsSheet = () => {
  const dispatch = useAppDispatch()
  const handleShowReviewModal = async () => {
    let openMapDirectionTapCount =
      Number(await AsyncStorage.getItem('openMapDirectionTapCount')) ?? 0

    openMapDirectionTapCount++

    await AsyncStorage.setItem(
      'openMapDirectionTapCount',
      String(openMapDirectionTapCount),
    )

    if (openMapDirectionTapCount === 2) {
      scheduleReviewNotification()
      dispatch(openReviewModal())
    }
  }

  const scheduleReviewNotification = async () => {
    const notificationID = await Notifications.scheduleNotificationAsync({
      content: {
        title: '¿Te gusta MeParqueo?',
        body: 'Ayúdanos a mejorar nuestra app con tu opinión.',
        autoDismiss: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },
      trigger: {
        seconds: TWO_HOURS_IN_SECONDS,
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      },
    })

    await AsyncStorage.setItem('reviewNotificationID', notificationID)
  }

  return {
    handleShowReviewModal,
  }
}

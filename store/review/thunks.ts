import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications'
import { AppDispatch } from '../store'
import { openReviewModal } from './reviewSlice'

export const checkRateModalSubmited = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const isSubmitted = Boolean(
        await AsyncStorage.getItem('reviewModalSubmitted'),
      )

      const openMapDirectionTapCount =
        Number(await AsyncStorage.getItem('openMapDirectionTapCount')) ?? 0

      if (!isSubmitted && openMapDirectionTapCount === 2) {
        console.log('opening review modal')
        dispatch(openReviewModal())
        return
      }

      console.log('not opening review modal')
    } catch (err) {
      console.log(err)
    }
  }
}

export const cancelRateNotificationReminder = () => {
  return async () => {
    try {
      const reviewNotificationId = await AsyncStorage.getItem(
        'reviewNotificationID',
      )

      if (!reviewNotificationId) {
        return
      }

      await Notifications.cancelScheduledNotificationAsync(reviewNotificationId)
      console.log('Rate notification reminder canceled')
    } catch (err) {
      console.log(err)
    }
  }
}

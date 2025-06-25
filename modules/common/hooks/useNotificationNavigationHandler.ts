import { openReviewModal } from '@/store/review/reviewSlice'
import * as Notifications from 'expo-notifications'
import { useEffect } from 'react'
import { useAppDispatch } from './useAppDispatch'

export function useNotificationNavigationHandler() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const showReviewModal =
          response.notification.request.content.data?.showReviewModal

        if (showReviewModal) {
          dispatch(openReviewModal())
        }
      },
    )

    return () => subscription.remove()
  }, [])
}

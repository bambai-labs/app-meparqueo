import {
  useAppDispatch,
  useAppSelector,
  useGradualAnimation,
  useNotificationNavigationHandler,
} from '@/modules'
import { RatingModal } from '@/modules/home/components'
import { checkRateModalSubmited, closeReviewModal } from '@/store'
import { Stack } from 'expo-router'
import React, { useEffect } from 'react'
import { KeyboardToolbar } from 'react-native-keyboard-controller'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'

export default function HomeLayout() {
  const { reviewModalVisible } = useAppSelector((state) => state.review)
  const dispatch = useAppDispatch()
  const { height } = useGradualAnimation()

  const keyboardPadding = useAnimatedStyle(() => {
    return {
      height: height.value,
    }
  }, [])

  useNotificationNavigationHandler()

  const handleCloseReviewModal = () => {
    dispatch(closeReviewModal())
  }

  useEffect(() => {
    dispatch(checkRateModalSubmited())
  }, [])

  return (
    <>
      <Stack />
      <Animated.View style={keyboardPadding} />
      <KeyboardToolbar
        showArrows={false}
        insets={{ left: 16, right: 0 }}
        doneText="Cerrar teclado"
      />

      {reviewModalVisible && (
        <RatingModal
          opened={reviewModalVisible}
          onHide={handleCloseReviewModal}
        />
      )}
    </>
  )
}

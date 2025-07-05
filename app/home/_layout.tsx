import { useAppDispatch, useNotificationNavigationHandler } from '@/modules'
import { RatingSheet } from '@/modules/home/components'
import { checkRateModalSubmited } from '@/store'
import { Stack } from 'expo-router'
import React, { useEffect } from 'react'

export default function HomeLayout() {
  const dispatch = useAppDispatch()

  useNotificationNavigationHandler()

  useEffect(() => {
    dispatch(checkRateModalSubmited())
  }, [])

  return (
    <>
      <Stack />

      {/* {reviewModalVisible && (
        <RatingModal
          opened={reviewModalVisible}
          onHide={handleCloseReviewModal}
        />
      )} */}
      <RatingSheet />
    </>
  )
}

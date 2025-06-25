import { useAppDispatch, useAppSelector } from '@/modules'
import { RatingModal } from '@/modules/home/components'
import { checkRateModalSubmited, closeReviewModal } from '@/store'
import { Stack } from 'expo-router'
import React, { useEffect } from 'react'

export default function HomeLayout() {
  const { reviewModalVisible } = useAppSelector((state) => state.review)
  const dispatch = useAppDispatch()

  const handleCloseReviewModal = () => {
    dispatch(closeReviewModal())
  }

  useEffect(() => {
    dispatch(checkRateModalSubmited())
  }, [])

  return (
    <>
      <Stack />
      {reviewModalVisible && (
        <RatingModal
          opened={reviewModalVisible}
          onHide={handleCloseReviewModal}
        />
      )}
    </>
  )
}

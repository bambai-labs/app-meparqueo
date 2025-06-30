import { Image } from '@/components/ui/image'
import { VStack } from '@/components/ui/vstack'
import React from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import { useParkingPagination } from '../hooks/'
import { ParkingLot } from '../types'
import { RecentParkingCard } from './RecentParkingCard'

interface Props {
  className?: string
  onCardPress: (parkingLot: ParkingLot) => void
}

export const RecentParkingsList = ({ className = '', onCardPress }: Props) => {
  const { recentParkings, loading, hasMore, fetchParkings, refreshParkings } =
    useParkingPagination()

  const handleEndReached = () => {
    if (!loading && hasMore) {
      fetchParkings()
    }
  }

  const renderFooter = () => {
    if (loading) {
      return (
        <View className="py-5 items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      )
    }

    if (recentParkings.length > 0 && !hasMore) {
      return (
        <View className="py-5 items-center justify-center">
          <Text
            className="text-gray-500 text-base"
            style={{
              fontFamily: 'Neuwelt-Light',
            }}
          >
            No hay más parqueaderos
          </Text>
        </View>
      )
    }

    return null
  }

  const renderEmptyList = () => {
    if (loading && recentParkings.length === 0) {
      return (
        <View className="flex-1 items-center justify-center mt-12">
          <ActivityIndicator size="large" />
        </View>
      )
    }

    return (
      <VStack className="flex-1 items-center justify-center mt-12">
        <Image
          size="2xl"
          source={require('@/assets/images/empty_parking.png')}
          alt="No hay parqueaderos recientes"
        />
        <Text className="text-center text-gray-500 text-base">
          No hay parqueaderos recientes
        </Text>
      </VStack>
    )
  }

  return (
    <FlatList
      className={className}
      data={recentParkings}
      renderItem={({ item }) => (
        <RecentParkingCard
          recentParking={item}
          onPress={() => onCardPress(item.parkingLot)}
        />
      )}
      keyExtractor={(item) => item.parkingLot.id}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.1}
      refreshing={loading && recentParkings.length > 0}
      onRefresh={refreshParkings}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmptyList}
      ItemSeparatorComponent={() => {
        return <View className="h-4" />
      }}
    />
  )
}

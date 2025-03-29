import React from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import { useParkingPagination } from '../hooks/'
import { ParkingLot } from '../types'
import { RecentParkingCard } from './RecentParkingCard'

interface Props {
  onCardPress: (parkingLot: ParkingLot) => void
}

export const RecentParkingsList = ({ onCardPress }: Props) => {
  const { recentParkings, loading, hasMore, fetchParkings, refreshParkings } =
    useParkingPagination()

  const renderFooter = () => {
    if (loading) {
      return (
        <View className="py-5 items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      )
    }

    if (!hasMore) {
      return (
        <View className="py-5 items-center justify-center">
          <Text className="text-gray-500 text-base">
            No hay más parqueaderos
          </Text>
        </View>
      )
    }

    return null
  }

  // Renderizar mensaje si no hay parkings
  const renderEmptyList = () => (
    <View className="flex-1 items-center justify-center mt-12">
      <Text className="text-lg text-gray-500">
        No se encontraron parqueaderos
      </Text>
    </View>
  )

  return (
    <FlatList
      className="mt-5"
      data={recentParkings}
      renderItem={({ item }) => (
        <RecentParkingCard
          recentParking={item}
          onPress={() => onCardPress(item.parkingLot)}
        />
      )}
      keyExtractor={(item) => item.parkingLot.id}
      onEndReached={fetchParkings}
      onEndReachedThreshold={0.1}
      refreshing={loading}
      onRefresh={refreshParkings}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmptyList}
      ItemSeparatorComponent={() => {
        return <View className="h-4" />
      }}
    />
  )
}

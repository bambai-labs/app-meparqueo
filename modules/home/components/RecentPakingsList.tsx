import React from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import { useParkingPagination, useSponsors } from '../hooks/'
import { ParkingLot } from '../types'
import { RecentParkingCard } from './RecentParkingCard'
import { SponsorsList } from './SponsorsList'

interface Props {
  className?: string
  onCardPress: (parkingLot: ParkingLot) => void
}

export const RecentParkingsList = ({ className = '', onCardPress }: Props) => {
  const { recentParkings, loading, hasMore, fetchParkings, refreshParkings } =
    useParkingPagination()

  const { sponsors } = useSponsors()

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
      <>
        <Text className="text-center text-gray-500 text-base">
          Encuentra parqueadero en el centro de Montería
        </Text>
        <View className="flex-1 items-center justify-center mt-4">
          <SponsorsList sponsors={sponsors} />
        </View>
      </>
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

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
      <VStack className="flex-1 items-center justify-center px-6 py-8 bg-white rounded-2xl shadow-md mt-12">
        <Image
          className="w-full max-w-[320px] mb-6"
          style={{ aspectRatio: 16 / 9 }}
          resizeMode="contain"
          source={require('@/assets/images/empty_parking.png')}
          alt="No hay parqueaderos recientes"
        />
        <Text
          className="text-center text-xl font-bold text-gray-700 mb-2"
          style={{ fontFamily: 'Neuwelt-Bold' }}
        >
          ¡Aún no tienes parqueos recientes!
        </Text>
        <Text
          className="text-center text-base text-gray-500 mb-6"
          style={{ fontFamily: 'Neuwelt-Light' }}
        >
          Comienza tu experiencia con Me Parqueo buscando tu destino favorito.
          ¡Es fácil y rápido!
        </Text>
        {/* Aquí puedes agregar un botón de acción si lo deseas */}
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

import { Place } from '@/api'
import { Button } from '@/components/ui/button'
import { HStack } from '@/components/ui/hstack'
import { ArrowRightIcon, Icon } from '@/components/ui/icon'
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input'
import { usePathname } from 'expo-router'
import { ArrowLeft, X } from 'lucide-react-native'
import React, { useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { PlacesResultList } from './PlacesResultList'

interface Props {
  query: string
  disabled?: boolean
  invalid?: boolean
  readonly?: boolean
  className?: string
  placeholder?: string
  loading?: boolean
  onQueryChange: (query: string) => void
  onSearch: (query: string) => void
  places: Place[]
  onPlacePress: (place: Place) => void
  onClear?: () => void
}

export const SearchBar = ({
  query,
  disabled = false,
  invalid = false,
  readonly = false,
  className = '',
  placeholder = '',
  loading = false,
  places,
  onQueryChange,
  onSearch,
  onPlacePress,
  onClear = () => {},
}: Props) => {
  const [isFocused, setIsFocused] = useState(false)

  const pathName = usePathname()

  return (
    <View className="relative">
      <HStack className={`${className}`}>
        <Input
          style={{
            borderEndStartRadius: 0,
            borderEndEndRadius: 0,
            borderStartStartRadius: 8,
            borderStartEndRadius: 8,
          }}
          className="flex-1"
          variant="outline"
          size="xl"
          isDisabled={disabled}
          isInvalid={invalid}
          isReadOnly={readonly}
          isFocused={isFocused}
        >
          {places.length > 0 && isFocused && (
            <InputSlot
              className="pl-1"
              onPress={() => {
                setIsFocused(false)
              }}
            >
              <InputIcon as={ArrowLeft} size="md" />
            </InputSlot>
          )}

          <InputField
            style={{
              fontFamily: 'Neuwelt-Light',
            }}
            type="text"
            inputMode="search"
            value={query}
            onChangeText={(text) => {
              onQueryChange(text)
              setIsFocused(text.length > 0)
            }}
            placeholder={placeholder}
            onSubmitEditing={() => {
              onSearch(query)

              const isInHomeScreen = !(
                pathName.startsWith('/home/') && pathName !== '/home'
              )

              console.log('isInHomeScreen', isInHomeScreen)

              if (!isInHomeScreen) {
                setIsFocused(false)
                return
              }

              setIsFocused(query.length > 0)
            }}
            onFocus={() => setIsFocused(query.length > 0)}
            onPress={() => {
              setIsFocused(true)
            }}
          />

          <InputSlot
            className="pr-2"
            onPress={() => {
              onClear()
              setIsFocused(false)
            }}
          >
            <InputIcon as={X} size="md" />
          </InputSlot>
        </Input>
        <Button
          onPress={() => {
            onSearch(query)
            setIsFocused(false)
          }}
          size="xl"
          style={{
            borderStartStartRadius: 0,
            borderStartEndRadius: 0,
            borderEndStartRadius: 8,
            borderEndEndRadius: 8,
          }}
        >
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Icon as={ArrowRightIcon} size="md" color="white" />
          )}
        </Button>
      </HStack>

      <View className="absolute z-10 w-full top-full bg-white shadow-md rounded-b-lg">
        {isFocused && (
          <PlacesResultList
            places={places}
            handlePlacePress={(place) => {
              setIsFocused(false)
              onPlacePress(place)
            }}
          />
        )}
      </View>
    </View>
  )
}

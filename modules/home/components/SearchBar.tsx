import { Button } from '@/components/ui/button'
import { HStack } from '@/components/ui/hstack'
import { ArrowRightIcon, Icon } from '@/components/ui/icon'
import { Input, InputField } from '@/components/ui/input'
import React, { ReactNode, useState } from 'react'
import { ActivityIndicator, Pressable, View } from 'react-native'

interface Props {
  query: string
  disabled?: boolean
  invalid?: boolean
  readonly?: boolean
  className?: string
  pointerEvents?: 'auto' | 'box-none' | 'none' | 'box-only' | undefined
  placeholder?: string
  loading?: boolean
  onPress?: () => void
  onQueryChange: (query: string) => void
  onSearch: (query: string) => void
  children?: ReactNode
}

export const SearchBar = ({
  query,
  disabled = false,
  invalid = false,
  readonly = false,
  className = '',
  pointerEvents,
  placeholder = '',
  loading = false,
  children,
  onPress = () => {},
  onQueryChange,
  onSearch,
}: Props) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <View className="relative">
      <Pressable onPress={onPress}>
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
            pointerEvents={pointerEvents}
            isFocused={isFocused}
          >
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
                setIsFocused(false)
              }}
              onFocus={() => setIsFocused(query.length > 0)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              onPress={() => {
                setIsFocused(true)
              }}
            />
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
      </Pressable>

      <View className="absolute z-10 w-full top-full bg-white shadow-md rounded-b-lg">
        {isFocused && children}
      </View>
    </View>
  )
}

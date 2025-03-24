import { Button } from '@/components/ui/button'
import { HStack } from '@/components/ui/hstack'
import { ArrowRightIcon, Icon } from '@/components/ui/icon'
import { Input, InputField } from '@/components/ui/input'
import { Pressable } from 'react-native'

interface SearchResult {
  value: string
  label: string
}
interface Props {
  query: string
  disabled?: boolean
  invalid?: boolean
  readonly?: boolean
  className?: string
  pointerEvents?: 'auto' | 'box-none' | 'none' | 'box-only' | undefined
  placeholder?: string
  onPress?: () => void
  onQueryChange: (query: string) => void
  onSearch: (query: string) => void
  results?: SearchResult[]
}

export const SearchBar = ({
  query,
  disabled = false,
  invalid = false,
  readonly = false,
  className = '',
  pointerEvents,
  placeholder = '',
  onPress = () => {},
  onQueryChange,
  onSearch,
}: Props) => {
  return (
    <Pressable onPress={onPress}>
      <HStack className={`${className} relative`}>
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
        >
          <InputField
            type="text"
            inputMode="search"
            value={query}
            onChangeText={onQueryChange}
            placeholder={placeholder}
            onSubmitEditing={() => onSearch(query)}
          />
        </Input>
        <Button
          onPress={() => onSearch(query)}
          size="xl"
          style={{
            borderStartStartRadius: 0,
            borderStartEndRadius: 0,
            borderEndStartRadius: 8,
            borderEndEndRadius: 8,
          }}
        >
          <Icon as={ArrowRightIcon} size="md" color="white" />
        </Button>
      </HStack>
    </Pressable>
  )
}

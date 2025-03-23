import { Button } from '@/components/ui/button'
import { HStack } from '@/components/ui/hstack'
import { ArrowRightIcon, Icon } from '@/components/ui/icon'
import { Input, InputField } from '@/components/ui/input'
import { Pressable } from 'react-native'

interface Props {
  disabled?: boolean
  invalid?: boolean
  readonly?: boolean
  pointerEvents?: 'auto' | 'box-none' | 'none' | 'box-only' | undefined
  onPress?: () => void
}

export const SearchBar = ({
  disabled = false,
  invalid = false,
  readonly = false,
  pointerEvents,
  onPress = () => {},
}: Props) => {
  return (
    <Pressable onPress={onPress}>
      <HStack>
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
          <InputField placeholder="A que dirección quieres ir?" />
        </Input>
        <Button
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

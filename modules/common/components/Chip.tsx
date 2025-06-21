import { Button } from '@/components/ui/button'

interface ChipProps {
  children: React.ReactNode
  selected?: boolean
  className?: string
  onPress: () => void
}

export const Chip = ({
  children,
  onPress,
  selected = false,
  className,
}: ChipProps) => {
  return (
    <Button
      onPress={onPress}
      size="sm"
      className={`rounded-full ${className}`}
      variant={selected ? 'solid' : 'outline'}
    >
      {children}
    </Button>
  )
}

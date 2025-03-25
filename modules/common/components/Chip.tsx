import { Button } from '@/components/ui/button'

interface ChipProps {
  children: React.ReactNode
  onPress: () => void
  selected?: boolean
}

export const Chip = ({ children, onPress, selected = false }: ChipProps) => {
  return (
    <Button
      onPress={onPress}
      size="sm"
      className="rounded-full"
      variant={selected ? 'solid' : 'outline'}
    >
      {children}
    </Button>
  )
}

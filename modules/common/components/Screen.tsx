import { Box } from '@/components/ui/box'

interface ScreenProps {
  children: React.ReactNode
}

export const ScreenWrapper = ({ children }: ScreenProps) => {
  return <Box className="px-4 w-full h-full">{children}</Box>
}

import { Box } from '@/components/ui/box'

interface ScreenProps {
  children: React.ReactNode
  className?: string
}

export const ScreenWrapper = ({ children, className }: ScreenProps) => {
  return <Box className={`${className} px-4 w-full h-screen`}>{children}</Box>
}

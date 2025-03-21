import { useRootNavigationState, useRouter } from "expo-router"
import { useEffect } from "react"
import { ActivityIndicator } from "react-native"


export default function Index() {

    const router = useRouter()
  const navigationState = useRootNavigationState()

  useEffect(() => {
    if (navigationState?.key) {
      router.replace('/home')
    }
  }, [navigationState?.key])


    return (
        <ActivityIndicator />
    )
}
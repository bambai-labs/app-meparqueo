import { useAppSelector } from '@/modules/common'
import { Camera } from '@rnmapbox/maps'
import { useRef } from 'react'

export const useAllParkingLots = () => {
  const cameraRef = useRef<Camera>(null)
  const { deviceLocation } = useAppSelector((state) => state.location)

  const handleMapFinishLoading = () => {
    deviceLocation &&
      cameraRef.current?.setCamera({
        centerCoordinate: deviceLocation,
        zoomLevel: 14,
        heading: 0,
        animationDuration: 0,
      })
  }

  return {
    cameraRef,
    handleMapFinishLoading,
  }
}

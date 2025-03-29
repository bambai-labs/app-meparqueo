import { RecentParkingLotResponse } from '@/api'
import { ParkingLot, ParkingUpdateEstatus } from '@/modules'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ParkingSliceState {
  recentParkings: RecentParkingLotResponse[]
  parkingLots: ParkingLot[]
}

const initialState: ParkingSliceState = {
  recentParkings: [],
  parkingLots: [],
}

export const parkingSlice = createSlice({
  name: 'parking',
  initialState,
  reducers: {
    setParkingLots: (
      state: ParkingSliceState,
      action: PayloadAction<ParkingLot[]>,
    ) => {
      state.parkingLots = action.payload
    },
    updateParkingLotAvailability: (
      state: ParkingSliceState,
      action: PayloadAction<ParkingUpdateEstatus>,
    ) => {
      const { payload } = action
      const { availability, parkingLotId, status } = payload

      const parkingLotIndex = state.parkingLots.findIndex(
        (parkingLot) => parkingLot.id === parkingLotId,
      )

      const recentParkingLotIndex = state.recentParkings.findIndex(
        (parkingLot) => parkingLot.id === parkingLotId,
      )

      if (parkingLotIndex !== -1) {
        const newParkings = state.parkingLots.map((parking) => {
          if (parking.id === parkingLotId) {
            return {
              ...parking,
              availability: availability,
              status: status,
            }
          }

          return parking
        })
        state.parkingLots = newParkings
      }

      if (recentParkingLotIndex !== -1) {
        const newParkings = state.recentParkings.map((parking) => {
          if (parking.id === parkingLotId) {
            return {
              ...parking,
              availability: availability,
              status: status,
            }
          }
          return parking
        })

        state.recentParkings = newParkings
      }
    },
    pushRecentParkingLots: (
      state: ParkingSliceState,
      action: PayloadAction<RecentParkingLotResponse[]>,
    ) => {
      state.recentParkings.push(...action.payload)
    },
    setRecentParkingLots: (
      state: ParkingSliceState,
      action: PayloadAction<RecentParkingLotResponse[]>,
    ) => {
      state.recentParkings = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setParkingLots,
  updateParkingLotAvailability,
  pushRecentParkingLots,
  setRecentParkingLots,
} = parkingSlice.actions

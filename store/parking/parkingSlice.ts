import { RecentParkingLotResponse } from '@/api'
import { ParkingLot, ParkingUpdateEstatus } from '@/modules'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ParkingSliceState {
  recentParkings: RecentParkingLotResponse[]
  parkingLots: ParkingLot[]
  allParkingLots: ParkingLot[]
}

const initialState: ParkingSliceState = {
  recentParkings: [],
  parkingLots: [],
  allParkingLots: [],
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
        (parkingLot) => parkingLot.parkingLot.id === parkingLotId,
      )

      const allParkingLotsIndex = state.allParkingLots.findIndex(
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
          const { id, viewedAt } = parking

          if (parking.parkingLot.id === parkingLotId) {
            return {
              id,
              viewedAt,
              parkingLot: {
                ...parking.parkingLot,
                availability: availability,
                status: status,
              },
            }
          }
          return parking
        })
        state.recentParkings = newParkings
      }

      if (allParkingLotsIndex !== -1) {
        const newParkings = state.allParkingLots.map((parking) => {
          if (parking.id === parkingLotId) {
            return {
              ...parking,
              availability: availability,
              status: status,
            }
          }
          return parking
        })
        state.allParkingLots = newParkings
      }
    },
    pushRecentParkingLots: (
      state: ParkingSliceState,
      action: PayloadAction<RecentParkingLotResponse[]>,
    ) => {
      state.recentParkings = state.recentParkings.concat(action.payload)
    },
    setRecentParkingLots: (
      state: ParkingSliceState,
      action: PayloadAction<RecentParkingLotResponse[]>,
    ) => {
      state.recentParkings = action.payload
    },
    setAllParkingLots: (
      state: ParkingSliceState,
      action: PayloadAction<ParkingLot[]>,
    ) => {
      state.allParkingLots = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setParkingLots,
  updateParkingLotAvailability,
  pushRecentParkingLots,
  setRecentParkingLots,
  setAllParkingLots,
} = parkingSlice.actions

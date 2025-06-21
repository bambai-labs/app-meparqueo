import { RecentParkingLotResponse } from '@/api'
import { ParkingLot, ParkingUpdateEstatus, updateParkingLot } from '@/modules'
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
      const { parkingLotId, availability, status } = action.payload

      state.parkingLots = updateParkingLot(state.parkingLots, parkingLotId, {
        availability,
        status,
      })

      state.recentParkings = state.recentParkings.map((recentParking) => {
        if (recentParking.parkingLot.id === parkingLotId) {
          return {
            ...recentParking,
            parkingLot: {
              ...recentParking.parkingLot,
              availability,
              status,
            },
          }
        }
        return recentParking
      })

      state.allParkingLots = updateParkingLot(
        state.allParkingLots,
        parkingLotId,
        { availability, status },
      )
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

import { configureStore } from '@reduxjs/toolkit'
import tileReducer from './tileSlice'
import playerSlice from './playerSlice'

export default configureStore({
  reducer: {
    tile: tileReducer,
    player: playerSlice,
  },
})
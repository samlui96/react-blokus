import { configureStore } from '@reduxjs/toolkit'
import tileReducer from './tileSlice'

export default configureStore({
  reducer: {
    tile: tileReducer,
  },
})
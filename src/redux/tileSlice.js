import { createSlice } from '@reduxjs/toolkit'

export const tileSlice = createSlice({
  name: 'tile',
  initialState: {
    id: 0,
    group: 0
  },
  reducers: {
    changeGroup: (state, action) => {
      state.group = action.payload
    },
    changeTile: (state, action) => {
      state.id = action.payload
    },
  },
})

export const { changeGroup, changeTile } = tileSlice.actions

export default tileSlice.reducer
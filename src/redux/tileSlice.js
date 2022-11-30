import { createSlice } from '@reduxjs/toolkit'

export const tileSlice = createSlice({
  name: 'tile',
  initialState: {
    id: 0,
    group: 0,
    endNode: 0
  },
  reducers: {
    changeGroup: (state, action) => {
      state.group = action.payload
    },
    changeTile: (state, action) => {
      state.id = action.payload
    },
    changeEndNode: (state, action) => {
      state.endNode = action.payload
    },
  },
})

export const { changeGroup, changeTile, changeEndNode } = tileSlice.actions

export default tileSlice.reducer
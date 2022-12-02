import { createSlice } from '@reduxjs/toolkit'

export const tileSlice = createSlice({
  name: 'tile',
  initialState: {
    id: 'I',
    group: 0,
    endNode: 0,
    dragging: false
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
    changeDragging: (state, action) => {
      state.dragging = action.payload
    },
  },
})

export const { changeGroup, changeTile, changeEndNode, changeDragging } = tileSlice.actions

export default tileSlice.reducer
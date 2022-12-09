import { createSlice } from "@reduxjs/toolkit";
import POLYOMINOES from '../components/constant'

export const playerSlice = createSlice({
  name: "player",
  initialState: {
    curPlayer: 3,
    color: ["blue", "yellow", "green", "orange"],
    tiles: Array.from({ length: 4 }, () => POLYOMINOES),
    start: [false, false, false, false],
    end: [false, false, false, false],
    score: [0, 0, 0, 0],
  },
  reducers: {
    changePlayer: (state, action) => {
      state.curPlayer = action.payload;
    },
    changeTile: (state, action) => {
      state.tiles = action.payload;
    },
    startPlayer: (state, action) => {
      state.start = action.payload;
    },
    endPlayer: (state, action) => {
      state.end = action.payload;
    },
    changePlayerScore: (state, action) => {
      state.score = action.payload;
    },
  },
});

export const { changePlayer, changeTile, startPlayer, endPlayer, changePlayerScore } = playerSlice.actions;

export default playerSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const playerSlice = createSlice({
  name: "player",
  initialState: {
    curPlayer: 0,
    color: ["blue", "yellow", "green", "orange"],
    tiles: "",
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

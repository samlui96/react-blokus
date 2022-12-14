import { createSlice } from "@reduxjs/toolkit";
import POLYOMINOES from "../components/constant";

export const playerSlice = createSlice({
  name: "player",
  initialState: {
    curPlayer: 0,
    color: ["blue", "yellow", "green", "orange"],
    tiles: Array.from({ length: 4 }, () => POLYOMINOES),
    start: [true, true, true, true],
    end: [false, false, false, false],
    score: [0, 0, 0, 0],
  },
  reducers: {
    changePlayer: (state, action) => {
      do {
        action.payload = action.payload < 3 ? action.payload + 1 : 0;
      } while (state.end[action.payload]);
      state.curPlayer = action.payload;
    },
    changePlayerTile: (state, action) => {
      state.tiles = action.payload;
    },
    startPlayer: (state, action) => {
      state.start = action.payload;
    },
    endPlayer: (state, action) => {
      state.end[action.payload] = true;
    },
    changePlayerScore: (state, action) => {
      state.score = action.payload;
    },
  },
});

export const {
  changePlayer,
  changePlayerTile,
  startPlayer,
  endPlayer,
  changePlayerScore,
} = playerSlice.actions;

export default playerSlice.reducer;

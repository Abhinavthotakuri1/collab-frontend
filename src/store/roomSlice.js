import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
  name: "room",
  initialState: { current: null },
  reducers: {
    setRoom(state, action) { state.current = action.payload; },
    clearRoom(state) { state.current = null; }
  }
});

export const { setRoom, clearRoom } = roomSlice.actions;
export default roomSlice.reducer;
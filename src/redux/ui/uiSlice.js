import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
   name: "ui",
   initialState: {
      tooltip: {
         show: false,
         text: "",
      },
   },
   reducers: {
      showTooltip(state, action) {
         state.tooltip = { show: true, text: action.payload };
      },
      hideTooltip(state) {
         state.tooltip = { show: false, text: "" };
      },
   },
});

export const { showTooltip, hideTooltip } = uiSlice.actions;

export default uiSlice.reducer;

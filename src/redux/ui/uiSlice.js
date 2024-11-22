import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
   name: "ui",
   initialState: {
      tooltip: {
         show: false,
         text: "",
      },
      font: "Arial",
      fontSize: "16px",
   },
   reducers: {
      showTooltip(state, action) {
         state.tooltip = { show: true, text: action.payload };
      },
      hideTooltip(state) {
         state.tooltip = { show: false, text: "" };
      },
      setFont(state, action) {
         state.font = action.payload;
      },
      setFontSize(state, action) {
         state.fontSize = action.payload;
      },
   },
});

export const { showTooltip, hideTooltip, setFont, setFontSize } = uiSlice.actions;

export default uiSlice.reducer;

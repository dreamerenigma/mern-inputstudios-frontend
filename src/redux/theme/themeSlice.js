import { createSlice } from "@reduxjs/toolkit";

const getSystemTheme = () => {
   return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const initialState = {
   theme: "system",
};

const themeSlice = createSlice({
   name: "theme",
   initialState,
   reducers: {
      setTheme: (state, action) => {
         state.theme = action.payload;
      },
      toggleTheme: (state) => {
         if (state.theme !== "system") {
            state.theme = state.theme === "light" ? "dark" : "light";
         }
      },
      syncSystemTheme: (state) => {
         if (state.theme === "system") {
            state.theme = getSystemTheme();
         }
      },
   },
});

export const { setTheme, toggleTheme, syncSystemTheme } = themeSlice.actions;

export default themeSlice.reducer;

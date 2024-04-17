import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentLanguage: 'en', // Изначально устанавливаем язык по умолчанию
};

const languageSlice = createSlice({
   name: 'language',
   initialState,
   reducers: {
      changeLanguage(state, action) {
         state.currentLanguage = action.payload; // Устанавливаем новый язык
      },
   },
});

export const { changeLanguage } = languageSlice.actions;
export default languageSlice.reducer;

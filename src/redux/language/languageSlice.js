import { createSlice } from '@reduxjs/toolkit';
import i18n from '../../i18n';

const languageSlice = createSlice({
   name: 'language',
   initialState: {
      currentLanguage: 'ru',
   },
   reducers: {
      changeLanguage: (state, action) => {
         state.currentLanguage = action.payload;
         i18n.changeLanguage(action.payload);
      },
   },
});

export const { changeLanguage } = languageSlice.actions;
export default languageSlice.reducer;

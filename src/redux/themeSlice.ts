import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ThemeMode} from '../utils/enums/theme';

const initialState = {
  mode: ThemeMode.LIGHT,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
    },
  },
});

export const {setTheme} = themeSlice.actions;

export default themeSlice.reducer;

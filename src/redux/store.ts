import {configureStore} from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import listReducer from './listSlice';
import selectionReducer from './selectedItemSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    list: listReducer,
    selections: selectionReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Item} from '../models/item.model';
import {List} from '../models/list.model';

import {selectedItemStateType} from './types';

const initialState: selectedItemStateType = {
  selectedList: null,
  selectedItem: null,
};

export const selectionSlice = createSlice({
  name: 'selections',
  initialState,
  reducers: {
    setSelectedList: (state, action: PayloadAction<List>) => {
      state.selectedList = action.payload;
    },
    setSelectedItem: (state, action: PayloadAction<Item>) => {
      state.selectedItem = action.payload;
    },
    clearSelectedItem: state => {
      state.selectedItem = null;
    },
    clearSelectedList: state => {
      state.selectedList = null;
    },
  },
});

export const {
  setSelectedList,
  setSelectedItem,
  clearSelectedItem,
  clearSelectedList,
} = selectionSlice.actions;

export default selectionSlice.reducer;

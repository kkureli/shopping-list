import {createSlice} from '@reduxjs/toolkit';
import {listsStateType} from './types';
import {addToBeginningOfListAndDelete} from '../utils/helpers/helpers';
import {
  addItemThunk,
  addListThunk,
  changeItemStatusThunk,
  deleteItemThunk,
  deleteListThunk,
  getListsThunk,
  updateItemThunk,
  updateListThunk,
} from './thunks';

const initialState: listsStateType = {
  lists: [],
};

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getListsThunk.fulfilled, (state, action) => {
      state.lists = action.payload;
    });
    builder.addCase(addListThunk.fulfilled, (state, action) => {
      const newList = action.payload;
      state.lists = [newList, ...state.lists];
    });
    builder.addCase(deleteListThunk.fulfilled, (state, action) => {
      state.lists = state.lists.filter(list => list.id !== action.payload);
    });
    builder.addCase(updateListThunk.fulfilled, (state, action) => {
      state.lists = addToBeginningOfListAndDelete(
        action.payload.updatedList,
        state.lists,
        action.payload.id,
      );
    });
    builder.addCase(addItemThunk.fulfilled, (state, action) => {
      state.lists = state.lists.map(list =>
        list.id === action.payload.listId
          ? {...list, items: action.payload.updatedListItems}
          : list,
      );
    });
    builder.addCase(updateItemThunk.fulfilled, (state, action) => {
      state.lists = state.lists.map(list =>
        list.id === action.payload.listId
          ? {...list, items: action.payload.updatedListItems}
          : list,
      );
    });
    builder.addCase(deleteItemThunk.fulfilled, (state, action) => {
      state.lists = state.lists.map(list =>
        list.id === action.payload.listId
          ? {...list, items: action.payload.updatedListItems}
          : list,
      );
    });
    builder.addCase(changeItemStatusThunk.fulfilled, (state, action) => {
      state.lists = state.lists.map(list =>
        list.id === action.payload.listId
          ? {...list, items: action.payload.updatedListItems}
          : list,
      );
    });
  },
});

export default listSlice.reducer;

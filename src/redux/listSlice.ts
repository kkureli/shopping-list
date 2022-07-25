import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {List} from '../models/list.model';
import {ListTitleIconColorsOptions} from '../utils/enums/listTitleIconColors';
import {Item, ItemStatus} from '../models/item.model';

import uuid from 'react-native-uuid';
import {
  onAddItemPayloadType,
  onAddListType,
  onDeleteItemPayloadType,
  onItemStatusChangePayloadType,
  onUpdateItemPayloadType,
  listsStateType,
  onUpdateListType,
  onDeleteListType,
} from './types';
import {
  addToBeginningOfListAndDelete,
  addToEndOfListAndDelete,
  getCurrentDate,
  getSelectedItem,
  getSelectedList,
} from '../utils/helpers/helpers';

const initialState: listsStateType = {
  lists: [
    {
      icon: ListTitleIconColorsOptions.Red,
      id: '1',
      title: 'First List',
      createdDate: '10.12.2020',
      updatedDate: '10.16.2020, 23:46',
      items: [
        {
          createdDate: '12.16.2020, 12:22',
          updatedDate: '12.16.2020, 23:46',
          status: ItemStatus.PENDING,
          title: 'apple',
          id: 'test',
        },
      ],
    },
  ],
};

export const listSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    onAddList: (state, action: PayloadAction<onAddListType>) => {
      const newList: List = {
        ...action.payload,
        id: uuid.v4().toString(),
        createdDate: getCurrentDate(),
        updatedDate: getCurrentDate(),
        items: [],
      };

      state.lists = [newList, ...state.lists];
    },
    onUpdateList: (state, action: PayloadAction<onUpdateListType>) => {
      const selectedList = getSelectedList(state.lists, action.payload.id);

      const updatedList: List = {
        ...selectedList,
        updatedDate: getCurrentDate(),
        icon: action.payload.icon,
        title: action.payload.title,
      };
      state.lists = addToBeginningOfListAndDelete(
        updatedList,
        state.lists,
        action.payload.id,
      );
    },
    onDeleteList: (state, action: PayloadAction<onDeleteListType>) => {
      state.lists = state.lists.filter(list => list.id !== action.payload.id);
    },
    onAddItem: (state, action: PayloadAction<onAddItemPayloadType>) => {
      const addedItem: Item = {
        id: uuid.v4().toString(),
        status: ItemStatus.PENDING,
        title: action.payload.item.title,
        updatedDate: getCurrentDate(),
        createdDate: getCurrentDate(),
      };

      state.lists.map(list =>
        list.id === action.payload.list.id
          ? {...list, items: [addedItem, ...list.items]}
          : list,
      );
    },
    onUpdateItem: (state, action: PayloadAction<onUpdateItemPayloadType>) => {
      const selectedList = getSelectedList(state.lists, action.payload.list.id);

      const selectedItem = getSelectedItem(
        selectedList?.items,
        action.payload.item.id,
      );

      const updatedItem: Item = {
        ...selectedItem,
        title: action.payload.item.title,
        updatedDate: getCurrentDate(),
      };

      const updatedSelectedListItems = [
        updatedItem,
        ...selectedList?.items.filter(
          item => item.id !== action.payload.item.id,
        ),
      ];

      state.lists = state.lists.map(list =>
        list.id === action.payload.list.id
          ? {...list, items: updatedSelectedListItems}
          : list,
      );
    },

    onDeleteItem: (state, action: PayloadAction<onDeleteItemPayloadType>) => {
      const selectedList = getSelectedList(state.lists, action.payload.list.id);

      const updatedListItems = selectedList?.items.filter(
        item => item.id !== action.payload.item.id,
      );

      state.lists = state.lists.map(list =>
        list.id === action.payload.item.id
          ? {...selectedList, items: updatedListItems}
          : list,
      );
    },
    onItemStatusChange: (
      state,
      action: PayloadAction<onItemStatusChangePayloadType>,
    ) => {
      const selectedList = getSelectedList(state.lists, action.payload.list.id);
      const selectedItem = getSelectedItem(
        selectedList?.items,
        action.payload.item.id,
      );

      if (selectedItem.status === ItemStatus.PENDING) {
        const updatedItem: Item = {
          ...selectedItem,
          updatedDate: getCurrentDate(),
          status: ItemStatus.DONE,
        };

        const updatedListItems: Item[] = addToEndOfListAndDelete(
          updatedItem,
          selectedList.items,
          action.payload.item.id,
        );

        state.lists = state.lists.map(list =>
          list.id === action.payload.list.id
            ? {...list, items: updatedListItems}
            : list,
        );
      } else {
        const updatedItem: Item = {
          ...selectedItem,
          updatedDate: getCurrentDate(),
          status: ItemStatus.PENDING,
        };

        const updatedListItems = addToBeginningOfListAndDelete(
          updatedItem,
          selectedList.items,
          action.payload.item.id,
        );

        state.lists = state.lists.map(list =>
          list.id === action.payload.list.id
            ? {...list, items: updatedListItems}
            : list,
        );
      }
    },
  },
});

export const {onAddList, onUpdateList, onDeleteList, onAddItem} =
  listSlice.actions;

export default listSlice.reducer;

import {createAsyncThunk} from '@reduxjs/toolkit';
import {services} from '../api/services/services';
import {List} from '../models/list.model';
import {
  addToBeginningOfListAndDelete,
  addToEndOfListAndDelete,
  getCurrentDate,
  getSelectedItem,
  getSelectedList,
  toArray,
} from '../utils/helpers/helpers';
import uuid from 'react-native-uuid';
import {
  onAddItemPayloadType,
  onAddListType,
  onDeleteItemPayloadType,
  onDeleteListType,
  onItemStatusChangePayloadType,
  onUpdateItemPayloadType,
  onUpdateListType,
} from './types';
import {Item, ItemStatus} from '../models/item.model';
import {setIsSplasLoading, setLoading} from './appSlice';

export type UpdatedListItemsReturnType = {
  updatedListItems: Item[];
  listId: string;
};
export type UpdatedListReturnType = {
  updatedList: List;
  id: string;
};

export const getListsThunk = createAsyncThunk<List[], undefined, {}>(
  'getLists',
  async (undefined, {dispatch}) => {
    const data = await services.getLists();
    setTimeout(() => {
      dispatch(setIsSplasLoading(false));
    }, 2222);
    return toArray(data);
  },
);
export const addListThunk = createAsyncThunk<List, onAddListType, {}>(
  'addList',
  async (list: onAddListType, {dispatch}) => {
    dispatch(setLoading(true));

    const id = uuid.v4().toString();
    const newList: List = {
      ...list,
      id,
      createdDate: getCurrentDate(),
      updatedDate: getCurrentDate(),
      items: [],
    };
    await services.addList({
      [id]: newList,
    });
    dispatch(setLoading(false));
    return newList;
  },
);
export const deleteListThunk = createAsyncThunk<string, onDeleteListType, {}>(
  'deleteList',
  async (payload: Pick<List, 'id'>, {dispatch}) => {
    dispatch(setLoading(true));
    await services.deleteList(payload.id);
    dispatch(setLoading(false));
    return payload.id;
  },
);

export const updateListThunk = createAsyncThunk<
  UpdatedListReturnType,
  onUpdateListType,
  {}
>('updateList', async (list, {getState, dispatch}) => {
  dispatch(setLoading(true));
  const state = getState().list;

  const selectedList = getSelectedList(state.lists, list.id);
  const updatedList: List = {
    ...selectedList,
    updatedDate: getCurrentDate(),
    icon: list.icon,
    title: list.title,
  };
  await services.updateList(list.id, updatedList);
  dispatch(setLoading(false));

  return {
    updatedList,
    id: list.id,
  };
});

export const addItemThunk = createAsyncThunk<
  UpdatedListItemsReturnType,
  onAddItemPayloadType,
  {}
>('addItem', async (payload: onAddItemPayloadType, {getState, dispatch}) => {
  dispatch(setLoading(true));
  const state = getState().list;

  const addedItem: Item = {
    id: uuid.v4().toString(),
    status: ItemStatus.PENDING,
    title: payload.item.title,
    updatedDate: getCurrentDate(),
    createdDate: getCurrentDate(),
  };
  const selectedList = getSelectedList(state.lists, payload.list.id);
  const updatedListItems =
    selectedList.items?.length > 0 ? [...selectedList.items] : [];
  updatedListItems.unshift(addedItem);

  await services.addItem(updatedListItems, payload.list.id);
  dispatch(setLoading(false));

  return {updatedListItems, listId: payload.list.id};
});

export const updateItemThunk = createAsyncThunk<
  UpdatedListItemsReturnType,
  onUpdateItemPayloadType,
  {}
>(
  'updateItem',
  async (payload: onUpdateItemPayloadType, {getState, dispatch}) => {
    dispatch(setLoading(true));

    const state = getState().list;

    const selectedList = getSelectedList(state.lists, payload.list.id);

    const selectedItem = getSelectedItem(selectedList?.items, payload.item.id);

    const updatedItem: Item = {
      ...selectedItem,
      title: payload.item.title,
      updatedDate: getCurrentDate(),
    };

    const updatedListItems = [
      updatedItem,
      ...selectedList?.items.filter(item => item.id !== payload.item.id),
    ];

    await services.addItem(updatedListItems, payload.list.id);
    dispatch(setLoading(false));

    return {updatedListItems, listId: payload.list.id};
  },
);

export const deleteItemThunk = createAsyncThunk<
  UpdatedListItemsReturnType,
  onDeleteItemPayloadType,
  {}
>(
  'deleteItem',
  async (payload: onDeleteItemPayloadType, {getState, dispatch}) => {
    dispatch(setLoading(true));

    const state = getState().list;

    const selectedList = getSelectedList(state.lists, payload.list.id);

    const updatedListItems = selectedList?.items.filter(
      item => item.id !== payload.item.id,
    );

    await services.addItem(updatedListItems, payload.list.id);
    dispatch(setLoading(false));

    return {updatedListItems, listId: payload.list.id};
  },
);

export const changeItemStatusThunk = createAsyncThunk<
  UpdatedListItemsReturnType,
  onItemStatusChangePayloadType,
  {}
>(
  'changeItemStatus',
  async (payload: onItemStatusChangePayloadType, {getState, dispatch}) => {
    dispatch(setLoading(true));

    const state = getState().list;

    const selectedList = getSelectedList(state.lists, payload.list.id);

    const selectedItem = getSelectedItem(selectedList?.items, payload.item.id);

    if (selectedItem.status === ItemStatus.PENDING) {
      const updatedItem: Item = {
        ...selectedItem,
        updatedDate: getCurrentDate(),
        status: ItemStatus.DONE,
      };

      const updatedListItems: Item[] = addToEndOfListAndDelete(
        updatedItem,
        selectedList.items,
        payload.item.id,
      );

      await services.changeItemStatusThunk(updatedListItems, payload.list.id);
      dispatch(setLoading(false));

      return {updatedListItems, listId: payload.list.id};
    } else {
      const updatedItem: Item = {
        ...selectedItem,
        updatedDate: getCurrentDate(),
        status: ItemStatus.PENDING,
      };

      const updatedListItems = addToBeginningOfListAndDelete(
        updatedItem,
        selectedList.items,
        payload.item.id,
      );

      state.lists = state.lists.map(list =>
        list.id === payload.list.id ? {...list, items: updatedListItems} : list,
      );

      await services.changeItemStatusThunk(updatedListItems, payload.list.id);
      dispatch(setLoading(false));
      return {updatedListItems, listId: payload.list.id};
    }
  },
);

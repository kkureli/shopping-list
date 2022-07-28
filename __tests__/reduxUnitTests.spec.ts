import {List} from '../src/models/list.model';
import {Item, ItemStatus} from '../src/models/item.model';
import {
  addItemThunk,
  addListThunk,
  deleteItemThunk,
  deleteListThunk,
  getListsThunk,
  updateListThunk,
} from '../src/redux/thunks';
import {listsStateType} from '../src/redux/types';
import {ListTitleIconColorsOptions} from '../src/utils/enums/listTitleIconColors';
import listReducer from '../src/redux/listSlice';
import uuid from 'react-native-uuid';

describe('list reducer async actions', () => {
  const initialState: listsStateType = {
    lists: [
      {
        items: [
          {
            title: 'Water',
            createdDate: '28.07.2022',
            updatedDate: '28.07.2022',
            status: ItemStatus.PENDING,
            id: uuid.v4().toString(),
          },
        ],
        title: 'Food List',
        createdDate: '28.07.2022',
        updatedDate: '28.07.2022',
        icon: ListTitleIconColorsOptions.Blue,
        id: '1',
      },
    ],
  };

  it('should get list async', () => {
    const mockListsFromFirebase: List[] = [
      {
        items: [
          {
            title: 'Tomato',
            createdDate: '28.07.2022',
            updatedDate: '28.07.2022',
            status: ItemStatus.PENDING,
            id: uuid.v4().toString(),
          },
        ],
        title: 'Vegetable List',
        createdDate: '28.07.2022',
        updatedDate: '28.07.2022',
        icon: ListTitleIconColorsOptions.Blue,
        id: '2',
      },
    ];

    const action = {
      type: getListsThunk.fulfilled.type,
      payload: mockListsFromFirebase,
    };

    const state = listReducer(initialState, action);
    expect(state.lists).toEqual(mockListsFromFirebase);
    expect(state.lists).toHaveLength(1);
  });

  it('should add list async', () => {
    const newList1: List = {
      items: [],
      title: 'Todo List1',
      createdDate: '28.07.2022',
      updatedDate: '28.07.2022',
      icon: ListTitleIconColorsOptions.Blue,
      id: uuid.v4().toString(),
    };

    const action = {
      type: addListThunk.fulfilled.type,
      payload: newList1,
    };
    const state = listReducer(initialState, action);
    expect(state.lists).toHaveLength(2);
    expect(state.lists).toEqual([newList1, ...initialState.lists]);
  });
  it('should delete list async', () => {
    const action = {type: deleteListThunk.fulfilled.type, payload: '1'};
    const state = listReducer(initialState, action);

    expect(state.lists).toHaveLength(0);
  });

  it('should update list async', () => {
    const newList: List = {
      items: [],
      title: 'Bucket List',
      createdDate: '28.07.2022',
      updatedDate: '28.07.2022',
      icon: ListTitleIconColorsOptions.Blue,
      id: uuid.v4().toString(),
    };

    const action = {
      type: updateListThunk.fulfilled.type,
      payload: {updatedList: newList, id: '1'},
    };
    const state = listReducer(initialState, action);

    expect(state.lists[0].title).toEqual('Bucket List');
  });

  it('should add item to list async', () => {
    const updatedListItems: Item[] = [
      {
        title: 'Water',
        createdDate: '28.07.2022',
        updatedDate: '28.07.2022',
        status: ItemStatus.PENDING,
        id: uuid.v4().toString(),
      },
      {
        title: 'Breads',
        createdDate: '28.07.2022',
        updatedDate: '28.07.2022',
        status: ItemStatus.PENDING,
        id: initialState.lists[0].items[0].id,
      },
    ];

    const action = {
      type: addItemThunk.fulfilled.type,
      payload: {updatedListItems, listId: '1'},
    };
    const state = listReducer(initialState, action);
    console.log('state:', state.lists);
    expect(state.lists[0].items).toHaveLength(2);
  });

  it('should delete item from list async', () => {
    const updatedListItems: Item[] = [];

    const action = {
      type: deleteItemThunk.fulfilled.type,
      payload: {updatedListItems, listId: '1'},
    };
    const state = listReducer(initialState, action);
    console.log('state:', state.lists);
    expect(state.lists[0].items).toHaveLength(0);
  });
});

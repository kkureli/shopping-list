import React from 'react';

import {render, screen, fireEvent} from '@testing-library/react-native';

import {Provider} from 'react-redux';

import {Home} from '../src/views';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from '../src/navigation/rootNavigation';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];

describe('With React Testing Library', () => {
  const initialState = {
    list: {lists: []},
    selections: {selectedItem: ''},
  };
  const mockStore = configureMockStore(middlewares);
  let store;

  it('Add List to firebase and render it on home screen"', async () => {
    store = mockStore(initialState);
    const {getByTestId, getByText} = render(
      <Provider store={store}>
        <NavigationContainer ref={navigationRef}>
          <Home />
        </NavigationContainer>
      </Provider>,
    );

    const addListButton = getByTestId('AddNewList');

    fireEvent.press(addListButton);
    const newListInput = getByTestId('NewListInput');
    fireEvent.changeText(newListInput, 'ToDoList');
    const addButton = getByTestId('AddUpdate');
    fireEvent.press(addButton);

    setTimeout(() => {
      expect(getByText('ToDoList')).toBeTruthy();
    }, 2000);
  });
});

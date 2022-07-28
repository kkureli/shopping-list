import {ItemStatus} from '../src/models/item.model';
import {
  addToBeginningOfListAndDelete,
  addToEndOfListAndDelete,
  getSelectedItem,
  getSelectedList,
  toArray,
} from '../src/utils/helpers/helpers';
import {ListTitleIconColorsOptions} from '../src/utils/enums/listTitleIconColors';

const lists = [
  {
    items: [
      {
        title: 'Water',
        createdDate: '28.07.2022',
        updatedDate: '28.07.2022',
        status: ItemStatus.PENDING,
        id: 'water',
      },
    ],
    title: 'Food List',
    createdDate: '28.07.2022',
    updatedDate: '28.07.2022',
    icon: ListTitleIconColorsOptions.Blue,
    id: '1',
  },
  {
    items: [
      {
        title: 'Apple',
        createdDate: '28.07.2022',
        updatedDate: '28.07.2022',
        status: ItemStatus.PENDING,
        id: 'apple',
      },
      {
        title: 'Banana',
        createdDate: '28.07.2022',
        updatedDate: '28.07.2022',
        status: ItemStatus.PENDING,
        id: 'banana',
      },
    ],
    title: 'Food List',
    createdDate: '28.07.2022',
    updatedDate: '28.07.2022',
    icon: ListTitleIconColorsOptions.Blue,
    id: '2',
  },
];

describe('Find True Element From Array', () => {
  it('should return selected list', () => {
    expect(getSelectedList(lists, '2')).toEqual({
      items: [
        {
          title: 'Apple',
          createdDate: '28.07.2022',
          updatedDate: '28.07.2022',
          status: ItemStatus.PENDING,
          id: 'apple',
        },
        {
          title: 'Banana',
          createdDate: '28.07.2022',
          updatedDate: '28.07.2022',
          status: ItemStatus.PENDING,
          id: 'banana',
        },
      ],
      title: 'Food List',
      createdDate: '28.07.2022',
      updatedDate: '28.07.2022',
      icon: ListTitleIconColorsOptions.Blue,
      id: '2',
    });
  });

  it('should return selected item', () => {
    expect(getSelectedItem(lists[1].items, 'banana')).toEqual({
      title: 'Banana',
      createdDate: '28.07.2022',
      updatedDate: '28.07.2022',
      status: ItemStatus.PENDING,
      id: 'banana',
    });
  });
});

describe('convert object to array', () => {
  it('should return array type', () => {
    expect(
      typeof Array.isArray(
        toArray({
          title: 'Banana',
          createdDate: '28.07.2022',
          updatedDate: '28.07.2022',
          status: ItemStatus.PENDING,
          id: 'banana',
        }),
      ),
    ).toBeTruthy();
  });
});

const pokemonsList = [
  {
    name: 'pikachu',
    id: 'pikachu',
  },
  {
    name: 'charizard',
    id: 'charizard',
  },
  {
    name: 'squirtle',
    id: 'squirtle',
  },
];

describe('put item to true position', () => {
  it('should put item to beginning of array', () => {
    expect(
      addToBeginningOfListAndDelete(
        {
          name: 'charizard',
          id: 'charizard',
        },
        pokemonsList,
        'charizard',
      )[0].id === 'charizard' &&
        addToBeginningOfListAndDelete(
          {
            name: 'charizard',
            id: 'charizard',
          },
          pokemonsList,
          'charizard',
        )[1].id !== 'charizard',
    ).toBeTruthy();
  });

  it('should put item to end of array', () => {
    expect(
      addToEndOfListAndDelete(
        {
          name: 'charizard',
          id: 'charizard',
        },
        pokemonsList,
        'charizard',
      )[1].id !== 'charizard' &&
        addToEndOfListAndDelete(
          {
            name: 'charizard',
            id: 'charizard',
          },
          pokemonsList,
          'charizard',
        )[pokemonsList.length - 1].id === 'charizard',
    ).toBeTruthy();
  });
});

import moment from 'moment';
import {Item} from '../../models/item.model';
import {List} from '../../models/list.model';

export const getCurrentDate = () =>
  moment(new Date()).format('DD.MM.YYYY, HH:mm');

// js Array.prototype.find method always returns T | undefined
// ts shows error  because of undefned possibility
// ensure function remove that possibility
export function ensure<T>(
  argument: T | undefined | null,
  message: string = 'This value was promised to be there.',
): T {
  if (argument === undefined || argument === null) {
    throw new TypeError(message);
  }

  return argument;
}

export const getSelectedList = (lists: List[], listId: string): List =>
  ensure(lists.find(list => list.id === listId));

export const getSelectedItem = (items: Item[], itemId: string): Item =>
  ensure(items.find(item => item.id === itemId));

export const addToBeginningOfListAndDelete = (
  itemToAdd: any,
  list: any[],
  id: string,
): any[] => {
  return [itemToAdd, ...list.filter(listItem => listItem.id !== id)];
};
export const addToEndOfListAndDelete = (
  itemToAdd: any,
  list: any[],
  id: string,
): any[] => {
  return [...list.filter(listItem => listItem.id !== id), itemToAdd];
};

export const toArray = (response: any) => {
  const array: any[] = [];

  Object.keys(response).forEach(key => {
    array.push(response[key]);
  });
  return array;
};

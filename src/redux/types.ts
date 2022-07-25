import {Item} from '../models/item.model';
import {List} from '../models/list.model';

export type listsStateType = {
  lists: List[];
};

export type onAddItemPayloadType = {
  item: Pick<Item, 'title'>;
  list: Pick<List, 'id'>;
};

export type onDeleteItemPayloadType = {
  item: Pick<Item, 'id'>;
  list: Pick<List, 'id'>;
};

export type onUpdateItemPayloadType = {
  item: Pick<Item, 'title' | 'id'>;
  list: Pick<List, 'id'>;
};

export type onItemStatusChangePayloadType = {
  item: Pick<Item, 'id'>;
  list: Pick<List, 'id'>;
};

export type onAddListType = Pick<List, 'icon' | 'title'>;
export type onUpdateListType = Pick<List, 'icon' | 'title' | 'id'>;
export type onDeleteListType = Pick<List, 'id'>;

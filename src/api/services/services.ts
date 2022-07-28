import {Item} from '../../models/item.model';
import {List} from '../../models/list.model';
import HttpClient from '../httpclient';
export const services = {
  getLists: () => {
    return HttpClient.Get('/lists.json');
  },
  addList: (list: Record<string, List>) => {
    //I use Patch instead of POST since I want to define the unique key for the list.
    return HttpClient.Patch('/lists.json', list);
  },
  deleteList: (id: string) => {
    return HttpClient.Delete(`/lists/${id}.json`);
  },
  updateList: (listId: string, updatedList: List) => {
    return HttpClient.Patch(`/lists/${listId}.json`, updatedList);
  },
  addItem: (items: Item[], listId: string) => {
    return HttpClient.Put(`/lists/${listId}/items.json`, items);
  },
  updateItem: (items: Item[], listId: string) => {
    return HttpClient.Put(`/lists/${listId}/items.json`, items);
  },
  deleteItem: (items: Item[], listId: string) => {
    return HttpClient.Put(`/lists/${listId}/items.json`, items);
  },
  changeItemStatusThunk: (items: Item[], listId: string) => {
    return HttpClient.Put(`/lists/${listId}/items.json`, items);
  },
};

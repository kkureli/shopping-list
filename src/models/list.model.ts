import {ListTitleIconColorsOptions} from '../utils/enums/listTitleIconColors';
import {Item} from './item.model';

export type List = {
  items: Item[];
  title: string;
  createdDate: string;
  updatedDate: string;
  icon: ListTitleIconColorsOptions;
  id: string;
};

import {ScreenNames} from '../../navigation/screens';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {List} from '../../models/list.model';

export type RootStackParamsList = {
  [ScreenNames.HOME]: undefined;
  [ScreenNames.ITEMS_LIST]: ItemsListProps;
};

export type ScreenType = {
  name: ScreenNames;
  component: (routeParams: any) => JSX.Element;
  title?: string;
  options?: NativeStackNavigationOptions;
};

export type ItemsListProps = {
  selectedList: List;
};

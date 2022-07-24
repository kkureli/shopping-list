import {ScreenNames} from '../../navigation/screens';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';

export type RootStackParamsList = {
  [ScreenNames.HOME]: undefined;
};

export type ScreenType = {
  name: ScreenNames;
  component: (routeParams: unknown) => JSX.Element;
  title?: string;
  options?: NativeStackNavigationOptions;
};

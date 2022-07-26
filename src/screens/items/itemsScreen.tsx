import React from 'react';
import {ItemsList} from '../../views';
import {RootStackParamsList} from '../../utils/types/routes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ScreenNames} from '../../navigation/screens';

type ScreenProps = NativeStackScreenProps<
  RootStackParamsList,
  ScreenNames.ITEMS_LIST
>;

export default function ItemsScreen({route}: ScreenProps) {
  return <ItemsList {...route.params} />;
}

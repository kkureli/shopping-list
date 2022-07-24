import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../screens/home/homeScreen';
import {ScreenNames} from '../screens';
import {RootStackParamsList, ScreenType} from '../../utils/types/routes';

const Stack = createNativeStackNavigator<RootStackParamsList>();

const screens: ScreenType[] = [
  {
    name: ScreenNames.HOME,
    component: HomeScreen,
  },
];

const StackNavigation = () => {
  return (
    <Stack.Navigator>
      {screens.map(screenOptions => {
        return <Stack.Screen key={screenOptions.name} {...screenOptions} />;
      })}
    </Stack.Navigator>
  );
};

export default StackNavigation;

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../screens/home/homeScreen';
import {ScreenNames} from '../screens';
import {RootStackParamsList, ScreenType} from '../../utils/types/routes';
import HeaderRight from '../../components/common/headerRight';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';

const Stack = createNativeStackNavigator<RootStackParamsList>();

const StackNavigation = () => {
  const {t} = useTranslation();
  const {colors} = useTheme();

  const screens: ScreenType[] = [
    {
      name: ScreenNames.HOME,
      component: HomeScreen,
      options: {
        headerTitle: t('screens.home.header.title'),
      },
    },
  ];
  return (
    <Stack.Navigator
      screenOptions={{
        headerRight: () => <HeaderRight />,
        headerStyle: {
          backgroundColor: colors.background,
        },
      }}>
      {screens.map(screenOptions => {
        return <Stack.Screen key={screenOptions.name} {...screenOptions} />;
      })}
    </Stack.Navigator>
  );
};

export default StackNavigation;

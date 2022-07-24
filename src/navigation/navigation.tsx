import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {FC} from 'react';
import StackNavigation from './stackNavigation';
import {LightTheme, DarkTheme} from '../theme';
import {RootState} from '../redux/store';
import {ThemeMode} from '../utils/enums/theme';

const AppNavigation: FC = () => {
  const theme = useSelector((state: RootState) => state.theme);

  return (
    <NavigationContainer
      theme={theme.mode === ThemeMode.LIGHT ? LightTheme : DarkTheme}>
      <StackNavigation />
    </NavigationContainer>
  );
};

export default AppNavigation;

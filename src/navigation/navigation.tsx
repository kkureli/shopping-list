import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {FC} from 'react';
import StackNavigation from './stackNavigation';

const AppNavigation: FC = () => {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
};

export default AppNavigation;

import {StyleSheet, View} from 'react-native';
import React from 'react';
import Spinner, {SpinnerType} from 'react-native-spinkit';
import Typography from './typography';

type LoadingSpinnerPropsType = {
  isSplashLoading: boolean;
};

const LoadingSpinner = (props: LoadingSpinnerPropsType) => {
  const {isSplashLoading} = props;
  const types: SpinnerType[] = [
    'CircleFlip',
    'Bounce',
    'Wave',
    'WanderingCubes',
    'Pulse',
    'ChasingDots',
    'ThreeBounce',
    'Circle',
    '9CubeGrid',
    'WordPress',
    'FadingCircle',
    'FadingCircleAlt',
    'Arc',
    'ArcAlt',
  ];

  const selectedType = types[Math.floor(Math.random() * types.length)];

  return (
    <View style={styles.container}>
      <Spinner
        isVisible={true}
        size={70}
        type={selectedType}
        color={'silver'}
      />
      {isSplashLoading && (
        <Typography title center style={styles.text}>
          Your awesome shopping lists are fetching... {'\n'} Please wait..
        </Typography>
      )}
    </View>
  );
};

export default LoadingSpinner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 50,
    color: 'white',
    fontStyle: 'italic',
  },
});

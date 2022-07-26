import {StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';
import {ListTitleIconColor} from '../../utils/types/listTitleIconColor';

type Props = {
  style?: ViewStyle;
  color?: ListTitleIconColor;
};

const Circle = (props: Props) => {
  const {style, color} = props;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: color,
        },
        style,
      ]}
    />
  );
};

export default Circle;

const styles = StyleSheet.create({
  container: {
    width: 35,
    height: 35,
    borderRadius: 50,
  },
});

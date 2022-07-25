import {FlexStyle, StyleSheet, View} from 'react-native';
import React from 'react';
import {ListTitleIconColor} from '../../utils/types/listTitleIconColor';

type Props = {
  style?: FlexStyle;
  color: ListTitleIconColor;
};

const Circle = (props: Props) => {
  const {style, color} = props;

  return (
    <View
      style={[
        styles.container,
        style,
        {
          backgroundColor: color,
        },
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

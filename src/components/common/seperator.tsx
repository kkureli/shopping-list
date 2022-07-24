import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';

const Seperator = () => {
  const {colors} = useTheme();

  return (
    <View
      style={[
        styles.seperator,
        {
          borderColor: colors.text,
        },
      ]}
    />
  );
};

export default Seperator;

const styles = StyleSheet.create({
  seperator: {
    borderWidth: 1,
  },
});

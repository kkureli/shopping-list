import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Circle from './circle';
import {useTheme} from '@react-navigation/native';
import Icon from './icon';

type Props = {
  isChecked: boolean;
  onPress: () => void;
};

const CheckCircle = (props: Props) => {
  const {isChecked, onPress} = props;
  const {colors} = useTheme();

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, {}]}>
      {isChecked ? (
        <Icon color={colors.primary} icon="CheckedCircle" />
      ) : (
        <Circle
          style={{
            ...styles.circleStyle,
            borderColor: colors.primary,
          }}
        />
      )}
    </TouchableOpacity>
  );
};

export default CheckCircle;

const styles = StyleSheet.create({
  circleStyle: {
    width: 24,
    height: 24,

    borderWidth: 2,
  },

  container: {
    marginRight: 30,
  },
});

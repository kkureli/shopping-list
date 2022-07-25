import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Typography from './typography';
import {ActionButtonProps} from '../../utils/types/actionButton';
import Icon from './icon';

const ActionButton = (props: ActionButtonProps) => {
  const {text, onPress, icon, disabled} = props;
  return (
    <TouchableOpacity
      disabled={disabled}
      style={styles.container}
      onPress={onPress}>
      {icon && <Icon icon={icon} />}
      <Typography
        bold
        primary
        gray={disabled}
        style={icon && styles.marginLeft5}>
        {text}
      </Typography>
    </TouchableOpacity>
  );
};

export default ActionButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginLeft5: {
    marginLeft: 5,
  },
});

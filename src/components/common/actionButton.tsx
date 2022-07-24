import {Pressable, StyleSheet} from 'react-native';
import React from 'react';
import Typography from './typography';
import {ActionButtonProps} from '../../utils/types/actionButton';
import Icon from './icon';

const ActionButton = (props: ActionButtonProps) => {
  const {text, onPress, icon} = props;
  return (
    <Pressable style={styles.container} onPress={onPress}>
      {icon && <Icon icon={icon} />}
      <Typography bold primary style={icon && styles.marginLeft5}>
        {text}
      </Typography>
    </Pressable>
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

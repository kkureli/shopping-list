import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SelectableItemProps} from '../../utils/types/selectableItem';
import Icon from './icon';
import Typography from './typography';

const SelectableItemRow = (props: SelectableItemProps) => {
  const {icon, value, label, onSelect, img, selectedKey} = props;

  return (
    <TouchableOpacity style={styles.container} onPress={() => onSelect(value)}>
      <View>
        {icon && <Icon icon={icon} />}
        {img && <Image source={img} style={styles.img} />}
      </View>
      <View>{label && <Typography bold>{label}</Typography>}</View>
      {selectedKey && selectedKey === value && <Icon icon="Check" />}
    </TouchableOpacity>
  );
};

export default SelectableItemRow;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
  },
  img: {
    width: 24,
    height: 24,
  },
});

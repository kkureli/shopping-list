import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import React from 'react';
import {FlatList} from './flatList';
import {useTheme} from '@react-navigation/native';
import Typography from './typography';
import Seperator from './seperator';

export type SelectItemType = {
  label: string;
  value: string | number;
};

type Props = {
  containerStyle?: ViewStyle;
  data: SelectItemType[];
  onSelect: (selectedItem: SelectItemType) => void;
};

const Dropdown = (props: Props) => {
  const {colors} = useTheme();
  const {containerStyle, data, onSelect} = props;

  const renderItem = ({item}: {item: SelectItemType}) => {
    return (
      <TouchableOpacity style={styles.item} onPress={() => onSelect(item)}>
        <Typography center title bold>
          {item.label}
        </Typography>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      style={styles.flatlist}
      keyExtractor={item => item.value.toString()}
      ItemSeparatorComponent={Seperator}
      renderItem={renderItem}
      data={data}
      contentContainerStyle={{
        ...styles.container,
        ...containerStyle,
        backgroundColor: colors.background,
      }}
    />
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 5,
    borderWidth: 1,
    borderColor: 'silver',
    borderRadius: 5,
  },
  flatlist: {
    maxHeight: 160,
    width: '90%',
  },
  item: {
    height: 40,
    marginVertical: 10,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

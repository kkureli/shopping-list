import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import React from 'react';
import {FlatList} from '../flatList';
import {listTitleIconColors} from '../../../data/constants';
import Circle from '../circle';
import {ListTitleIconColorType} from '../../../utils/types/listTitleIconColor';
import {ListTitleIconColorsOptions} from '../../../utils/enums/listTitleIconColors';
import {useTheme} from '@react-navigation/native';
import theme from '../../../theme';

type Props = {
  selectedColor: ListTitleIconColorsOptions;
  onSelect: (color: ListTitleIconColorsOptions) => void;
  containerStyle?: ViewStyle;
};

const TitleIconColorSelection = (props: Props) => {
  const {onSelect, selectedColor, containerStyle} = props;
  const {colors} = useTheme();
  const renderItem = ({item}: {item: ListTitleIconColorType}) => {
    const isSelected = selectedColor === item.name;
    return (
      <TouchableOpacity
        style={[
          styles.circle,
          isSelected && styles.selected,
          isSelected && {
            borderColor: colors.select,
          },
        ]}
        onPress={() => onSelect(item.name)}>
        <Circle color={item.rgb} />
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      contentContainerStyle={{
        ...styles.container,
        backgroundColor: colors.lightGrayBG,
        ...containerStyle,
      }}
      scrollEnabled={false}
      horizontal
      data={listTitleIconColors}
      renderItem={renderItem}
      keyExtractor={({name}) => name}
    />
  );
};

export default TitleIconColorSelection;

const styles = StyleSheet.create({
  circle: {
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,

    borderRadius: 50,
  },
  selected: {
    borderWidth: 2,
    padding: 5,
  },
  container: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: theme.SIZES.cardBorderRadius,
  },
});

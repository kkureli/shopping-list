import {StyleSheet, TouchableHighlight, View} from 'react-native';
import React from 'react';
import Typography from '../common/typography';
import {useTheme} from '@react-navigation/native';
import {Item, ItemStatus} from '../../models/item.model';
import CheckCircle from '../common/checkCircle';

type Props = {
  onPress?: (item: Item) => void;
  onCheckItem: (item: Item) => void;
  item: Item;
};

const ItemRow = (props: Props) => {
  const {colors} = useTheme();
  const {onPress, item, onCheckItem} = props;
  return (
    <TouchableHighlight
      style={[
        styles.rowFront,
        {
          backgroundColor: colors.background,
          borderBottomColor: colors.text,
        },
      ]}
      underlayColor={colors.background}
      onPress={() => onPress && onPress(item)}>
      <View style={styles.frontRow}>
        <CheckCircle
          isChecked={item.status === ItemStatus.DONE}
          onPress={() => onCheckItem(item)}
        />
        <View>
          <Typography title bold>
            {item.title}
          </Typography>
          <Typography style={styles.date} bold>
            {item.updatedDate}
          </Typography>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default ItemRow;

const styles = StyleSheet.create({
  rowFront: {
    padding: 18,
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  frontRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  date: {
    marginTop: 10,
  },
});

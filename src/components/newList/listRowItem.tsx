import {StyleSheet, TouchableHighlight, View} from 'react-native';
import React from 'react';
import Icon from '../common/icon';
import {ListTitleIconColorsCodes} from '../../utils/enums/listTitleIconColors';
import Typography from '../common/typography';
import {useTheme} from '@react-navigation/native';
import {List} from '../../models/list.model';

type Props = {
  onPress: (item: List) => void;
  item: List;
};

const ListRowItem = (props: Props) => {
  const {colors} = useTheme();
  const {onPress, item} = props;
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
      onPress={() => onPress(item)}>
      <View style={styles.frontRow}>
        <View style={styles.row}>
          <Icon icon="List" color={ListTitleIconColorsCodes[item.icon]} />
          <Typography title bold style={styles.title}>
            {item.title}
          </Typography>
        </View>
        <View style={styles.row}>
          <Typography bold>{item.items?.length ?? 0}</Typography>
          <Icon icon="Right" color={colors.text} />
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default ListRowItem;

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
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: 10,
  },
});

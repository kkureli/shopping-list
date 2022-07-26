import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '@react-navigation/native';
import Typography from '../common/typography';
import Popover from 'react-native-popover-view';
import {RootState} from '../../redux/store';
import {useSelector} from 'react-redux';
import {FlatList} from '../common/flatList';
import Seperator from '../common/seperator';
import SelectableItemRow from '../common/selectableItemRow';
import Circle from '../common/circle';
import {List} from '../../models/list.model';
import {ListTitleIconColorsCodes} from '../../utils/enums/listTitleIconColors';
import Icon from '../common/icon';
import theme from '../../theme';

type Props = {
  selectedList: List;
  onSelectList: (list: List) => void;
  disabled?: boolean;
};

const ListSelection = (props: Props) => {
  const {colors} = useTheme();
  const {selectedList, onSelectList, disabled} = props;
  const lists = useSelector((state: RootState) => state.list.lists);
  const [showPopover, setShowPopover] = useState(false);

  const renderItem = ({item}: {item: List}) => {
    return (
      <SelectableItemRow
        style={styles.selectableItem}
        label={item.title}
        selectedKey={selectedList.id}
        value={item.id}
        renderLeft={() => {
          return (
            <Icon icon="List" color={ListTitleIconColorsCodes[item.icon]} />
          );
        }}
        onSelect={() => {
          onSelectList(item);
          setShowPopover(false);
        }}
      />
    );
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => setShowPopover(true)}
      style={[
        styles.container,
        {
          backgroundColor: colors.lightGrayBG,
        },
      ]}>
      <Typography bold>List</Typography>
      <Popover
        onRequestClose={() => setShowPopover(false)}
        isVisible={showPopover}
        popoverStyle={[
          styles.popover,
          {
            backgroundColor: colors.background,
          },
        ]}
        from={
          <View style={styles.row}>
            <Circle
              style={styles.circle}
              color={ListTitleIconColorsCodes[selectedList.icon]}
            />
            <Typography bold>{selectedList.title}</Typography>
            {!disabled && <Icon icon="Right" />}
          </View>
        }>
        <FlatList
          ItemSeparatorComponent={Seperator}
          data={lists}
          renderItem={renderItem}
        />
      </Popover>
    </TouchableOpacity>
  );
};

export default ListSelection;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    width: '95%',
    borderRadius: theme.SIZES.cardBorderRadius,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  popover: {
    width: 150,
    minHeight: 100,
  },
  circle: {
    width: 16,
    height: 16,
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectableItem: {marginVertical: 10},
});

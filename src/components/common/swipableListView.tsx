import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SwipeListView} from 'react-native-swipe-list-view';
import {useTheme} from '@react-navigation/native';

import Icon from './icon';

type Props = {
  renderFrontItem: ({item}: {item: any}) => JSX.Element;
  renderBackItem?: () => JSX.Element;
  handleInfo?: (item: any) => void;
  handleDelete?: (item: any) => void;
  lists: any[];
  swipeListViewRef?: any;
};
const hiddenButtonWidth = 75;
const openWidth = hiddenButtonWidth * 2;

const SwipableListView = (props: Props) => {
  const {colors} = useTheme();
  const {
    renderFrontItem,
    renderBackItem,
    handleInfo,
    handleDelete,
    lists,
    swipeListViewRef,
  } = props;

  const renderHiddenItem = ({item}: {item: any}) => {
    return renderBackItem ? (
      renderBackItem()
    ) : (
      <View
        style={[
          styles.rowBack,
          {
            backgroundColor: colors.background,
          },
        ]}>
        <TouchableOpacity
          style={[
            styles.backRightBtn,
            styles.infoBtn,
            {backgroundColor: colors.info},
          ]}
          onPress={() => handleInfo && handleInfo(item)}>
          <Icon icon="Info" color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.backRightBtn,
            styles.dangerBtn,
            {backgroundColor: colors.error},
          ]}
          onPress={() => handleDelete && handleDelete(item)}>
          <Icon icon="Trash" color="white" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SwipeListView
      ref={swipeListViewRef}
      data={lists}
      renderItem={renderFrontItem}
      keyExtractor={item => item.id}
      renderHiddenItem={renderHiddenItem}
      disableRightSwipe={true}
      rightOpenValue={-openWidth}
      stopRightSwipe={-openWidth}
    />
  );
};

export default SwipableListView;

const styles = StyleSheet.create({
  rowBack: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',

    flexDirection: 'row',
    paddingHorizontal: 18,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  infoBtn: {
    right: 75,
  },
  dangerBtn: {
    right: 0,
  },
});

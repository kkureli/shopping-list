import {Alert} from 'react-native';
import React, {useRef} from 'react';
import {ItemsListProps} from '../../utils/types/routes';
import Empty from '../../components/common/empty';
import {useTranslation} from 'react-i18next';
import {Item} from '../../models/item.model';
import {useDispatch, useSelector} from 'react-redux';
import {onDeleteItem, onItemStatusChange} from '../../redux/listSlice';
import SwipableListView from '../../components/common/swipableListView';
import ItemRow from '../../components/newItem/itemRow';
import {RootState} from '../../redux/store';
import NewItemBottomSheet from '../newItem/newItem';
import Footer from '../../components/common/footer';
import {RBSheetType} from '../../utils/types/bottomSheet';
import {
  clearSelectedItem,
  setSelectedItem,
} from '../../redux/selectedItemSlice';

const ItemsList = (props: ItemsListProps) => {
  const {selectedList} = props;
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const itemsList = useSelector((state: RootState) => state.list.lists)?.find(
    list => list.id === selectedList.id,
  )?.items;
  const refRBSheetItem = useRef<RBSheetType>();
  const swipeListViewRef = useRef<any>();

  const handleDelete = (item: Item) => {
    swipeListViewRef?.current?.closeAllOpenRows();

    Alert.alert(t('common.warning'), t('common.delete-item-message'), [
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: () =>
          dispatch(
            onDeleteItem({
              item: {id: item.id},
              list: {id: selectedList.id},
            }),
          ),
      },
      {
        text: t('common.cancel'),
        style: 'cancel',
      },
    ]);
  };

  const handleInfo = (item: Item) => {
    swipeListViewRef?.current?.closeAllOpenRows();

    dispatch(setSelectedItem(item));
    refRBSheetItem?.current?.open();
  };

  const onCheckItem = (item: Item) => {
    dispatch(
      onItemStatusChange({
        item: {
          id: item.id,
        },
        list: {
          id: selectedList.id,
        },
      }),
    );
  };

  const onNewItemPress = () => {
    dispatch(clearSelectedItem());
    swipeListViewRef?.current?.closeAllOpenRows();
    refRBSheetItem.current?.open();
  };

  const renderItem = ({item}: {item: Item}) => (
    <ItemRow item={item} key={item.id} onCheckItem={() => onCheckItem(item)} />
  );

  return (
    <>
      <SwipableListView
        ListEmptyComponent={() => (
          <Empty message={t('common.no-item-message')} />
        )}
        swipeListViewRef={swipeListViewRef}
        renderFrontItem={renderItem}
        lists={itemsList ?? []}
        handleDelete={handleDelete}
        handleInfo={handleInfo}
      />
      <NewItemBottomSheet sheetRef={refRBSheetItem} />
      <Footer onNewItemPress={onNewItemPress} canAddList={false} />
    </>
  );
};

export default ItemsList;

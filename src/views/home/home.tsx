import {Alert} from 'react-native';
import React, {useMemo, useRef, useState} from 'react';
import {AppDispatch, RootState} from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {List} from '../../models/list.model';
import Empty from '../../components/common/empty';
import {useTranslation} from 'react-i18next';
import SwipableListView from '../../components/common/swipableListView';
import ListRowItem from '../../components/newList/listRowItem';
import {ScreenNames} from '../../navigation/screens';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../../utils/types/routes';
import NewListBottomSheet from '../newList/newList';
import {RBSheetType} from '../../utils/types/bottomSheet';
import {
  clearSelectedItem,
  clearSelectedList,
  setSelectedList,
} from '../../redux/selectedItemSlice';
import Footer from '../../components/common/footer';
import NewItemBottomSheet from '../newItem/newItem';
import SearchInput from '../../components/common/searchInput';
import {deleteListThunk, getListsThunk} from '../../redux/thunks';

const Home = () => {
  const {t} = useTranslation();
  const lists = useSelector((state: RootState) => state.list.lists);
  const dispatch = useDispatch<AppDispatch>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();
  const refRBSheetList = useRef<RBSheetType>();
  const refRBSheetItem = useRef<RBSheetType>();
  const swipeListViewRef = useRef<any>();

  const [searchInput, setSearchInput] = useState('');
  const [debounceResult, setDebounceResult] = useState('');

  const handleChangeDebounce = (value: string) => {
    setDebounceResult(value);
  };

  React.useEffect(() => {
    //TODO: splash'e ekle
    dispatch(getListsThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchResultsLists: List[] = useMemo(() => {
    if (searchInput) {
      return lists.filter(list =>
        list.title
          .toLocaleLowerCase()
          .includes(searchInput.toLocaleLowerCase()),
      );
    } else {
      return lists;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceResult, lists]);

  const onNewListPress = () => {
    swipeListViewRef?.current?.closeAllOpenRows();
    refRBSheetList.current?.open();
    dispatch(clearSelectedList());
  };

  const onNewItemPress = () => {
    swipeListViewRef?.current?.closeAllOpenRows();
    dispatch(clearSelectedItem());
    refRBSheetItem.current?.open();
  };

  const handleDelete = (item: List) => {
    swipeListViewRef?.current?.closeAllOpenRows();

    Alert.alert(t('common.warning'), t('common.delete-list-message'), [
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: () =>
          dispatch(
            deleteListThunk({
              id: item.id,
            }),
          ),
      },
      {
        text: t('common.cancel'),
        style: 'cancel',
      },
    ]);
  };

  const handleInfo = (item: List) => {
    swipeListViewRef?.current?.closeAllOpenRows();

    dispatch(setSelectedList(item));
    refRBSheetList?.current?.open();
  };

  const onItemPress = (item: List) => {
    dispatch(setSelectedList(item));
    navigation.navigate(ScreenNames.ITEMS_LIST, {
      selectedList: item,
    });
  };

  const renderItem = ({item}: {item: List}) => (
    <ListRowItem item={item} onPress={onItemPress} key={item.id} />
  );

  return (
    <>
      <SearchInput
        onChangeText={setSearchInput}
        value={searchInput}
        handleChangeDebounce={handleChangeDebounce}
      />
      <SwipableListView
        // ListHeaderComponent={() => }
        ListEmptyComponent={() => (
          <Empty message={t('common.no-list-message')} />
        )}
        swipeListViewRef={swipeListViewRef}
        renderFrontItem={renderItem}
        lists={searchResultsLists}
        handleDelete={handleDelete}
        handleInfo={handleInfo}
      />

      <NewItemBottomSheet sheetRef={refRBSheetItem} />
      <NewListBottomSheet sheetRef={refRBSheetList} />
      <Footer
        canAddNewItem={lists.length === 0 ? false : true}
        onNewItemPress={onNewItemPress}
        canAddList={true}
        onNewListPress={onNewListPress}
      />
    </>
  );
};

export default Home;

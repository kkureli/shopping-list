import {View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomBottomSheet from '../../components/common/customBottomSheet';
import NewItemBottomSheetHeader from '../../components/newItem/header';
import TextInput from '../../components/common/textInput';
import {useTranslation} from 'react-i18next';
import {CustomBottomSheetProps} from '../../utils/types/custombottomSheet';
import {onAddItemPayloadType} from '../../redux/types';
import {onAddItem, onUpdateItem} from '../../redux/listSlice';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {clearSelectedItem} from '../../redux/selectedItemSlice';
import {List} from '../../models/list.model';
import ListSelection from '../../components/newItem/listSelection';

type Props = Pick<CustomBottomSheetProps, 'sheetRef'>;

const NewItemBottomSheet = (props: Props) => {
  const {sheetRef} = props;
  const [input, setInput] = useState('');
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const selectedItem = useSelector(
    (state: RootState) => state.selections.selectedItem,
  );

  const selectedList = useSelector(
    (state: RootState) => state.selections.selectedList,
  );
  const lists = useSelector((state: RootState) => state.list.lists);
  const [list, setList] = useState<List>(lists[0]);

  useEffect(() => {
    if (selectedItem) {
      setInput(selectedItem.title);
    } else {
      setInput('');
    }
  }, [selectedItem]);

  useEffect(() => {
    if (selectedList) {
      setList(selectedList);
    } else {
      setList(lists[0]);
    }
  }, [selectedList, lists]);

  const onAddPress = () => {
    if (selectedItem) {
      dispatch(
        onUpdateItem({
          item: {
            id: selectedItem?.id,
            title: input,
          },
          list: {
            id: list.id,
          },
        }),
      );
    } else {
      const newItem: onAddItemPayloadType = {
        item: {
          title: input,
        },
        list: {
          id: list?.id,
        },
      };
      dispatch(onAddItem(newItem));
    }

    closeBottomSheet();
  };

  const closeBottomSheet = () => {
    sheetRef?.current.close();
    setInput('');
    dispatch(clearSelectedItem());
  };

  const onCloseSheet = () => {
    setInput('');
    dispatch(clearSelectedItem());
  };

  const renderContent = () => {
    return (
      <View style={styles.contentContainer}>
        <TextInput
          style={styles.input}
          placeholder={t('common.title')}
          value={input}
          onChangeText={setInput}
          autoFocus
        />

        <ListSelection
          disabled={selectedItem ? true : false}
          onSelectList={(newSelectedList: List) => {
            setList(newSelectedList);
          }}
          selectedList={list}
        />
      </View>
    );
  };

  return (
    <CustomBottomSheet
      onClose={onCloseSheet}
      renderHeader={() => (
        <NewItemBottomSheetHeader
          isUpdate={selectedItem ? true : false}
          onAddPress={onAddPress}
          title={selectedItem ? t('common.update-item') : t('common.new-item')}
          isAddDisabled={!input}
          onCancelPress={closeBottomSheet}
        />
      )}
      sheetRef={sheetRef}
      renderContent={renderContent}
    />
  );
};

export default NewItemBottomSheet;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    marginTop: 20,
  },
});

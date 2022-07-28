import {View, StyleSheet} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import CustomBottomSheet from '../../components/common/customBottomSheet';
import NewItemBottomSheetHeader from '../../components/newItem/header';
import TextInput from '../../components/common/textInput';
import {useTranslation} from 'react-i18next';
import {CustomBottomSheetProps} from '../../utils/types/custombottomSheet';
import {onAddItemPayloadType} from '../../redux/types';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store';
import {clearSelectedItem} from '../../redux/selectedItemSlice';
import {List} from '../../models/list.model';
import ListSelection from '../../components/newItem/listSelection';
import Dropdown, {SelectItemType} from '../../components/common/dropdown';
import {Item} from '../../models/item.model';
import {addItemThunk, updateItemThunk} from '../../redux/thunks';

type Props = Pick<CustomBottomSheetProps, 'sheetRef'>;

const NewItemBottomSheet = (props: Props) => {
  const {sheetRef} = props;
  const [input, setInput] = useState('');
  const {t} = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const selectedItem = useSelector(
    (state: RootState) => state.selections.selectedItem,
  );

  const selectedList = useSelector(
    (state: RootState) => state.selections.selectedList,
  );
  const lists = useSelector((state: RootState) => state.list.lists);
  const [list, setList] = useState<List>(lists[0]);

  const [debounceResult, setDebounceResult] = useState('');

  const handleChangeDebounce = (value: string) => {
    setDebounceResult(value);
  };

  const searchResultsLists = useMemo(() => {
    if (input) {
      const items: Item[] = [];
      lists.filter(listItem => {
        if (listItem.items?.length > 0) {
          listItem.items.map(e => items.push(e));
        }
      });

      const filteredWords = items
        .filter(item => {
          return item.title
            .toLocaleLowerCase()
            .includes(input.toLocaleLowerCase());
        })
        .map((item): SelectItemType => {
          return {
            label: item.title,
            value: item.title,
          };
        });
      const unique = [
        ...new Map(
          filteredWords.map((item: any, key) => [item[key], item]),
        ).values(),
      ];

      return unique;
    } else {
      return [];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceResult, lists]);

  const onSelectWord = (selected: SelectItemType) => {
    const selectedWord = selected.value;

    const lastIndex = input.lastIndexOf(' ');

    const lastWordRemovedInput = input.substring(0, lastIndex);
    let updatedInput = '';
    if (lastWordRemovedInput) {
      updatedInput = `${input} ${selectedWord}`;
    } else {
      updatedInput = `${selectedWord}`;
    }
    setInput(updatedInput);
  };
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
        updateItemThunk({
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
      dispatch(addItemThunk(newItem));
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
          handleChangeDebounce={handleChangeDebounce}
          style={styles.input}
          placeholder={t('common.title')}
          value={input}
          onChangeText={setInput}
          autoFocus
        />
        {searchResultsLists?.length > 0 && (
          <Dropdown data={searchResultsLists} onSelect={onSelectWord} />
        )}
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

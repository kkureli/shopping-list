import {View, StyleSheet} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import CustomBottomSheet from '../../components/common/customBottomSheet';
import NewItemBottomSheetHeader from '../../components/newItem/header';
import TextInput from '../../components/common/textInput';
import {useTranslation} from 'react-i18next';
import {CustomBottomSheetProps} from '../../utils/types/custombottomSheet';
import TitleIconColorSelection from '../../components/newList/titleIconColorSelection';
import Icon from '../../components/common/icon';
import {
  ListTitleIconColorsOptions,
  ListTitleIconColorsCodes,
} from '../../utils/enums/listTitleIconColors';
import {useTheme} from '@react-navigation/native';
import theme from '../../theme';
import {useDispatch, useSelector} from 'react-redux';
import {onAddListType} from '../../redux/types';
import {AppDispatch, RootState} from '../../redux/store';
import {clearSelectedList} from '../../redux/selectedItemSlice';
import Dropdown, {SelectItemType} from '../../components/common/dropdown';
import {List} from '../../models/list.model';
import {addListThunk, updateListThunk} from '../../redux/thunks';

type Props = Pick<CustomBottomSheetProps, 'sheetRef' | 'onClose'>;

const NewListBottomSheet = (props: Props) => {
  const {sheetRef, onClose} = props;
  const [input, setInput] = useState('');
  const [selectedColor, setSelectedColor] =
    useState<ListTitleIconColorsOptions>(ListTitleIconColorsOptions.Red);
  const {t} = useTranslation();
  const {colors} = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  const selectedList = useSelector(
    (state: RootState) => state.selections.selectedList,
  );
  const lists = useSelector((state: RootState) => state.list.lists);

  const [debounceResult, setDebounceResult] = useState('');

  const handleChangeDebounce = (value: string) => {
    setDebounceResult(value);
  };

  const searchResultsLists = useMemo(() => {
    if (input) {
      const filteredWords = lists
        ?.filter((list: List) =>
          list.title.toLocaleLowerCase().includes(input.toLocaleLowerCase()),
        )
        ?.map((item: List): SelectItemType => {
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

  useEffect(() => {
    if (selectedList) {
      setInput(selectedList.title);
      setSelectedColor(selectedList.icon);
    } else {
      setInput('');
      setSelectedColor(ListTitleIconColorsOptions.Red);
    }
  }, [selectedList]);

  const onAddPress = () => {
    if (selectedList) {
      dispatch(
        updateListThunk({
          icon: selectedColor,
          id: selectedList.id,
          title: input,
        }),
      );
    } else {
      const newList: onAddListType = {
        icon: selectedColor,
        title: input,
      };
      dispatch(addListThunk(newList));
    }
    closeBottomSheet();
  };

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

  const renderContent = () => {
    return (
      <View style={styles.contentContainer}>
        <View
          style={[styles.topContainer, {backgroundColor: colors.lightGrayBG}]}>
          <Icon
            icon="List"
            width={124}
            height={124}
            color={ListTitleIconColorsCodes[selectedColor]}
          />
          <TextInput
            testID="NewListInput"
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
        </View>
        <TitleIconColorSelection
          containerStyle={styles.colorSelection}
          selectedColor={selectedColor}
          onSelect={setSelectedColor}
        />
      </View>
    );
  };

  const closeBottomSheet = () => {
    sheetRef?.current.close();
    setInput('');
    setSelectedColor(ListTitleIconColorsOptions.Red);
    dispatch(clearSelectedList());
    onClose && onClose();
  };

  const onCloseSheet = () => {
    setInput('');
    dispatch(clearSelectedList());
    onClose && onClose();
  };

  return (
    <CustomBottomSheet
      onClose={onCloseSheet}
      renderHeader={() => (
        <NewItemBottomSheetHeader
          onAddPress={onAddPress}
          isUpdate={selectedList ? true : false}
          title={
            selectedList ? t('common.new-list-update') : t('common.new-list')
          }
          isAddDisabled={!input}
          onCancelPress={closeBottomSheet}
        />
      )}
      sheetRef={sheetRef}
      renderContent={renderContent}
    />
  );
};

export default NewListBottomSheet;
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  topContainer: {
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: theme.SIZES.cardBorderRadius,
    paddingVertical: 10,
  },
  colorSelection: {marginTop: 20},
  input: {
    marginTop: 20,
  },
});

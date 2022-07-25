import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import CustomBottomSheet from '../../components/common/customBottomSheet';
import NewItemBottomSheetHeader from '../../components/newItem/header';
import TextInput from '../../components/common/textInput';
import {useTranslation} from 'react-i18next';
import {CustomBottomSheetProps} from '../../utils/types/custombottomSheet';
import TitleIconColorSelection from '../../components/common/newList/titleIconColorSelection';
import Icon from '../../components/common/icon';
import {
  ListTitleIconColorsOptions,
  ListTitleIconColorsCodes,
} from '../../utils/enums/listTitleIconColors';
import {useTheme} from '@react-navigation/native';
import theme from '../../theme';

type Props = Pick<CustomBottomSheetProps, 'sheetRef'>;

const NewListBottomSheet = (props: Props) => {
  const {sheetRef} = props;
  const [input, setInput] = useState('');
  const [selectedColor, setSelectedColor] =
    useState<ListTitleIconColorsOptions>(ListTitleIconColorsOptions.Red);
  const {t} = useTranslation();
  const {colors} = useTheme();

  const renderContent = () => {
    return (
      <>
        <View style={styles.contentContainer}>
          <View
            style={[
              styles.topContainer,
              {backgroundColor: colors.lightGrayBG},
            ]}>
            <Icon
              icon="List"
              width={124}
              height={124}
              color={ListTitleIconColorsCodes[selectedColor]}
            />
            <TextInput
              style={styles.input}
              placeholder={t('common.title')}
              value={input}
              onChangeText={setInput}
              autoFocus
            />
          </View>
          <TitleIconColorSelection
            containerStyle={styles.colorSelection}
            selectedColor={selectedColor}
            onSelect={setSelectedColor}
          />
        </View>
      </>
    );
  };

  const closeBottomSheet = () => {
    sheetRef?.current.close();
    setInput('');
  };

  return (
    <CustomBottomSheet
      onClose={() => setInput('')}
      renderHeader={() => (
        <NewItemBottomSheetHeader
          onAddPress={() => console.log('')}
          title={t('common.new-list')}
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

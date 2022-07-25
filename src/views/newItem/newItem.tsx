import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import CustomBottomSheet from '../../components/common/customBottomSheet';
import NewItemBottomSheetHeader from '../../components/newItem/header';
import TextInput from '../../components/common/textInput';
import {useTranslation} from 'react-i18next';
import {CustomBottomSheetProps} from '../../utils/types/custombottomSheet';

type Props = Pick<CustomBottomSheetProps, 'sheetRef'>;

const NewItemBottomSheet = (props: Props) => {
  const {sheetRef} = props;
  const [input, setInput] = useState('');
  const {t} = useTranslation();
  const renderContent = () => {
    return (
      <View style={styles.contentContainer}>
        <TextInput
          placeholder={t('common.title')}
          value={input}
          onChangeText={setInput}
          autoFocus
        />
      </View>
    );
  };

  return (
    <CustomBottomSheet
      renderHeader={() => (
        <NewItemBottomSheetHeader
          onAddPress={() => console.log('')}
          title={t('common.new-item')}
          isAddDisabled={!input}
          onCancelPress={() => sheetRef?.current.close()}
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
});

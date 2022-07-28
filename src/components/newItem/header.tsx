import {StyleSheet, View} from 'react-native';
import React from 'react';
import ActionButton from '../common/actionButton';
import {useTranslation} from 'react-i18next';
import Typography from '../common/typography';

type Props = {
  isAddDisabled?: boolean;
  onCancelPress: () => void;
  onAddPress: () => void;
  title?: string;
  isUpdate?: boolean;
};

const NewItemBottomSheetHeader = (props: Props) => {
  const {t} = useTranslation();

  const {isAddDisabled, onAddPress, onCancelPress, title, isUpdate} = props;
  return (
    <View style={styles.headerRow}>
      <ActionButton
        testID="Cancel"
        text={t('common.cancel')}
        onPress={onCancelPress}
      />
      <Typography center bold>
        {title}
      </Typography>
      <ActionButton
        testID="AddUpdate"
        disabled={isAddDisabled}
        text={isUpdate ? t('common.update') : t('common.add')}
        onPress={onAddPress}
      />
    </View>
  );
};

export default NewItemBottomSheetHeader;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

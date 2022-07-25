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
};

const NewItemBottomSheetHeader = (props: Props) => {
  const {t} = useTranslation();

  const {isAddDisabled, onAddPress, onCancelPress, title} = props;
  return (
    <View style={styles.headerRow}>
      <ActionButton text={t('common.cancel')} onPress={onCancelPress} />
      <Typography center bold>
        {title}
      </Typography>
      <ActionButton
        disabled={isAddDisabled}
        text={t('common.add')}
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
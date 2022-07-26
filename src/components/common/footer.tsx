import {SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import ActionButton from './actionButton';
import {FooterProps} from '../../utils/types/footer';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';

const Footer = (props: FooterProps) => {
  const {t} = useTranslation();
  const {
    onNewItemPress,
    onNewListPress,
    canAddList,
    canAddNewItem = true,
  } = props;
  const {colors} = useTheme();

  return (
    <SafeAreaView
      style={[
        {
          borderTopColor: colors.border,
          backgroundColor: colors.background,
        },
        styles.footer,
      ]}>
      <View style={styles.container}>
        {canAddNewItem && (
          <ActionButton
            icon="Plus"
            onPress={onNewItemPress}
            text={t('components.footer.new-item')}
          />
        )}
        {canAddList && onNewListPress && (
          <ActionButton
            onPress={onNewListPress}
            text={t('components.footer.new-list')}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    borderTopWidth: 1,
    height: 70,
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
});

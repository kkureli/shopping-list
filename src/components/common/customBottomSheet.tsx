import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useTheme} from '@react-navigation/native';
import Typography from './typography';
import {CustomBottomSheetProps} from '../../utils/types/custombottomSheet';
import theme from '../../theme';

const CustomBottomSheet = ({
  sheetRef,
  bottomSheetHeight = theme.SIZES.height - 90,
  renderHeader,
  containerStyle,
  renderContent,
  renderFooter,
  onClose,
  onOpen,
  title,
}: CustomBottomSheetProps) => {
  const {colors} = useTheme();
  return (
    <RBSheet
      closeOnDragDown={true}
      onOpen={onOpen}
      keyboardAvoidingViewEnabled={true}
      ref={sheetRef}
      height={bottomSheetHeight}
      openDuration={500}
      onClose={onClose}
      customStyles={{
        container: {
          paddingTop: 20,
          paddingHorizontal: 10,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          backgroundColor: colors.background,
          ...containerStyle,
        },
      }}>
      {renderHeader && renderHeader()}
      {title && (
        <Typography center bold>
          {title}
        </Typography>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.paddingBottom48]}>
        {renderContent()}
      </ScrollView>
      {renderFooter ? (
        <View style={styles.footerCommon}>{renderFooter()}</View>
      ) : null}
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  footerCommon: {
    marginBottom: 24,
    paddingTop: 24,
  },

  paddingBottom48: {
    paddingBottom: 48,
  },
});

export default CustomBottomSheet;

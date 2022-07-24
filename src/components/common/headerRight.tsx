import {StyleSheet, View} from 'react-native';
import React from 'react';

import ThemeSelect from './themeSelect';
import LanguageSelect from './languageSelect';

const HeaderRight = () => {
  return (
    <View style={styles.container}>
      <ThemeSelect style={styles.theme} />
      <LanguageSelect />
    </View>
  );
};

export default HeaderRight;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  theme: {
    marginRight: 15,
  },
});

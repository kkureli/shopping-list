import {StyleSheet, TextInputProps, TextInput as RNInput} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import theme from '../../theme';

const TextInput = (props: TextInputProps) => {
  const {colors} = useTheme();
  const {onChangeText, value, placeholder, style, ...rest} = props;
  return (
    <RNInput
      returnKeyType="done"
      placeholderTextColor={colors.text}
      selectionColor={colors.primary}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      clearButtonMode="while-editing"
      style={[
        styles.input,
        {
          color: colors.primary,
          backgroundColor: colors.inputContainer,
          borderColor: colors.gray,
        },
        style,
      ]}
      {...rest}
    />
  );
};

export default TextInput;

const styles = StyleSheet.create({
  input: {
    borderRadius: theme.SIZES.cardBorderRadius,
    height: 50,
    paddingHorizontal: 10,
    width: '95%',

    borderWidth: 1,
  },
});

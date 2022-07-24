import {Pressable} from 'react-native';
import React from 'react';
import {ThemeMode} from '../../utils/enums/theme';
import {setTheme} from '../../redux/themeSlice';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {hitSlop} from '../../theme/theme';
import Icon from './icon';
import {useTheme} from '@react-navigation/native';
import {ThemeSelectProps} from '../../utils/types/themeSelect';

const ThemeSelect = (props: ThemeSelectProps) => {
  const {style} = props;
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch();
  const {colors} = useTheme();

  return (
    <Pressable
      style={style}
      hitSlop={hitSlop}
      onPress={() => dispatch(setTheme())}>
      {themeMode === ThemeMode.DARK ? (
        <Icon color={colors.sunshine} icon="Sun" width={24} height={24} />
      ) : (
        <Icon icon="Moon" width={24} height={24} />
      )}
    </Pressable>
  );
};

export default ThemeSelect;

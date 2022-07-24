import {DefaultTheme} from '@react-navigation/native';
import {ExtendedTheme} from '../utils/types/theme';

const DarkTheme: ExtendedTheme = {
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    text: 'white',
    black: 'rgb(0, 0, 0)',
    white: 'rgb(256, 256,256)',
    gray: 'rgb(192,192,192)',
    background: 'rgb(32,32,32)',
    primary: 'rgb(13,114,228)',
    secondary: 'red',
    border: 'rgb(199, 199, 204)',
    error: 'rgb(255,51,51)',
    info: 'rgbrgb(91, 192, 222)',
    success: 'rgb(92, 184, 92)',
    warning: 'rgb(240, 173, 78)',
    sunshine: 'rgb(244, 215, 114)',
  },
};

export default DarkTheme;

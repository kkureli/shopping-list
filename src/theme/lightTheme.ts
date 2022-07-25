import {DefaultTheme} from '@react-navigation/native';
import {ExtendedTheme} from '../utils/types/theme';

const LightTheme: ExtendedTheme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    text: 'black',
    background: 'rgb(240,240,247)',
    inputContainer: 'white',
    black: 'rgb(0, 0, 0)',
    white: 'rgb(256, 256,256)',
    primary: 'rgb(13,114,228)',
    secondary: 'rgb(98,105,113)',
    border: 'rgb(199, 199, 204)',
    error: 'rgb(255,51,51)',
    info: 'rgb(91, 192, 222)',
    success: 'rgb(92, 184, 92)',
    warning: 'rgb(240, 173, 78)',
    sunshine: 'rgb(244, 215, 114)',
    lightGrayBG: 'rgb(192, 192, 192)',
    gray: 'rgb(192, 192, 192)',
    select: 'rgb(98,105,113)',
  },
};

export default LightTheme;

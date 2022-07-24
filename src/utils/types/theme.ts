import {Theme} from '@react-navigation/native';

export interface ExtendedTheme extends Theme {
  colors: Theme['colors'] & CustomThemeColorType;
}

export type CustomThemeColorType = {
  [K in ThemeColors]: string;
};

export type ThemeColors =
  | 'text'
  | 'black'
  | 'white'
  | 'gray'
  | 'error'
  | 'background'
  | 'primary'
  | 'secondary'
  | 'warning'
  | 'success'
  | 'info'
  | 'border';

declare module '@react-navigation/native' {
  export function useTheme(): ExtendedTheme;
}

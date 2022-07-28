import {ImageSourcePropType} from 'react-native';
import {LanguagesLabels, LanguagesValues} from '../enums/language';

export type LanguageType = {
  label: LanguagesLabels;
  img: ImageSourcePropType;
  value: typeof LanguagesValues[keyof typeof LanguagesValues];
};

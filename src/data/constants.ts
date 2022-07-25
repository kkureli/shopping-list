import {LanguagesLabels, LanguagesValues} from '../utils/enums/language';
import {
  ListTitleIconColorsCodes,
  ListTitleIconColorsOptions,
} from '../utils/enums/listTitleIconColors';
import {LanguageType} from '../utils/types/language';
import {ListTitleIconColorType} from '../utils/types/listTitleIconColor';

const usaFlag = require('../assets/images/countries/usa.png');
const trFlag = require('../assets/images/countries/turkey.png');
const estFlag = require('../assets/images/countries/estonia.png');

export const appLanguages: LanguageType[] = [
  {
    label: LanguagesLabels.USA,
    img: usaFlag,
    value: LanguagesValues.USA,
  },
  {
    label: LanguagesLabels.EST,
    img: estFlag,
    value: LanguagesValues.EST,
  },
  {
    label: LanguagesLabels.TR,
    img: trFlag,
    value: LanguagesValues.TR,
  },
];

export const listTitleIconColors: ListTitleIconColorType[] = [
  {
    name: ListTitleIconColorsOptions.Red,
    rgb: ListTitleIconColorsCodes.Red,
  },
  {
    name: ListTitleIconColorsOptions.Orange,
    rgb: ListTitleIconColorsCodes.Orange,
  },
  {
    name: ListTitleIconColorsOptions.Yellow,
    rgb: ListTitleIconColorsCodes.Yellow,
  },
  {
    name: ListTitleIconColorsOptions.Green,
    rgb: ListTitleIconColorsCodes.Green,
  },
  {
    name: ListTitleIconColorsOptions.Blue,
    rgb: ListTitleIconColorsCodes.Blue,
  },
  {
    name: ListTitleIconColorsOptions.Purple,
    rgb: ListTitleIconColorsCodes.Purple,
  },
  {
    name: ListTitleIconColorsOptions.Brown,
    rgb: ListTitleIconColorsCodes.Brown,
  },
];

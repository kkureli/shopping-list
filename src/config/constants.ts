import {LanguageType} from '../utils/types/language';

const usaFlag = require('../assets/images/countries/usa.png');
const trFlag = require('../assets/images/countries/turkey.png');
const estFlag = require('../assets/images/countries/estonia.png');

export const appLanguages: LanguageType[] = [
  {
    label: 'USA',
    img: usaFlag,
    value: 'en',
  },
  {
    label: 'EST',
    img: estFlag,
    value: 'est',
  },
  {
    label: 'TR',
    img: trFlag,
    value: 'tr',
  },
];

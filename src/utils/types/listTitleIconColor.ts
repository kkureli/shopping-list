import {
  ListTitleIconColorsCodes,
  ListTitleIconColorsOptions,
} from '../enums/listTitleIconColors';

type Keys = keyof typeof ListTitleIconColorsCodes;

export type ListTitleIconColor = typeof ListTitleIconColorsCodes[Keys];

export type ListTitleIconColorType = {
  name: ListTitleIconColorsOptions;
  rgb: ListTitleIconColor;
};

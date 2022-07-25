export enum ListTitleIconColorsOptions {
  Red = 'Red',
  Orange = 'Orange',
  Yellow = 'Yellow',
  Green = 'Green',
  Blue = 'Blue',
  Purple = 'Purple',
  Brown = 'Brown',
}

export const ListTitleIconColorsCodes = {
  [ListTitleIconColorsOptions.Red]: 'rgb(235,85,69)',
  [ListTitleIconColorsOptions.Orange]: 'rgb(242,164,60)',
  [ListTitleIconColorsOptions.Yellow]: 'rgb(249,215,74)',
  [ListTitleIconColorsOptions.Green]: 'rgb(105,206,105)',
  [ListTitleIconColorsOptions.Blue]: 'rgb(59,130,246)',
  [ListTitleIconColorsOptions.Purple]: 'rgb(200,131,238)',
  [ListTitleIconColorsOptions.Brown]: 'rgb(195,166,122)',
} as const;

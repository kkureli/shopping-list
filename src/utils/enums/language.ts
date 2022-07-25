export enum LanguagesLabels {
  USA = 'USA',
  EST = 'EST',
  TR = 'TR',
}

export const LanguagesValues = {
  [LanguagesLabels.USA]: 'en',
  [LanguagesLabels.EST]: 'est',
  [LanguagesLabels.TR]: 'tr',
} as const;

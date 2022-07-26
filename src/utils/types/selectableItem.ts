import {ImageSourcePropType, ViewStyle} from 'react-native';
import {IconTypes} from './icon';

export type SelectableItemProps = {
  onSelect: (key: string) => void;
  label?: string;
  icon?: IconTypes;
  img?: ImageSourcePropType;
  value: string;
  selectedKey?: string;
  renderLeft?: () => JSX.Element;
  style?: ViewStyle;
};

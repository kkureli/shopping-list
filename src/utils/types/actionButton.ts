import {IconTypes} from './icon';

export type ActionButtonProps = {
  text: string;
  icon?: IconTypes;
  onPress: () => void;
  disabled?: boolean;
};

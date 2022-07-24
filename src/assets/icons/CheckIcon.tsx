import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const CheckIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <Path d="M20 6 9 17l-5-5" />
  </Svg>
);

export default CheckIcon;

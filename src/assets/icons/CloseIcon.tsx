import * as React from 'react';
import Svg, {SvgProps, Circle, Path} from 'react-native-svg';

const CloseIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <Circle cx={12} cy={12} r={10} />
    <Path d="m15 9-6 6M9 9l6 6" />
  </Svg>
);

export default CloseIcon;

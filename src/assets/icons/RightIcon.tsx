import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function RightIcon(props: SvgProps) {
  return (
    <Svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}>
      <Path d="M9 18l6-6-6-6" />
    </Svg>
  );
}

export default RightIcon;

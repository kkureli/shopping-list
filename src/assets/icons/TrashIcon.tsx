import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function TrashIcon(props: SvgProps) {
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
      <Path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
    </Svg>
  );
}

export default TrashIcon;

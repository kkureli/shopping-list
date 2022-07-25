import {ReactNode} from 'react';

export type CustomBottomSheetProps = {
  sheetRef: any;
  bottomSheetHeight?: number;
  renderHeader?: () => ReactNode;
  containerStyle?: any;
  renderContent: () => ReactNode;
  renderFooter?: () => ReactNode;
  onClose?: () => void;
  onOpen?: () => void;
  title?: string;
};

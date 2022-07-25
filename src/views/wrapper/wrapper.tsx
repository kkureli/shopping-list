import React, {ReactNode, useRef, useState} from 'react';
import Footer from '../../components/common/footer';
import {RBSheetType} from '../../utils/types/bottomSheet';
import {NewItemBottomSheet} from '..';
import {NewListBottomSheet} from '..';
import {navigationRef} from '../../navigation/rootNavigation';
import {ScreenNames} from '../../navigation/screens';

type Props = {
  children?: ReactNode;
};

const Wrapper = (props: Props) => {
  const {children} = props;
  const refRBSheetItem = useRef<RBSheetType>();
  const refRBSheetList = useRef<RBSheetType>();
  const [currentRouteName, setCurrentRouteName] = useState<string>('');

  React.useEffect(() => {
    if (navigationRef.current?.isReady()) {
      const name = navigationRef?.current?.getCurrentRoute()?.name;
      if (name) {
        setCurrentRouteName(name);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigationRef.current]);

  return (
    <>
      {children}
      <NewItemBottomSheet sheetRef={refRBSheetItem} />
      <NewListBottomSheet sheetRef={refRBSheetList} />
      <Footer
        onNewItemPress={() => refRBSheetItem.current?.open()}
        canAddList={currentRouteName === ScreenNames.HOME}
        onNewListPress={() => refRBSheetList.current?.open()}
      />
    </>
  );
};

export default Wrapper;

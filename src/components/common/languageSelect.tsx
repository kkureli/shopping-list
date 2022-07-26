import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Popover from 'react-native-popover-view';
import {appLanguages} from '../../data/constants';
import Icon from './icon';
import SelectableItemRow from './selectableItemRow';
import {LanguageType} from '../../utils/types/language';
import Seperator from './seperator';
import {FlatList} from './flatList';
import {useTranslation} from 'react-i18next';
import {getCurrentLanguage} from '../../localization/i18n.config';

const LanguageSelect = () => {
  const {i18n} = useTranslation();
  const [showPopover, setShowPopover] = useState(false);

  const onSelectLanguage = (key: string) => {
    setShowPopover(false);
    i18n.changeLanguage(key);
  };

  const renderItem = ({item}: {item: LanguageType}) => {
    return (
      <SelectableItemRow
        {...item}
        selectedKey={getCurrentLanguage()}
        onSelect={() => onSelectLanguage(item.value)}
      />
    );
  };

  return (
    <Popover
      onRequestClose={() => setShowPopover(false)}
      isVisible={showPopover}
      popoverStyle={styles.popover}
      from={
        <TouchableOpacity onPress={() => setShowPopover(true)}>
          <Icon icon="Globe" />
        </TouchableOpacity>
      }>
      <FlatList
        ItemSeparatorComponent={Seperator}
        data={appLanguages}
        renderItem={renderItem}
      />
    </Popover>
  );
};

export default LanguageSelect;

const styles = StyleSheet.create({
  popover: {
    width: 100,
  },
});

/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {useTranslation} from 'react-i18next';
import {CustomModal} from '../components/CustomModal';
import {ILocale, LocaleContext} from '../context/locales';
import {ListItem} from '@rneui/themed';
import {ModalsContext} from '../context/modals';
import {AppModals} from '../constants/modals';

type Props = {};

export const LocalesModal: React.FC<Props> = ({}) => {
  const {setOpenModal} = useContext(ModalsContext);
  const {locales, changeLocale} = useContext(LocaleContext);
  const {t} = useTranslation();

  // render
  const renderItem = useCallback(
    ({item}: {item: ILocale}): React.JSX.Element => (
      <View style={{width: '100%'}}>
        <ListItem
          onPress={() => {
            changeLocale(item.id);
            setOpenModal(AppModals.Locales, false);
          }}>
          <ListItem.Content>
            <ListItem.Title>{t(`general.${item.label_id}`)}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </View>
    ),
    [t, changeLocale, setOpenModal],
  );

  return (
    <CustomModal name={AppModals.Locales} height="30%">
      <View style={{height: 20}} />
      <BottomSheetFlatList
        data={locales}
        keyExtractor={i => i.id}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainer}
      />
      <View style={{height: 35}} />
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  contentContainer: {
    flex: 1,
  },
});

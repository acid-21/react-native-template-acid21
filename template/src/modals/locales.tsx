/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useContext} from 'react';
import {View} from 'react-native';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {useTranslation} from 'react-i18next';
import {CustomModal} from '../components/CustomModal';
import {ILocale, LocaleContext} from '../context/locales';
import {List, Text} from 'react-native-paper';
import {ModalsContext} from '../context/modals';
import {AppModals} from '../constants/modals';
import {useTheme} from '@react-navigation/native';

type Props = {};

export const LocalesModal: React.FC<Props> = ({}) => {
  const {setOpenModal} = useContext(ModalsContext);
  const {locales, changeLocale} = useContext(LocaleContext);
  const {t} = useTranslation();
  const {colors} = useTheme();

  // render
  const renderItem = useCallback(
    ({item}: {item: ILocale}): React.JSX.Element => (
      <View style={{width: '100%'}}>
        <List.Item
          onPress={() => {
            changeLocale(item.id);
            setOpenModal(AppModals.Locales, false);
          }}
          title={
            <Text variant="titleLarge" style={{color: colors.text}}>
              {t(`general.${item.label_id}`)}
            </Text>
          }
        />
      </View>
    ),
    [colors.text, t, changeLocale, setOpenModal],
  );

  return (
    <CustomModal name={AppModals.Locales} height="30%">
      <View style={{height: 20}} />
      <BottomSheetFlatList
        data={locales}
        keyExtractor={i => i.id}
        renderItem={renderItem}
        contentContainerStyle={{
          flex: 1,
        }}
      />
      <View style={{height: 35}} />
    </CustomModal>
  );
};

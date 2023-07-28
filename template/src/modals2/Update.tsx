/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View} from 'react-native';
import {CustomModal} from '../components/CustomModal';
import {ModalsContext} from '../context/modals';
import {AppModals} from '../constants/modals';
import {Text, useTheme} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {Button} from 'react-native-paper';
import {UpdateContext} from '../context/update';

type Props = {};

export const UpdateModal: React.FC<Props> = ({}) => {
  const theme = useTheme();
  const {setOpenModal} = useContext(ModalsContext);
  const {t} = useTranslation();
  const {runUpdate} = useContext(UpdateContext);

  return (
    <CustomModal name={AppModals.UpdateModal} height="30%">
      <View style={{height: 20}} />
      <View style={{alignItems: 'center'}}>
        <Text variant="headlineMedium" style={{color: theme.colors.onSurface}}>
          {t('modals.update.title')}
        </Text>
        <View style={{height: 20}} />

        <Button
          mode="contained"
          buttonColor={theme.colors.onSurfaceDisabled}
          onPress={() => {
            setOpenModal(AppModals.UpdateModal, false);
          }}>
          {t('modals.update.update_later')}
        </Button>
        <View style={{height: 15}} />
        <Button
          mode="contained"
          onPress={runUpdate}
          buttonColor={theme.colors.primary}>
          {t('modals.update.update')}
        </Button>
        <View style={{height: 10}} />
      </View>

      <View style={{height: 35}} />
    </CustomModal>
  );
};

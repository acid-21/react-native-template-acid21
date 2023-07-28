/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {View} from 'react-native';
import {CustomModal} from '../components/CustomModal';
import {ModalsContext} from '../context/modals';
import {AppModals} from '../constants/modals';
import {TextInput} from 'react-native-paper';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import {Title} from '../components/Title';

type Props = {};

export const EnvironmentPinModal: React.FC<Props> = ({}) => {
  const [showPassword, setShowPassword] = useState(false);

  const {setOpenModal} = useContext(ModalsContext);
  const {t} = useTranslation();

  return (
    <CustomModal name={AppModals.EnvironmentPin} height="50%">
      <View style={{paddingHorizontal: 16, alignItems: 'center'}}>
        <Title title={t('modals.environmentPin.title')} />

        <TextInput
          style={{width: '50%'}}
          maxLength={4}
          inputMode="numeric"
          mode="outlined"
          autoFocus
          secureTextEntry={!showPassword}
          onChange={c => {
            const text = c.nativeEvent.text;
            if (text === moment().format('mmHH')) {
              setOpenModal(AppModals.Environments, true);
            }
          }}
          right={
            <TextInput.Icon
              icon={showPassword ? 'eye-off' : 'eye'}
              onPress={() => {
                setShowPassword(!showPassword);
              }}
            />
          }
        />
      </View>

      <View style={{height: 35}} />
    </CustomModal>
  );
};

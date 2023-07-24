/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View} from 'react-native';
import {CustomModal} from '../components/CustomModal';
import {ModalsContext} from '../context/modals';
import {AppModals} from '../constants/modals';
import {Button, TextInput} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {Title} from '../components/Title';

type Props = {};

export const SignInModal: React.FC<Props> = ({}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const {setOpenModal} = useContext(ModalsContext);
  const {t} = useTranslation();

  return (
    <CustomModal name={AppModals.SignIn} height="80%">
      <Title title={t('general.sign_in')} />

      <View style={{paddingHorizontal: 16}}>
        <TextInput mode="outlined" autoFocus label={t('general.email')} />
        <View style={{height: 4}} />
        <TextInput
          mode="outlined"
          label={t('general.password')}
          secureTextEntry={!showPassword}
          right={
            <TextInput.Icon
              icon={showPassword ? 'eye-off' : 'eye'}
              onPress={() => {
                setShowPassword(!showPassword);
              }}
            />
          }
        />
        <View style={{height: 32}} />
        <Button mode="contained">{t('general.sign_in')}</Button>
        <View style={{height: 8}} />
        <Button
          mode="outlined"
          onPress={() => {
            setOpenModal(AppModals.SignUp, true);
          }}>
          {t('general.sign_up')}
        </Button>
      </View>

      <View style={{height: 35}} />
    </CustomModal>
  );
};

/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {CustomModal} from '../components/CustomModal';
import {AppModals} from '../constants/modals';
import {Button, TextInput} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {Title} from '../components/Title';

type Props = {};

export const SignUpModal: React.FC<Props> = ({}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const {t} = useTranslation();

  return (
    <CustomModal name={AppModals.SignUp} height="80%">
      <Title title={t('general.sign_up')} />

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
        <TextInput
          mode="outlined"
          label={t('general.confirm_password')}
          secureTextEntry={!showPassword}
        />
        <View style={{height: 32}} />
        <Button mode="contained">{t('general.sign_up')}</Button>
      </View>

      <View style={{height: 35}} />
    </CustomModal>
  );
};

/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState, useCallback} from 'react';
import {View} from 'react-native';
import {CustomModal} from '../components/CustomModal';
import {ModalsContext} from '../context/modals';
import {AppModals} from '../constants/modals';
import {Button, TextInput} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {Title} from '../components/Title';
import {APIAuthContext} from '../context/api/auth';
import Toast from 'react-native-toast-message';

type Props = {};

export const SignInModal: React.FC<Props> = ({}) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setOpenModal} = useContext(ModalsContext);
  const {signIn} = useContext(APIAuthContext);
  const {t} = useTranslation();

  const handleSignIn = useCallback(async () => {
    setLoading(true);
    try {
      const success = await signIn(email, password);
      if (success) {
        setEmail('');
        setPassword('');
        setOpenModal(AppModals.SignIn, false);
      }
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  }, [signIn, email, password, setOpenModal]);

  return (
    <CustomModal name={AppModals.SignIn} height="80%">
      <Title title={t('general.sign_in')} />

      <View style={{paddingHorizontal: 16}}>
        <TextInput
          mode="outlined"
          autoFocus
          label={t('general.email')}
          value={email}
          onChangeText={setEmail}
        />
        <View style={{height: 4}} />
        <TextInput
          mode="outlined"
          label={t('general.password')}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
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
        <Button loading={loading} onPress={handleSignIn} mode="contained">
          {t('general.sign_in')}
        </Button>
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
      <Toast />
    </CustomModal>
  );
};

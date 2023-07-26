/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState, useCallback} from 'react';
import {View} from 'react-native';
import {CustomModal} from '../components/CustomModal';
import {AppModals} from '../constants/modals';
import {Button, TextInput} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {Title} from '../components/Title';
import {APIAuthContext} from '../context/api/auth';
import Toast from 'react-native-toast-message';
import {ModalsContext} from '../context/modals';

type Props = {};

export const SignUpModal: React.FC<Props> = ({}) => {
  const [showPassword, setShowPassword] = useState(false);
  const {signUp} = useContext(APIAuthContext);
  const {setOpenModal} = useContext(ModalsContext);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {t} = useTranslation();

  const handleSignUp = useCallback(async () => {
    setLoading(true);
    try {
      const success = await signUp(email, password, confirmPassword);
      if (success) {
        setOpenModal(AppModals.SignUp, false);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [signUp, email, password, confirmPassword, setOpenModal]);

  return (
    <CustomModal name={AppModals.SignUp} height="80%">
      <Title title={t('general.sign_up')} />

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
        <TextInput
          mode="outlined"
          label={t('general.confirm_password')}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          secureTextEntry={!showPassword}
        />
        <View style={{height: 32}} />
        <Button loading={loading} mode="contained" onPress={handleSignUp}>
          {t('general.sign_up')}
        </Button>
      </View>

      <View style={{height: 35}} />
      <Toast topOffset={-30} />
    </CustomModal>
  );
};

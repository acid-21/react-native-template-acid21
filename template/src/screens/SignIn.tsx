import React, {useContext, useEffect} from 'react';
import {View} from 'react-native';
import {Title} from '../components/Title';
import {useTranslation} from 'react-i18next';
import {ModalsContext} from '../context/modals';
import {AppModals} from '../constants/modals';
import {Button} from 'react-native-paper';

export const SignInScreen = () => {
  const {t} = useTranslation();
  const {setOpenModal} = useContext(ModalsContext);

  useEffect(() => {
    setOpenModal(AppModals.SignIn, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={{paddingHorizontal: 16}}>
      <Title title={t('general.sign_in')} />
      <Button
        mode="contained-tonal"
        onPress={() => setOpenModal(AppModals.SignIn, true)}>
        {t('general.sign_in')}
      </Button>
    </View>
  );
};

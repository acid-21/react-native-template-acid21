import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppRoutes} from '../constants/routes';
import {Title} from '../components/Title';
import {Button} from 'react-native-paper';
import Toast from 'react-native-toast-message';

type Props = {
  navigation: StackNavigationProp<any, AppRoutes.Home>;
};

export const HomeScreen: React.FC<Props> = () => {
  const {t} = useTranslation();

  const showToast = useCallback(() => {
    Toast.show({
      type: 'success',
      visibilityTime: 6000,
      text1: t('home.toast_title'),
      text2: t('home.toast_message'),
    });
  }, [t]);

  return (
    <View>
      <Title title={t('general.home_screen')} />
      <Button
        icon="message"
        mode="contained"
        style={{width: 200, alignSelf: 'center'}}
        onPress={showToast}>
        Show Toast
      </Button>
    </View>
  );
};

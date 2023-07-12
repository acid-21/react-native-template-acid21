import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, Button} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppRoutes} from '../../constants/routes';

type Props = {
  navigation: StackNavigationProp<any, AppRoutes.Home>;
};

export const HomeScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  return (
    <View>
      <Text>{t('general.welcome')}</Text>
      <Button
        title={t('general.profile')}
        onPress={() => {
          navigation.navigate(AppRoutes.Profile);
        }}
      />
      <Button
        title={t('general.settings')}
        onPress={() => {
          navigation.navigate(AppRoutes.Settings);
        }}
      />
    </View>
  );
};

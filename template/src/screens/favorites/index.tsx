import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppRoutes} from '../../constants/routes';
import {Title} from '../../components/Title';

type Props = {
  navigation: StackNavigationProp<any, AppRoutes.Home>;
};

export const FavoritesScreen: React.FC<Props> = ({}) => {
  const {t} = useTranslation();
  return (
    <View>
      <Title title={t('general.favorites_screen')} />
    </View>
  );
};

import React from 'react';
import {View} from 'react-native';
import {Title} from '../../components/Title';
import {useTranslation} from 'react-i18next';

export const ProfielScreen = () => {
  const {t} = useTranslation();
  return (
    <View>
      <Title title={t('general.profile')} />
    </View>
  );
};

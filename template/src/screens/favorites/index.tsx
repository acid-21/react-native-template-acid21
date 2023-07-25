/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppRoutes} from '../../constants/routes';
import {Title} from '../../components/Title';
import {APIFavoritesContext} from '../../context/api/favorites';
import {FAB, List, ProgressBar} from 'react-native-paper';

type Props = {
  navigation: StackNavigationProp<any, AppRoutes.Home>;
};

export const FavoritesScreen: React.FC<Props> = ({}) => {
  const {favorites, loading, getFavorites} =
    React.useContext(APIFavoritesContext);
  const {t} = useTranslation();

  useEffect(() => {
    getFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={{flex: 1}}>
      <ProgressBar indeterminate visible={loading} />
      <Title title={t('general.favorites_screen')} />

      <View>
        {Object.entries(favorites).map(([key, value]) => {
          const {name = ''} = value || {name: ''};
          return <List.Item key={key} onPress={() => {}} title={name} />;
        })}
      </View>

      <FAB
        icon="plus"
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 90,
        }}
        onPress={() => console.log('Pressed')}
      />
    </View>
  );
};

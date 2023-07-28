/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, SafeAreaView, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppRoutes} from '../constants/routes';
import {Title} from '../components/Title';
import {APIFavoritesContext} from '../context/api/favorites';
import {FAB, List, ProgressBar, useTheme} from 'react-native-paper';
import {ModalsContext} from '../context/modals';
import {AppModals} from '../constants/modals';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {QuestionModal} from '../modals/QuestionModal';

type Props = {
  navigation: StackNavigationProp<any, AppRoutes.Home>;
};

export const FavoritesScreen: React.FC<Props> = ({}) => {
  const {favorites, loading, getFavorites, deleteFavorite} =
    useContext(APIFavoritesContext);
  const [key, setKey] = useState<string>('');
  const {setOpenModal} = useContext(ModalsContext);
  const theme = useTheme();
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
        <SafeAreaView>
          <FlatList
            data={Object.entries(favorites)}
            style={{marginBottom: 125}}
            contentContainerStyle={{}}
            renderItem={({item}) => {
              const [key, value]: [string, any] = item;
              const {name = ''} = value;
              return (
                <List.Item
                  key={key}
                  //onPress={() => {}}
                  title={name}
                  right={props => (
                    <TouchableOpacity
                      onPress={async () => {
                        setKey(key);
                        setOpenModal('delete_favorite', true);
                      }}>
                      <List.Icon
                        {...props}
                        icon="delete"
                        color={theme.colors.primary}
                      />
                    </TouchableOpacity>
                  )}
                />
              );
            }}
            keyExtractor={item => item[0]}
          />
        </SafeAreaView>
      </View>

      <QuestionModal
        name="delete_favorite"
        title={t('general.delete_favorite_title')}
        message={t('general.delete_favorite_message')}
        yesButton={t('general.confirm_delete')}
        noButton={t('general.cancel')}
        onNo={() => setOpenModal('delete_favorite', false)}
        onYes={async () => {
          setOpenModal('delete_favorite', false);
          await deleteFavorite(key);
        }}
      />

      <FAB
        icon="plus"
        color={theme.colors.surface}
        style={{
          backgroundColor: theme.colors.primary,
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 90,
        }}
        onPress={() => {
          setOpenModal(AppModals.AddFavorit, true);
        }}
      />
    </View>
  );
};

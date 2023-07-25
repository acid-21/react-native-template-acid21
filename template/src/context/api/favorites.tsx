import * as React from 'react';
import {APIContext} from '../api';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../auth';

export type APIFavoritesContextType = {
  getFavorites: () => Promise<void>;
  loading: boolean;
  favorites: any;
};
export interface IAPIFavoritesProvider {
  children: React.ReactNode;
}

export const APIFavoritesContext = React.createContext<APIFavoritesContextType>(
  {
    getFavorites: async () => {},
    loading: false,
    favorites: [],
  },
);

const APIFavoritesProvider: React.FC<IAPIFavoritesProvider> = ({children}) => {
  const [initializing, setInitializing] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [favorites, setFavorites] = React.useState({});
  const {client} = React.useContext(APIContext);
  const {auth} = React.useContext(AuthContext);
  const {t} = useTranslation();

  React.useEffect(() => {
    if (!auth?.isSignedIn) {
      setFavorites({});
    }
  }, [auth]);

  React.useEffect(() => {
    (async () => {
      if (!initializing) {
        try {
          await AsyncStorage.setItem(
            'api_favorites',
            JSON.stringify(favorites),
          );
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }, [favorites, initializing]);

  React.useEffect(() => {
    (async () => {
      setInitializing(true);
      try {
        const savedData = await AsyncStorage.getItem('api_favorites');

        console.log('savedData', savedData);

        if (savedData !== null) {
          setFavorites(JSON.parse(savedData));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setInitializing(false);
      }
    })();
  }, []);

  const getFavorites = React.useCallback(async () => {
    try {
      setLoading(true);
      console.log('client headers', client.defaults.headers);
      const {data} = await client.get('/favorites');
      console.log('data', data);

      const {success, favorites: databaseFavorites} = data;

      if (success) {
        setFavorites(databaseFavorites);
      }
    } catch (error) {
      let errorMessage;
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data;
      } else {
        errorMessage = error;
      }

      Toast.show({
        type: 'error',
        visibilityTime: 4000,
        text1: t('general.error_title'),
        text2: errorMessage,
        position: 'top',
      });
    } finally {
      setLoading(false);
    }
  }, [client, t]);

  return (
    <APIFavoritesContext.Provider value={{getFavorites, favorites, loading}}>
      {children}
    </APIFavoritesContext.Provider>
  );
};

export default APIFavoritesProvider;

import React, {
  useState,
  useContext,
  useEffect,
  createContext,
  useCallback,
} from 'react';
import {APIContext} from '../api';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../auth';

export type APIFavoritesContextType = {
  getFavorites: () => Promise<void>;
  addFavorite: (name: string) => Promise<void>;
  deleteFavorite: (uid: string) => Promise<void>;
  loading: boolean;
  favorites: any;
};
export interface IAPIFavoritesProvider {
  children: React.ReactNode;
}

export const APIFavoritesContext = createContext<APIFavoritesContextType>({
  getFavorites: async () => {},
  addFavorite: async () => {},
  deleteFavorite: async () => {},
  loading: false,
  favorites: [],
});

const APIFavoritesProvider: React.FC<IAPIFavoritesProvider> = ({children}) => {
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState({});
  const {client} = useContext(APIContext);
  const {auth} = useContext(AuthContext);
  const {t} = useTranslation();

  useEffect(() => {
    if (!auth?.isSignedIn) {
      setFavorites({});
    }
  }, [auth]);

  useEffect(() => {
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

  useEffect(() => {
    (async () => {
      setInitializing(true);
      try {
        const savedData = await AsyncStorage.getItem('api_favorites');

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

  const handleError = useCallback(
    (error: any) => {
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
    },
    [t],
  );

  const getFavorites = useCallback(async () => {
    try {
      setLoading(true);
      const {data} = await client.get('/favorites');

      const {success, favorites: databaseFavorites} = data;

      if (success) {
        setFavorites(databaseFavorites);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, [client, handleError]);

  const addFavorite = useCallback(
    async (name: string) => {
      try {
        setLoading(true);
        const {data} = await client.post('/favorites', {name});

        const {success, favorites: databaseFavorites} = data;

        if (success) {
          setFavorites(databaseFavorites);
        }
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    },
    [client, handleError],
  );

  const deleteFavorite = useCallback(
    async (uid: string) => {
      try {
        setLoading(true);
        const {data} = await client.delete(`/favorites?uid=${uid}`);

        const {success, favorites: databaseFavorites} = data;

        if (success) {
          setFavorites(databaseFavorites);
        }
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    },
    [client, handleError],
  );

  return (
    <APIFavoritesContext.Provider
      value={{getFavorites, addFavorite, deleteFavorite, favorites, loading}}>
      {children}
    </APIFavoritesContext.Provider>
  );
};

export default APIFavoritesProvider;

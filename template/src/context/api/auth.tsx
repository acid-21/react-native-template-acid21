import * as React from 'react';
import {APIContext} from '../api';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {useTranslation} from 'react-i18next';
import {AuthContext} from '../auth';

export type APIAuthContextType = {
  signUp: (
    email: string,
    password: string,
    confirm_password: string,
  ) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<boolean>;
};
export interface IAPIAuthProvider {
  children: React.ReactNode;
}

export const APIAuthContext = React.createContext<APIAuthContextType>({
  signUp: async () => {
    return false;
  },
  signIn: async () => {
    return false;
  },
});

const APIAuthProvider: React.FC<IAPIAuthProvider> = ({children}) => {
  const {client} = React.useContext(APIContext);
  const {setAuth} = React.useContext(AuthContext);
  const {t} = useTranslation();

  const signUp = React.useCallback(
    async (email: string, password: string, confirm_password: string) => {
      try {
        const {data} = await client.post('/sign_up', {
          email,
          password,
          confirm_password,
        });

        const {success, user} = data;

        if (success) {
          setAuth({
            user,
            isSignedIn: true,
            params: {},
          });
          return true;
        } else {
          return false;
        }
      } catch (error) {
        let errorMessage;
        if (axios.isAxiosError(error)) {
          errorMessage = error.response?.data;
        } else {
          console.log('error', error);
          errorMessage = error;
        }

        Toast.show({
          type: 'error',
          visibilityTime: 4000,
          text1: t('general.error_title'),
          text2: errorMessage,
          position: 'top',
        });

        return false;
      }
    },
    [client, setAuth, t],
  );

  const signIn = React.useCallback(
    async (email: string, password: string) => {
      try {
        const {data} = await client.post('/sign_in', {
          email,
          password,
        });
        console.log('data', data);

        const {success, user} = data;

        if (success) {
          setAuth({
            user,
            isSignedIn: true,
            params: {},
          });
          return true;
        } else {
          return false;
        }
      } catch (error) {
        let errorMessage;
        if (axios.isAxiosError(error)) {
          errorMessage = error.response?.data;
        } else {
          errorMessage = error;
        }

        console.log('error', errorMessage);

        Toast.show({
          type: 'error',
          visibilityTime: 4000,
          text1: t('general.error_title'),
          text2: errorMessage,
          position: 'top',
        });

        return false;
      }
    },
    [client, setAuth, t],
  );

  return (
    <APIAuthContext.Provider value={{signUp, signIn}}>
      {children}
    </APIAuthContext.Provider>
  );
};

export default APIAuthProvider;

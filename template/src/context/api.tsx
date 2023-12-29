import React, {createContext, useContext, useState, useEffect} from 'react';
import axios, {AxiosInstance} from 'axios';
import {EnvironmentContext} from './environment';
import {AuthContext} from './auth';
import {LocaleContext} from './locales';
import {getCustomHeaders} from '../constants/common';
import Toast from 'react-native-toast-message';
import {useTranslation} from 'react-i18next';

let client = axios.create();

export type APIContextType = {
  client: AxiosInstance;
  initialized: boolean;
};
export interface IAPIProvider {
  children: React.ReactNode;
}

export const APIContext = createContext<APIContextType>({
  client: client,
  initialized: false,
});

const APIProvider: React.FC<IAPIProvider> = ({children}) => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const {t} = useTranslation();
  const {environment} = useContext(EnvironmentContext);
  const {auth, setAuth, getSavedAuth} = useContext(AuthContext);
  const {locale} = useContext(LocaleContext);
  const {params} = environment || ({params: {}} as any);
  const {axios: axiosConfig} = params || ({baseURL: ''} as any);
  const {user} = auth || {};

  useEffect(() => {
    const {
      baseURL,
      timeout = 15000,
      headers = {},
    } = axiosConfig || {baseURL: ''};
    client.defaults.baseURL = baseURL;
    client.defaults.timeout = timeout;
    client.defaults.headers.common = {
      ...client.defaults.headers.common,
      ...headers,
    };
    setInitialized(true);
  }, [axiosConfig]);

  useEffect(() => {
    client.defaults.headers.common = {
      ...client.defaults.headers.common,
      ...getCustomHeaders(user, locale),
    };

    if (user?.token) {
      setAuth({
        user,
        isSignedIn: true,
        params: {},
      });
    }
  }, [user, locale, setAuth]);

  const updateToken = React.useCallback(async () => {
    const savedAuth = await getSavedAuth();
    const {user} = savedAuth || {user: {}};
    const {baseURL} = axiosConfig || {baseURL: ''};

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseURL}/token/refresh`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        refresh_token: user?.refresh_token,
      }),
    };

    try {
      const response = await axios.request(config);

      const {data} = response;
      const {refresh_token, token} = data;

      if (refresh_token) {
        setAuth(pr => ({
          ...pr,
          user: {
            ...pr?.user,
            refresh_token,
            token,
          },
        }));

        client.defaults.headers.common = {
          ...client.defaults.headers.common,
          token: `${token}`,
          Authorization: `Bearer ${token}`,
        };

        return {success: true, token, refresh_token};
      } else {
        setAuth({
          user: null,
          isSignedIn: false,
          params: {},
        });

        return {success: false};
      }
    } catch (error) {
      console.log(
        'refresh token failed',
        error,
        error?.request,
        error?.request,
      );

      setAuth({
        user: null,
        isSignedIn: false,
        params: {},
      });

      return {success: false};
    }
  }, [axiosConfig, getSavedAuth, setAuth]);

  useEffect(() => {
    const myInterceptor = client.interceptors.response.use(
      function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        //console.log("response headers", response.request._header);
        console.log('response status success', response.status);
        console.log('response url success', response.request.responseURL);

        return response;
      },
      function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error

        console.log('axios error', error);
        if (error.toString().includes('Network Error')) {
          Toast.show({
            type: 'error',
            visibilityTime: 4000,
            text1: t('general.network_error_title'),
            text2: t('general.network_error_title2'),

            position: 'top',
          });
        }

        if (
          !error.response.request.responseURL.includes('token/refresh') &&
          error.response.status === 401
        ) {
          return updateToken().then(r => {
            const {success, token} = r || {};

            if (success) {
              return client.request({
                ...error.config,
                headers: {
                  ...error.config.headers,
                  token: `${token}`,
                  Authorization: `Bearer ${token}`,
                },
              });
            } else {
              return Promise.reject(error);
            }
          });
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axios.interceptors.request.eject(myInterceptor);
    };
  }, [updateToken, t]);

  return (
    <APIContext.Provider value={{client, initialized}}>
      {children}
    </APIContext.Provider>
  );
};

export default APIProvider;

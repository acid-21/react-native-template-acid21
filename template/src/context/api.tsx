import React, {createContext, useContext, useState, useEffect} from 'react';
import axios, {AxiosInstance} from 'axios';
import {EnvironmentContext} from './environment';
import {AuthContext} from './auth';
import {LocaleContext} from './locales';
import {getCustomHeaders} from '../constants/common';

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
  const {environment} = useContext(EnvironmentContext);
  const {auth, setAuth} = useContext(AuthContext);
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

  return (
    <APIContext.Provider value={{client, initialized}}>
      {children}
    </APIContext.Provider>
  );
};

export default APIProvider;

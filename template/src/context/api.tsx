import * as React from 'react';
import axios from 'axios';
import {EnvironmentContext} from './environment';
import {AuthContext} from './auth';
import {LocaleContext} from './locales';

const client = axios.create({});

export interface IAuth {
  user: any;
  isLoggedIn: boolean;
  params: any;
}

export type APIContextType = {
  client: any;
  initialized: boolean;
};
export interface IAuthProvider {
  children: React.ReactNode;
}

export const APIContext = React.createContext<APIContextType>({
  client: client,
  initialized: false,
});

const APIProvider: React.FC<IAuthProvider> = ({children}) => {
  const [initialized, setInitialized] = React.useState<boolean>(false);
  const {environment} = React.useContext(EnvironmentContext);
  const {auth} = React.useContext(AuthContext);
  const {locale} = React.useContext(LocaleContext);
  const {params} = environment || ({params: {}} as any);
  const {axios: axiosConfig} = params || ({baseURL: ''} as any);

  console.log('environment', environment);
  console.log('client', client.defaults.baseURL);

  React.useEffect(() => {
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
  React.useEffect(() => {
    const {
      getCustomHeaders = () => {
        return {};
      },
    } = axiosConfig || {baseURL: ''};
    client.defaults.headers.common = {
      ...client.defaults.headers.common,
      ...getCustomHeaders(auth, locale),
    };
    setInitialized(true);
  }, [axiosConfig, auth, locale]);

  return (
    <APIContext.Provider value={{client, initialized}}>
      {children}
    </APIContext.Provider>
  );
};

export default APIProvider;

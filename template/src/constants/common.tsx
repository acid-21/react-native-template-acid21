import {IEnvironment} from '../context/environment';
import {ILocale} from '../context/locales';
import en from '../locales/en.json';
import de from '../locales/de.json';

const getCustomHeaders = (auth: any, locale: string) => {
  const {isLoggedIn = false} = auth || {};
  return {token: '123', locale, isLoggedIn};
};

export const environments: IEnvironment[] = [
  {
    id: 'dev',
    label: 'Development',
    isDebug: true,
    isProductionDefault: false,
    isDebugDefault: true,
    params: {
      axios: {
        baseURL: 'https://dev.example.com/api',
        getCustomHeaders,
      },
    },
  },
  {
    id: 'prod',
    label: 'Production',
    isDebug: false,
    isProductionDefault: true,
    isDebugDefault: false,
    params: {
      axios: {
        baseURL: 'https://dev.example.com/api',
        getCustomHeaders,
      },
    },
  },
  {
    id: 'int',
    label: 'Integration',
    isDebug: false,
    isProductionDefault: false,
    isDebugDefault: false,
    params: {
      axios: {
        baseURL: 'https://int.example.com/api',
        getCustomHeaders,
      },
    },
  },
];

export const locales: ILocale[] = [
  {
    id: 'en',
    code: 'en-US',
    label_id: 'en_locale',
    translations: en,
  },
  {
    id: 'de',
    code: 'de-DE',
    label_id: 'de_locale',
    translations: de,
  },
];

export const toastConfig = {};

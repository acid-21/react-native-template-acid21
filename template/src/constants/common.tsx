import {IEnvironment} from '../context/environment';
import {ILocale} from '../context/locales';
import en from '../locales/en.json';
import de from '../locales/de.json';

export const environments: IEnvironment[] = [
  {
    id: 'dev',
    label: 'Development',
    isDebug: true,
    isProductionDefault: false,
    isDebugDefault: true,
    params: {
      apiUrl: 'https://dev.example.com/api',
    },
  },
  {
    id: 'prod',
    label: 'Production',
    isDebug: false,
    isProductionDefault: true,
    isDebugDefault: false,
    params: {
      apiUrl: 'https://prod.example.com/api',
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

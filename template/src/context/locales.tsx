import React, {useEffect, createContext, useState} from 'react';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {NativeModules, Platform} from 'react-native';
import {I18nextProvider} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const defaultLocale =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
    : NativeModules.I18nManager.localeIdentifier;

let defaultLocaleID = 'de';

try {
  defaultLocaleID = defaultLocale.toString().substring(0, 2);
} catch (error) {}

i18n.use(initReactI18next).init({
  resources: {},
  lng: defaultLocaleID,
  fallbackLng: 'de',
  compatibilityJSON: 'v3',
  interpolation: {
    escapeValue: false,
  },
});

export interface ILocale {
  id: string;
  code: string;
  label_id: string;
  translations: any;
}

export type LocaleContextType = {
  locale: string;
  initializing: boolean;
  changeLocale: (name: string) => void;
  locales: ILocale[];
};
export interface ILocalesProvider {
  children: React.ReactNode;
  locales: ILocale[];
}

export const LocaleContext = createContext<LocaleContextType>({
  locale: defaultLocale,
  initializing: true,
  changeLocale: () => {},
  locales: [],
});

const LocaleProvider: React.FC<ILocalesProvider> = ({children, locales}) => {
  const [locale, setLocale] = useState<string>(defaultLocaleID);
  const [initializing, setInitializing] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      setInitializing(true);
      try {
        const savedLocale = await AsyncStorage.getItem('locale');

        if (savedLocale !== null) {
          setLocale(savedLocale);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setInitializing(false);
      }
    })();
  }, [locales]);

  useEffect(() => {
    let resources = {} as any;

    locales.map((l: ILocale) => {
      resources[l.id] = {translation: l.translations};
      return l;
    });

    i18n.use(initReactI18next).init({
      resources,
      lng: defaultLocale,
      fallbackLng: 'en',
      compatibilityJSON: 'v3',
      interpolation: {
        escapeValue: false,
      },
    });
  }, [locales]);

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  const changeLocale = async (id: string) => {
    try {
      await AsyncStorage.setItem('locale', id);
    } catch (error) {
      console.error(error);
    }
    setLocale(id);
  };

  return (
    <I18nextProvider i18n={i18n}>
      <LocaleContext.Provider
        value={{locale, changeLocale, locales, initializing}}>
        {children}
      </LocaleContext.Provider>
    </I18nextProvider>
  );
};

export default LocaleProvider;

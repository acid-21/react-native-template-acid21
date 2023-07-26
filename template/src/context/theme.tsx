import React, {useState, useEffect, createContext} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ThemeProvider as ElementsProvider, createTheme} from '@rneui/themed';

import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

import {
  MD3LightTheme,
  MD3DarkTheme,
  PaperProvider,
  adaptNavigationTheme,
} from 'react-native-paper';

const {LightTheme, DarkTheme} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

export interface ITheme {
  isDarkMode: boolean;
}

export type ThemeContextType = {
  isDarkMode: boolean;
  initializing: boolean;
  AppTheme: any;
  PaperTheme: any;
  ElementsTheme: any;
  setDarkMode: (value: boolean) => void;
};
export interface IThemeProvider {
  children: React.ReactNode;
  getTheme: (theme: any, isDarkMode: boolean, type: string) => any;
}

export const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  initializing: true,
  AppTheme: LightTheme,
  PaperTheme: MD3LightTheme,
  ElementsTheme: MD3LightTheme,
  setDarkMode: () => {},
});

const ThemeProvider: React.FC<IThemeProvider> = ({
  children,
  getTheme = t => {
    return t;
  },
}) => {
  const scheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [initializing, setInitializing] = useState<boolean>(true);

  const theme = isDarkMode ? DarkTheme : LightTheme;
  const paperTheme = isDarkMode ? MD3DarkTheme : MD3LightTheme;
  const elementsTheem = createTheme({
    mode: isDarkMode ? 'dark' : 'light',
  });

  const AppTheme = getTheme(theme, isDarkMode, 'native');
  const PaperTheme = getTheme(paperTheme, isDarkMode, 'paper');
  const ElementsTheme = getTheme(elementsTheem, isDarkMode, 'paper');

  useEffect(() => {
    (async () => {
      setInitializing(true);
      try {
        const savedTheme = await AsyncStorage.getItem('theme');

        if (savedTheme !== null) {
          if (savedTheme === 'dark') {
            setIsDarkMode(true);
          } else {
            setIsDarkMode(false);
          }
        } else {
          setIsDarkMode(scheme === 'dark');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setInitializing(false);
      }
    })();
  }, [scheme]);

  const setDarkMode = async (value: boolean) => {
    setIsDarkMode(value);
    await AsyncStorage.setItem('theme', value ? 'dark' : 'light');
  };

  const {colors} = AppTheme;

  return (
    <>
      <StatusBar
        backgroundColor={colors.card}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <PaperProvider theme={PaperTheme}>
        <ElementsProvider theme={ElementsTheme}>
          <ThemeContext.Provider
            value={{
              isDarkMode,
              initializing,
              AppTheme,
              PaperTheme,
              ElementsTheme,
              setDarkMode,
            }}>
            {children}
          </ThemeContext.Provider>
        </ElementsProvider>
      </PaperProvider>
    </>
  );
};

export default ThemeProvider;

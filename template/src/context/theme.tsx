import * as React from 'react';
import {useColorScheme} from 'react-native';
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
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};
export interface IThemeProvider {
  children: React.ReactNode;
  getTheme: (theme: any, isDarkMode: boolean, type: string) => any;
}

export const ThemeContext = React.createContext<ThemeContextType>({
  isDarkMode: false,
  initializing: true,
  AppTheme: LightTheme,
  PaperTheme: MD3LightTheme,
  setIsDarkMode: () => {},
});

const ThemeProvider: React.FC<IThemeProvider> = ({
  children,
  getTheme = t => {
    return t;
  },
}) => {
  const scheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = React.useState<boolean>(
    scheme === 'dark',
  );
  const [initializing, setInitializing] = React.useState<boolean>(true);

  const theme = isDarkMode ? DarkTheme : LightTheme;
  const paperTheme = isDarkMode ? MD3DarkTheme : MD3LightTheme;
  const elementsTheem = createTheme({
    mode: isDarkMode ? 'dark' : 'light',
  });

  const AppTheme = getTheme(theme, isDarkMode, 'native');
  const PaperTheme = getTheme(paperTheme, isDarkMode, 'paper');
  const ElementsTheme = getTheme(elementsTheem, isDarkMode, 'paper');

  React.useEffect(() => {
    (async () => {
      setInitializing(true);
      try {
        const savedTheme = await AsyncStorage.getItem('theme');

        if (savedTheme !== null) {
          //setLocale(savedLocale);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setInitializing(false);
      }
    })();
  }, []);

  return (
    <PaperProvider theme={PaperTheme}>
      <ElementsProvider theme={ElementsTheme}>
        <ThemeContext.Provider
          value={{
            isDarkMode,
            initializing,
            AppTheme,
            PaperTheme,
            setIsDarkMode,
          }}>
          {children}
        </ThemeContext.Provider>
      </ElementsProvider>
    </PaperProvider>
  );
};

export default ThemeProvider;

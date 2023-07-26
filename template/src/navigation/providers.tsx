/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import EnvironmentProvider from '../context/environment';
import {environments, locales, updateData} from '../constants/common';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import ModalsProvider from '../context/modals';
import LocaleProvider from '../context/locales';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AuthProvider from '../context/auth';
import ThemeProvider, {ThemeContext} from '../context/theme';
import getTheme from '../constants/theme';
import APIProvider from '../context/api';
import UpdateProvider from '../context/update';
import APIProviders from './api_providers';

const Navigation = ({children}: {children: any}) => {
  const {AppTheme} = useContext(ThemeContext);
  return (
    <>
      <NavigationContainer theme={AppTheme}>{children}</NavigationContainer>
    </>
  );
};

const Providers = ({children}: {children: any}) => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <EnvironmentProvider environments={environments}>
          <ModalsProvider>
            <AuthProvider>
              <BottomSheetModalProvider>
                <LocaleProvider locales={locales}>
                  <ThemeProvider getTheme={getTheme}>
                    <APIProvider>
                      <UpdateProvider {...updateData}>
                        <APIProviders>
                          <Navigation>{children}</Navigation>
                        </APIProviders>
                      </UpdateProvider>
                    </APIProvider>
                  </ThemeProvider>
                </LocaleProvider>
              </BottomSheetModalProvider>
            </AuthProvider>
          </ModalsProvider>
        </EnvironmentProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default Providers;

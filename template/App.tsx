/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import EnvironmentProvider from './src/context/environment';
import {environments, locales} from './src/constants/common';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import ModalsProvider from './src/context/modals';
import LocaleProvider from './src/context/locales';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppNavigation} from './src/navigators';

const App = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <EnvironmentProvider environments={environments}>
          <ModalsProvider>
            <BottomSheetModalProvider>
              <LocaleProvider locales={locales}>
                <NavigationContainer>
                  <AppNavigation />
                </NavigationContainer>
              </LocaleProvider>
            </BottomSheetModalProvider>
          </ModalsProvider>
        </EnvironmentProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;

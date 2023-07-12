/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppStack} from './src';
import i18next from './src/locales/index';
import {I18nextProvider} from 'react-i18next';
import EnvironmentProvider from './src/context/environment';
import {environments} from './src/constants/common';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <EnvironmentProvider environments={environments}>
        <I18nextProvider i18n={i18next}>
          <NavigationContainer>
            <AppStack />
          </NavigationContainer>
        </I18nextProvider>
      </EnvironmentProvider>
    </GestureHandlerRootView>
  );
};

export default App;

import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './screens/home';
import {ProfielScreen} from './screens/profile';
import {SettingsScreen} from './screens/settings';
import {AppRoutes} from './constants/routes';

const Stack = createNativeStackNavigator();

export const AppStack = () => {
  const {t} = useTranslation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={AppRoutes.Home}
        component={HomeScreen}
        options={{title: t('general.welcome')}}
      />
      <Stack.Screen name={AppRoutes.Profile} component={ProfielScreen} />
      <Stack.Screen name={AppRoutes.Settings} component={SettingsScreen} />
    </Stack.Navigator>
  );
};

import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {SettingsScreen} from '../screens/settings';
import BottomTabNavigator from './bottom';
import {AppRoutes} from '../constants/routes';
import {useTheme} from '@react-navigation/native';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  //Using navigation here will reset to initial route after locale change
  const {t} = useTranslation();
  const {colors} = useTheme();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerTintColor: colors.primary,
        headerTitleStyle: {
          color: colors.text,
        },
      }}>
      <Drawer.Screen
        name={AppRoutes.BottomTabNavigator}
        component={BottomTabNavigator}
        options={{
          title: t('general.home_navigation'),
        }}
      />
      <Drawer.Screen name={t('general.settings')} component={SettingsScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

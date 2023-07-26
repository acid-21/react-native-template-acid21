import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {SettingsScreen} from '../screens/Settings';
import BottomTabNavigator from './bottom';
import {AppRoutes} from '../constants/routes';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  //Using navigation here will reset to initial route after locale change
  const {t} = useTranslation();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerTitleStyle: {
          color: 'white',
        },
        drawerInactiveTintColor: 'white',
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

import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {useTranslation} from 'react-i18next';

import {SettingsScreen} from '../screens/settings';
import BottomTabNavigator from './bottom';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const {t} = useTranslation();

  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
        options={{
          title: 'Home Navigation',
        }}
      />
      <Drawer.Screen name={t('general.settings')} component={SettingsScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

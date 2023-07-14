import {createDrawerNavigator} from '@react-navigation/drawer';

import React from 'react';

import {SettingsScreen} from '../screens/settings';
import BottomTabNavigator from './bottom';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

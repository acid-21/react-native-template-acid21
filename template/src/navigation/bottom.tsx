import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeNavigator} from './home';
import {SettingsScreen} from '../screens/settings';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeNavigator"
        options={{
          headerShown: false,
        }}
        component={HomeNavigator}
      />
      <Tab.Screen
        name="Settings"
        options={{
          headerShown: false,
        }}
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

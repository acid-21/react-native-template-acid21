import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeNavigator} from './home';
import {AppRoutes} from '../constants/routes';
import {FavoritesScreen} from '../screens/favorites';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeNavigator"
        options={{
          headerShown: false,
          title: 'Home',
        }}
        component={HomeNavigator}
      />
      <Tab.Screen
        name={AppRoutes.Favorites}
        options={{
          headerShown: false,
        }}
        component={FavoritesScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

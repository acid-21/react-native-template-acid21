/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeNavigator} from './home';
import {AppRoutes} from '../constants/routes';
import {FavoritesScreen} from '../screens/favorites';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const {t} = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName = 'ios-list';

          if (route.name === AppRoutes.HomeNavigator) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === AppRoutes.Favorites) {
            iconName = focused ? 'heart' : 'heart-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        //tabBarActiveTintColor: 'tomato',
        //tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name={AppRoutes.HomeNavigator}
        options={{
          headerShown: false,
          title: t('general.home_screen'),
        }}
        component={HomeNavigator}
      />
      <Tab.Screen
        name={AppRoutes.Favorites}
        options={{
          headerShown: false,
          title: t('general.favorites_screen'),
        }}
        component={FavoritesScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

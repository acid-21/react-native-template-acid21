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
    <>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarStyle: {
            //paddingVertical: Platform.OS === 'ios' ? 20 : 0,
            height: 60,
            paddingBottom: 5,
            position: 'absolute',
            bottom: 20,
            left: 20,
            right: 20,
            elevation: 1,
            borderRadius: 25,
            borderColor: 'transparent',
            borderWidth: 0,
            borderTopWidth: 0,
            //shadowColor: '#000',
          },
          tabBarLabelPosition: 'below-icon',
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
          tabBarInactiveTintColor: 'white',
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
            tabBarBadge: 3,
          }}
          component={FavoritesScreen}
        />
      </Tab.Navigator>
    </>
  );
};

export default BottomTabNavigator;

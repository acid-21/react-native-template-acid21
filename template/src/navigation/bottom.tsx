/* eslint-disable react/no-unstable-nested-components */
import React, {useContext, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeNavigator} from './home';
import {AppRoutes} from '../constants/routes';
import {FavoritesScreen} from '../screens/favorites';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import {ProfielScreen} from '../screens/profile';
import {AuthContext} from '../context/auth';
import {SignInScreen} from '../screens/sign_in';
import {APIFavoritesContext} from '../context/api/favorites';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const {t} = useTranslation();
  const {auth} = useContext(AuthContext);
  const {isSignedIn} = auth || {};
  const {favorites, getFavorites} = useContext(APIFavoritesContext);

  useEffect(() => {
    if (isSignedIn) {
      setTimeout(() => {
        getFavorites();
      }, 1000);
    }
  }, [isSignedIn, getFavorites]);

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
            } else if (route.name === AppRoutes.Profile) {
              iconName = focused ? 'person' : 'person-outline';
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
            tabBarBadge: Object.keys(favorites).length,
          }}
          component={isSignedIn ? FavoritesScreen : SignInScreen}
        />
        <Tab.Screen
          name={AppRoutes.Profile}
          options={{
            headerShown: false,
            title: t('general.profile'),
          }}
          component={isSignedIn ? ProfielScreen : SignInScreen}
        />
      </Tab.Navigator>
    </>
  );
};

export default BottomTabNavigator;

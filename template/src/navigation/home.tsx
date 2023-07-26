import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../screens/Home';
import {ProfielScreen} from '../screens/Profile';
import {AppRoutes} from '../constants/routes';

const Stack = createNativeStackNavigator();

export const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={AppRoutes.Home}
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={AppRoutes.Favorites}
        options={{
          headerShown: false,
        }}
        component={ProfielScreen}
      />
    </Stack.Navigator>
  );
};

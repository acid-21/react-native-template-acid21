import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../screens/home';
import {ProfielScreen} from '../screens/profile';
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
        name={AppRoutes.Profile}
        options={{
          headerShown: false,
        }}
        component={ProfielScreen}
      />
    </Stack.Navigator>
  );
};

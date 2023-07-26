/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {Modals} from './modals';
import DrawerNavigator from './drawer';
import {View} from 'react-native';
import {EnvironmentContext} from '../context/environment';

export const AppNavigation = () => {
  const {environment} = useContext(EnvironmentContext);
  const {isDebug = false} = environment || {isDebug: false};
  return (
    <>
      <DrawerNavigator />
      <Modals />

      {isDebug && (
        <View
          style={{
            backgroundColor: 'red',
            position: 'absolute',
            top: 0,
            right: 0,
            width: 35,
            height: 35,
            borderRadius: 50,
          }}
        />
      )}
    </>
  );
};

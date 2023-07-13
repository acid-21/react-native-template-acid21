import * as React from 'react';
import {Modals} from './modals';
import DrawerNavigator from './drawer';

export const AppNavigation = () => {
  return (
    <>
      <DrawerNavigator />
      <Modals />
    </>
  );
};

import * as React from 'react';

import {LocalesModal} from '../modals/locales';
import {EnvironmentsModal} from '../modals/environments';
import {EnvironmentPinModal} from '../modals/environmentPin';

export const Modals = () => {
  return (
    <>
      <LocalesModal />
      <EnvironmentsModal />
      <EnvironmentPinModal />
    </>
  );
};

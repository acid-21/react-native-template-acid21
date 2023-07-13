import * as React from 'react';

import {LocalesModal} from '../modals/locales';
import {EnvironmentsModal} from '../modals/environments';

export const Modals = () => {
  return (
    <>
      <LocalesModal />
      <EnvironmentsModal />
    </>
  );
};

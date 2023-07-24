import * as React from 'react';

import {LocalesModal} from '../modals/locales';
import {EnvironmentsModal} from '../modals/environments';
import {EnvironmentPinModal} from '../modals/environmentPin';
import {UpdateModal} from '../modals/update';
import {SignInModal} from '../modals/signIn';
import {SignUpModal} from '../modals/signUp';

export const Modals = () => {
  return (
    <>
      <LocalesModal />
      <EnvironmentsModal />
      <EnvironmentPinModal />
      <UpdateModal />
      <SignInModal />
      <SignUpModal />
    </>
  );
};

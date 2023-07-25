import * as React from 'react';

import {LocalesModal} from '../modals/locales';
import {EnvironmentsModal} from '../modals/environments';
import {EnvironmentPinModal} from '../modals/environmentPin';
import {UpdateModal} from '../modals/update';
import {SignInModal} from '../modals/signIn';
import {SignUpModal} from '../modals/signUp';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../constants/common';

export const Modals = () => {
  return (
    <>
      <LocalesModal />
      <EnvironmentsModal />
      <EnvironmentPinModal />
      <UpdateModal />
      <SignInModal />
      <SignUpModal />

      <Toast config={toastConfig} />
    </>
  );
};

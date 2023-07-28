import * as React from 'react';

import {LocalesModal} from '../modals/Locales';
import {EnvironmentsModal} from '../modals/Environments';
import {EnvironmentPinModal} from '../modals/EnvironmentPin';
import {UpdateModal} from '../modals/Update';
import {SignInModal} from '../modals/SignIn';
import {SignUpModal} from '../modals/SignUp';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../constants/common';
import {AddFavoriteModal} from '../modals/AddFavorite';

export const Modals = () => {
  return (
    <>
      <LocalesModal />
      <EnvironmentsModal />
      <EnvironmentPinModal />
      <UpdateModal />
      <SignInModal />
      <SignUpModal />
      <AddFavoriteModal />

      <Toast config={toastConfig} />
    </>
  );
};

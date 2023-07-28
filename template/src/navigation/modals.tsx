import * as React from 'react';

import {LocalesModal} from '../modals2/Locales';
import {EnvironmentsModal} from '../modals2/Environments';
import {EnvironmentPinModal} from '../modals2/EnvironmentPin';
import {UpdateModal} from '../modals2/Update';
import {SignInModal} from '../modals2/SignIn';
import {SignUpModal} from '../modals2/SignUp';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../constants/common';
import {AddFavoriteModal} from '../modals2/AddFavorite';

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

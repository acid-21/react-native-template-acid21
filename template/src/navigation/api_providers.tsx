import * as React from 'react';

import APIAuthProvider from '../context/api/auth';
import APIFavoritesProvider from '../context/api/favorites';

const APIProviders = ({children}: {children: any}) => {
  return (
    <APIAuthProvider>
      <APIFavoritesProvider>{children}</APIFavoritesProvider>
    </APIAuthProvider>
  );
};

export default APIProviders;

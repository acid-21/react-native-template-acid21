import * as React from 'react';
import {AppNavigation} from './src/navigation';
import Providers from './src/navigation/providers';

const App = () => {
  return (
    <Providers>
      <AppNavigation />
    </Providers>
  );
};

export default App;

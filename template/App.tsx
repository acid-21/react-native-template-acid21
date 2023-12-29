import * as React from 'react';
import {AppNavigation} from './src/navigation';
import Providers from './src/navigation/providers';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Providers>
      <AppNavigation />
    </Providers>
  );
};

export default App;

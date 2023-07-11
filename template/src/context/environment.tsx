import * as React from 'react';
import {
  EnvironmentContextType,
  IEnvironment,
  IEnvironmentProvider,
} from '../@types/environment';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const EnvironmentContext =
  React.createContext<EnvironmentContextType | null>(null);

const EnvironmentProvider: React.FC<IEnvironmentProvider> = ({
  children,
  environments,
}) => {
  const defaultEnvironment =
    environments.find((e: IEnvironment) => {
      return __DEV__ ? e.isDebugDefault : e.isProductionDefault;
    }) || environments[0];

  const [environment, setEnvironment] =
    React.useState<IEnvironment>(defaultEnvironment);
  const [initializing, setInitializing] = React.useState<boolean>(true);

  React.useEffect(() => {
    (async () => {
      setInitializing(true);
      try {
        const savedEnv = (await AsyncStorage.getItem('environment')) || '';
        const s = JSON.parse(savedEnv);
        if (s !== null) {
          setEnvironment(s);
        } else {
          setEnvironment(defaultEnvironment);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setInitializing(false);
      }
    })();
  }, [defaultEnvironment]);

  const changeEnvironment = (env: IEnvironment) => {
    console.log('setEnvironment', env);
    setEnvironment(env);
  };

  return (
    <EnvironmentContext.Provider
      value={{environment, changeEnvironment, initializing}}>
      {children}
    </EnvironmentContext.Provider>
  );
};

export default EnvironmentProvider;

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

  console.log('environment', environment);

  React.useEffect(() => {
    (async () => {
      setInitializing(true);
      try {
        const savedEnv = await AsyncStorage.getItem('environment');

        if (savedEnv !== null) {
          // We don't use the saved env because the params could change over time
          // and with this we make usre that the environment used alwasy has the latest data
          const s = JSON.parse(savedEnv);
          const tempEnv = environments.find((e: IEnvironment) => {
            e.id === s.id;
          });
          setEnvironment(tempEnv || defaultEnvironment);
        } else {
          setEnvironment(defaultEnvironment);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setInitializing(false);
      }
    })();
  }, [defaultEnvironment, environments]);

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

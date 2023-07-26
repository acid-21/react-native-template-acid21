import React, {useState, createContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface IEnvironment {
  id: string;
  label: string;
  isDebug: boolean;
  isProductionDefault: boolean;
  isDebugDefault: boolean;
  params: any;
}
export interface IEnvironmentProvider {
  children: React.ReactNode;
  environments: IEnvironment[];
}
export type EnvironmentContextType = {
  environment?: IEnvironment;
  initializing: boolean;
  environments: IEnvironment[];
  changeEnvironment: (environment: IEnvironment) => void;
};

export const EnvironmentContext = createContext<EnvironmentContextType>({
  environment: undefined,
  initializing: true,
  environments: [],
  changeEnvironment: () => {},
});

const EnvironmentProvider: React.FC<IEnvironmentProvider> = ({
  children,
  environments,
}) => {
  const defaultEnvironment =
    environments.find((e: IEnvironment) => {
      return __DEV__ ? e.isDebugDefault : e.isProductionDefault;
    }) || environments[0];

  const [environment, setEnvironment] =
    useState<IEnvironment>(defaultEnvironment);
  const [initializing, setInitializing] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      setInitializing(true);
      try {
        const savedEnv = await AsyncStorage.getItem('environment');

        if (savedEnv !== null) {
          // We don't use the saved env because the params could change over time
          // and with this we make usre that the environment used alwasy has the latest data
          const s = JSON.parse(savedEnv) as IEnvironment;
          const tempEnv = environments.find((e: IEnvironment) => {
            return e.id === s.id;
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
    setEnvironment(env);
    AsyncStorage.setItem('environment', JSON.stringify(env));
  };

  return (
    <EnvironmentContext.Provider
      value={{environment, changeEnvironment, initializing, environments}}>
      {children}
    </EnvironmentContext.Provider>
  );
};

export default EnvironmentProvider;

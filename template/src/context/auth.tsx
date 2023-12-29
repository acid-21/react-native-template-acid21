import React, {useEffect, createContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface IAuth {
  user: any;
  isSignedIn: boolean;
  params: any;
}

export type AuthContextType = {
  auth: IAuth;
  initializing: boolean;
  ready: boolean;
  setAuth: (auth: IAuth) => void;
  getSavedAuth: () => void;
};
export interface IAuthProvider {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
  auth: {
    user: null,
    isSignedIn: false,
    params: {},
  },
  initializing: true,
  ready: false,
  setAuth: () => {},
  getSavedAuth: () => {},
});

const AuthProvider: React.FC<IAuthProvider> = ({children}) => {
  const [initializing, setInitializing] = useState<boolean>(true);
  const [auth, setAuth] = useState<IAuth>({
    user: null,
    isSignedIn: false,
    params: {},
  });

  const ready = auth.isSignedIn && !initializing;

  useEffect(() => {
    (async () => {
      if (!initializing) {
        try {
          await AsyncStorage.setItem('auth', JSON.stringify(auth));
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }, [auth, initializing]);

  useEffect(() => {
    (async () => {
      setInitializing(true);
      try {
        const savedAuth = await AsyncStorage.getItem('auth');

        if (savedAuth !== null) {
          const {user, params} = JSON.parse(savedAuth);
          setAuth({user, params, isSignedIn: false});
        }
      } catch (error) {
        console.error(error);
      } finally {
        setInitializing(false);
      }
    })();
  }, []);

  const getSavedAuth = async () => {
    const savedAuth = await AsyncStorage.getItem('auth');
    console.log('savedAuth 1', savedAuth);

    if (savedAuth !== null) {
      return JSON.parse(savedAuth);
    } else {
      return {};
    }
  };

  return (
    <AuthContext.Provider
      value={{auth, setAuth, initializing, ready, getSavedAuth}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

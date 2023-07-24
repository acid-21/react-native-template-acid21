import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface IAuth {
  user: any;
  isSignedIn: boolean;
  params: any;
}

export type AuthContextType = {
  auth: IAuth;
  initializing: boolean;
  setAuth: (auth: IAuth) => void;
};
export interface IAuthProvider {
  children: React.ReactNode;
}

export const AuthContext = React.createContext<AuthContextType>({
  auth: {
    user: null,
    isSignedIn: false,
    params: {},
  },
  initializing: true,
  setAuth: () => {},
});

const AuthProvider: React.FC<IAuthProvider> = ({children}) => {
  const [initializing, setInitializing] = React.useState<boolean>(true);
  const [auth, setAuth] = React.useState<IAuth>({
    user: null,
    isSignedIn: false,
    params: {},
  });

  React.useEffect(() => {
    (async () => {
      setInitializing(true);
      try {
        const savedAuth = await AsyncStorage.getItem('auth');

        if (savedAuth !== null) {
          setAuth(JSON.parse(savedAuth));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setInitializing(false);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{auth, setAuth, initializing}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

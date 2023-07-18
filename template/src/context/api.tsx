import * as React from 'react';
import axios from 'axios';

export interface IAuth {
  user: any;
  isLoggedIn: boolean;
  params: any;
}

export type APIContextType = {
  getData: (path: string) => Promise<any>;
  postData: (path: string, data: any) => Promise<any>;
  putData: (path: string, data: any) => Promise<any>;
  deleteData: (path: string) => Promise<any>;
};
export interface IAuthProvider {
  children: React.ReactNode;
}

export const APIContext = React.createContext<APIContextType>({
  getData: async () => null,
  postData: async () => null,
  putData: async () => null,
  deleteData: async () => null,
});

const APIProvider: React.FC<IAuthProvider> = ({children}) => {
  const getData = React.useCallback(async (path: string) => {
    return await axios.get(path);
  }, []);
  const postData = React.useCallback(async (path: string, data: any) => {
    return await axios.post(path, data);
  }, []);
  const putData = React.useCallback(async (path: string, data: any) => {
    return await axios.put(path, data);
  }, []);
  const deleteData = React.useCallback(async (path: string) => {
    return await axios.delete(path);
  }, []);

  return (
    <APIContext.Provider value={{getData, postData, putData, deleteData}}>
      {children}
    </APIContext.Provider>
  );
};

export default APIProvider;

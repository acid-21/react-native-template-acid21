import React, {
  useEffect,
  useState,
  useCallback,
  createContext,
  useContext,
} from 'react';
import checkVersion from 'react-native-store-version';
import {Linking, Platform} from 'react-native';
import {ModalsContext} from './modals';
import {AppModals} from '../constants/modals';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {version} = require('../../package.json');

export type UpdateContextType = {
  updateAwailable: boolean;
  updateVersion: string;
  runUpdate: () => void;
  changeCheckForUpdate: (check: boolean) => void;
  checkForUpdate: boolean;
};
export interface IUpdateProvider {
  children: React.ReactNode;
  iosStoreURL: string;
  androidStoreURL: string;
  updateAndroidURL: string;
  updateIOSURL: string;
  country: string;
}

export const UpdateContext = createContext<UpdateContextType>({
  updateAwailable: false,
  updateVersion: '',
  runUpdate: () => {},
  changeCheckForUpdate: () => {},
  checkForUpdate: false,
});

const UpdateProvider: React.FC<IUpdateProvider> = ({
  children,
  iosStoreURL,
  androidStoreURL,
  updateAndroidURL,
  updateIOSURL,
  country,
}) => {
  const [checkForUpdate, setCheckForUpdate] = useState<boolean>(false);
  const [updateAwailable, setUpdateAwailable] = useState<boolean>(false);
  const [updateVersion, setUpdateVersion] = useState<string>(version);
  const {setOpenModal} = useContext(ModalsContext);

  useEffect(() => {
    (async () => {
      try {
        const savedCheckForUpdate = await AsyncStorage.getItem(
          'CheckForUpdate',
        );

        if (savedCheckForUpdate !== null) {
          setCheckForUpdate(savedCheckForUpdate === 'true');
        } else {
          setCheckForUpdate(true);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const changeCheckForUpdate = useCallback(async (check: boolean) => {
    setCheckForUpdate(check);
    AsyncStorage.setItem('CheckForUpdate', check ? 'true' : 'false');
  }, []);

  useEffect(() => {
    const init = async () => {
      if (!checkForUpdate) {
        return;
      }
      try {
        const localVersion = version;
        const check = await checkVersion({
          version: localVersion, // app local version
          //version: '9.10.17', // use this for test
          iosStoreURL,
          androidStoreURL,
          country, // default value is 'jp'
        });

        if (check.result === 'new') {
          setUpdateAwailable(true);
          setUpdateVersion(check.remote);
          setOpenModal(AppModals.UpdateModal, true);
          // if app store version is new
        } else {
          setUpdateAwailable(false);
        }
      } catch (e) {
        console.log(e);
      }
    };

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [androidStoreURL, country, iosStoreURL, checkForUpdate]);

  const runUpdate = useCallback(() => {
    let link = updateAndroidURL;

    if (Platform.OS === 'ios') {
      link = updateIOSURL;
    }

    Linking.openURL(link);
  }, [updateAndroidURL, updateIOSURL]);

  return (
    <UpdateContext.Provider
      value={{
        updateAwailable,
        updateVersion,
        runUpdate,
        checkForUpdate,
        changeCheckForUpdate,
      }}>
      {children}
    </UpdateContext.Provider>
  );
};

export default UpdateProvider;

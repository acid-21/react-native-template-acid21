import * as React from 'react';

export type ModalContextType = {
  isOpenModal: (name: string) => boolean;
  setOpenModal: (name: string, open: boolean) => void;
};
export interface IModalsProvider {
  children: React.ReactNode;
}

export const ModalsContext = React.createContext<ModalContextType>({
  isOpenModal: () => false,
  setOpenModal: () => {},
});

const ModalsProvider: React.FC<IModalsProvider> = ({children}) => {
  const [modals, setModals] = React.useState<any>({});

  const setOpenModal = (name: string, open: boolean) => {
    setModals((pr: any) => {
      return {...pr, [name]: open};
    });
  };

  const isOpenModal = React.useCallback(
    (name: string): boolean => {
      return modals ? modals[name] : false;
    },
    [modals],
  );

  return (
    <ModalsContext.Provider value={{setOpenModal, isOpenModal}}>
      {children}
    </ModalsContext.Provider>
  );
};

export default ModalsProvider;

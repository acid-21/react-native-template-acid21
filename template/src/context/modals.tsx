import React, {useState, createContext, useCallback} from 'react';

export type ModalContextType = {
  isOpenModal: (name: string) => boolean;
  setOpenModal: (name: string, open: boolean) => void;
};
export interface IModalsProvider {
  children: React.ReactNode;
}

export const ModalsContext = createContext<ModalContextType>({
  isOpenModal: () => false,
  setOpenModal: () => {},
});

const ModalsProvider: React.FC<IModalsProvider> = ({children}) => {
  const [modals, setModals] = useState<any>({});

  const setOpenModal = (
    name: string,
    open: boolean,
    closeOthers: boolean = true,
  ) => {
    if (closeOthers) {
      setModals({[name]: open});
    } else {
      setModals((pr: any) => {
        return {...pr, [name]: open};
      });
    }
  };

  const isOpenModal = useCallback(
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

import { createContext, PropsWithChildren, useContext, useState } from "react";

import {
  ActiveModals,
  ConfirmModalTypes,
  ConfirmModalsStore,
  ModalContextType,
  OpenModalType
} from "./types";

export const ModalContext = createContext<ModalContextType>(
  {} as ModalContextType
);

const ModalProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [openModal, setOpenModal] = useState<OpenModalType>(null);
  const [confirmModals, setOpenConfirmModal] = useState<ConfirmModalsStore>({});

  return (
    <ModalContext.Provider
      value={{
        openModal,
        setOpenModal,
        confirmModals,
        setOpenConfirmModal
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;

export const useModal = (
  modalType: OpenModalType
): [boolean, (isOpen: boolean) => void] => {
  const { openModal, setOpenModal } = useContext(ModalContext);

  return [
    openModal === modalType,
    (isOpen: boolean) => setOpenModal(isOpen ? modalType : null)
  ];
};

export const useConfirmModal = (
  key: ConfirmModalTypes
): [boolean, (isOpen: boolean) => void] => {
  const { confirmModals, setOpenConfirmModal } = useContext(ModalContext);

  const setIsOpen = (isOpen: boolean) =>
    setOpenConfirmModal((curr) => ({ ...curr, [key]: isOpen }));

  return [!!confirmModals[key], setIsOpen];
};

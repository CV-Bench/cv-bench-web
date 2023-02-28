import { Dispatch, SetStateAction } from "react";

export type OpenModalType = ActiveModals | null;

// Define unique non-confirm modal types
export enum ActiveModals {}

// Define unique confirmation modal types
export type ConfirmModalTypes = "test_confirmation";

export type ConfirmModalsStore = {
  [key: string]: boolean;
};

export interface ModalContextType {
  openModal: OpenModalType;
  setOpenModal: (openModal: OpenModalType) => void;

  confirmModals: ConfirmModalsStore;
  setOpenConfirmModal: Dispatch<SetStateAction<ConfirmModalsStore>>;
}

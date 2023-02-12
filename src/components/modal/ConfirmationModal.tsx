import React from "react"
import Button from "../Button"
import Modal, { ModalProps } from "./Modal"

export interface ConfirmationModalProps extends ModalProps {
  onConfirm: () => void
}

const ConfirmationModal: React.FC<React.PropsWithChildren<ConfirmationModalProps>> = ({ onConfirm, onClose, children, ...props }) => {

  const confirmClick = () => {
    onClose();
    onConfirm();
  }

  const cancelClick = () => {
    onClose();
  }

  return (
    <Modal onClose={onClose} {...props}>
      <div className="p-2 text-white text-center">
        {children}
      </div>
      <div className="flex justify-end m-2">
        <Button className="mr-2" color="red" onClick={cancelClick}>
          Cancel
        </Button>
        <Button color="green" onClick={confirmClick}>
          Ok
        </Button>
      </div>

    </Modal>
  )
}
export default ConfirmationModal

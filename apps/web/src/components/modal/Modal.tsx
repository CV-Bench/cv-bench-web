import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  size?: "lg" | "xl" | "2xl" | "4xl";
  className?: string;
}

const Modal: React.FC<React.PropsWithChildren<ModalProps>> = ({
  isOpen,
  onClose,
  children,
  className,
  size = "lg"
}) => {
  const sizeBreakpoint = {
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
    "2xl": "sm:max-w-2xl",
    "4xl": "sm:max-w-4xl"
  }[size];

  return (
    <Transition.Root as={Fragment} show={isOpen}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onClose}
      >
        <div className="flex items-end justify-center min-h-screen px-4 pb-20 pt-4 text-center sm:block lg:p-0">
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            as={React.Fragment}
          >
            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-slate-500 bg-opacity-75" />
          </Transition.Child>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
          &#8203;
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            as={Fragment}
          >
            <div
              className={`inline-block w-full text-left rounded-md align-bottom transition-all overflow-hidden transform bg-white dark:bg-slate-900 ${className} sm:my-8 sm:align-middle ${sizeBreakpoint} sm:w-full`}
            >
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default Modal;

import Modal from "@/components/modal/Modal";
import { useState } from "react";
import { PostDatasetConfiguration } from "shared-types";

export interface DatasetConfigurationModalProps {
    isOpen: boolean;
    onConfigurationSave: (configId: string) => void;
}

const DatasetConfigurationModal: React.FC<DatasetConfigurationModalProps> = ({ isOpen, onConfigurationSave }) => {

    const onClose = () => {
        // ToDo save config in db

        onConfigurationSave('');
    }
    return (
    <Modal isOpen={isOpen} onClose={onClose}>

    </Modal>
    )
};

export default DatasetConfigurationModal;
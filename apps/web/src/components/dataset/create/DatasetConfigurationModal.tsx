import Button from "@/components/Button";
import InputField from "@/components/inputs/InputField";
import InputLabel from "@/components/inputs/InputLabel";
import Modal from "@/components/modal/Modal";
import { useDatasetConfiguration } from "@/hooks/datasetConfiguration";
import { api } from "@/network";
import { setConfig } from "next/config";
import { useEffect, useState } from "react";
import { BlenderConfiguration, ConfigurationType, GetDatasetConfiguration, PostDataset, PostDatasetConfiguration } from "shared-types";

export interface DatasetConfigurationModalProps {
  dataset: PostDataset;
  setDataset: (val: PostDataset) => void;

  configuration: PostDatasetConfiguration;
  setConfiguration: (val: PostDatasetConfiguration) => void;

  isOpen: boolean;
  onClose: () => void;
}

const DatasetConfigurationModal: React.FC<DatasetConfigurationModalProps> = ({ dataset, setDataset, configuration, setConfiguration, isOpen, onClose }) => {
  const updateConfigId = (configurationId: string) => setDataset({...dataset, configurationId});

  const setName = (name: string) => setConfiguration({ ...configuration, name });

  const onSave = async () => {
    if (!dataset.configurationId) {
      const result = await api.postDatasetConfiguration(configuration);
      updateConfigId(result);
    }
    else {
      const result = await api.patchDatasetConfiguration(dataset.configurationId, configuration);
      updateConfigId(result);
    }
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <InputLabel>Name</InputLabel>
        <InputField type="text" value={configuration.name} onChange={e => setName((e.target as HTMLInputElement).value)} />
      </div>

      <Button onClick={onSave}>{dataset.configurationId ? 'Update' : 'Create'}</Button>
    </Modal>
  )
};

export default DatasetConfigurationModal;
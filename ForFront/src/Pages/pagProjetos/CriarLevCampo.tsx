import { Modal } from "@mantine/core";
import FormularioLevCampo from "../../Components/layout/Formularios/formsLevCampo";
import styles from "./projCss/criarProj.module.css";

interface ModalLevCampo {
  openedAmbiente: boolean;
  onClose: () => void;
}

export default function ModalLevCampo ({ openedAmbiente, onClose }: ModalLevCampo ) {
  return (
    <Modal 
      radius="8px"
      opened={openedAmbiente} 
      onClose={onClose} 
      title="Levantamento de Campo" 
      size="1150px" 
      padding="lg"
      centered
      zIndex={5000} 
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      classNames={{ title: styles.modalLabel }}
    >
      <FormularioLevCampo
        onSubmitSuccess={() => {
          onClose();
        }} 
        onCancel={onClose} 
      />
    </Modal>
  );
}
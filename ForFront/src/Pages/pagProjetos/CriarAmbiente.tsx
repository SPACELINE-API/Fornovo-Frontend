import { Modal } from "@mantine/core";
import styles from "./projCss/criarProj.module.css";
import FormularioLevCampo from "../../Components/layout/Formularios/formsLevCampo";

interface ModalCriarAmbienteProps {
  opened: boolean;
  onClose: () => void;
}

export default function ModalCriarAmbiente({ opened, onClose }: ModalCriarAmbienteProps) {
  return (
    <Modal 
      radius="8px"
      opened={opened} 
      onClose={onClose} 
      title="Levantamento de Campo" 
      size="lg" 
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
        onSubmitSuccess={() => onClose()} 
      />
    </Modal>
  );
}
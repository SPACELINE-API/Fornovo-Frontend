import { Modal } from "@mantine/core";
import FormularioLevCampo from "../../Components/layout/Formularios/formsLevCampo";
import styles from "./projCss/criarProj.module.css";
import type { Ambiente } from "../../types/resumo";

interface ModalLevCampo {
  openedAmbiente: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  initialData?: Ambiente | null;
}

export default function ModalLevCampo ({ openedAmbiente, onClose, onSuccess, initialData }: ModalLevCampo ) {
  return( 
    <Modal 
      radius="8px"
      opened={openedAmbiente} 
      onClose={onClose} 
      title={initialData ? "Editar Ambiente" : "Levantamento de Campo"} 
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
        initialData={initialData}
        onSubmitSuccess={() => {
          onClose();
          onSuccess?.();
        }} 
        onCancel={onClose} 
      />
    </Modal>
  );
}
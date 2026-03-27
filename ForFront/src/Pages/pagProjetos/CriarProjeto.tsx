import { Modal } from "@mantine/core";
import FormularioProjeto from "../../Components/layout/Formularios/formsProj";
import styles from "./projCss/criarProj.module.css";

interface ModalCriarProjetoProps {
  opened: boolean;
  onClose: () => void;
  atualizarProjetos: () => void;
}

export default function ModalCriarProjeto({ opened, onClose, atualizarProjetos }: ModalCriarProjetoProps) {
  return (
    <Modal 
      radius="8px"
      opened={opened} 
      onClose={onClose} 
      title="Novo Projeto" 
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
      <FormularioProjeto 
        onSubmitSuccess={() => {
          atualizarProjetos();
          onClose();
        }} 
        onCancel={onClose} 
      />
    </Modal>
  );
}
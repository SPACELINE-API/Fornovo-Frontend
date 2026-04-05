import { Modal } from '@mantine/core';
import FormularioProjeto from '../../Components/layout/Formularios/formsProj';
import styles from './projCss/criarProj.module.css';

interface ModalEditarProjetoProps {
  opened: boolean;
  onClose: () => void;
  atualizarProjetos: () => void;
  projeto: any;
}

export default function ModalEditarProjeto({
  opened,
  onClose,
  atualizarProjetos,
  projeto,
}: ModalEditarProjetoProps) {
  return (
    <Modal
      radius="8px"
      opened={opened}
      onClose={onClose}
      title="Editar Projeto"
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
        initialData={projeto}
        onSubmitSuccess={() => {
          atualizarProjetos();
          onClose();
        }}
        onCancel={onClose}
      />
    </Modal>
  );
}

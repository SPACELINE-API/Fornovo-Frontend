import { Modal, ScrollArea } from '@mantine/core';
import FormsNormas from '../../Components/layout/Formularios/formsNormas';
import styles from '../pagProjetos/projCss/criarProj.module.css';
import type { NormaFormData } from '../../Components/layout/Formularios/formsNormas';

interface ModalNormasProps {
  opened: boolean;
  onClose: () => void;
  onSubmitSuccess?: () => void;
  initialData?: NormaFormData | null;
}

export default function ModalNovaNorma({ opened, onClose, onSubmitSuccess, initialData }: ModalNormasProps) {
  const handleSuccess = () => {
    onClose();
    onSubmitSuccess?.();
  };

  return (
    <Modal
      radius="8px"
      opened={opened}
      onClose={onClose}
      title={initialData ? 'Editar Norma' : 'Nova Norma'}
      size="lg"
      padding="lg"
      scrollAreaComponent={ScrollArea.Autosize}
      centered
      zIndex={5000}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      classNames={{ title: styles.modalLabel }}
    >
      <FormsNormas onSubmitSuccess={handleSuccess} onCancel={onClose} />
    </Modal>
  );
}

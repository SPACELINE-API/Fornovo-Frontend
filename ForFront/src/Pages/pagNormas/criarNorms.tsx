import { Modal, ScrollArea } from '@mantine/core';
import FormsNormas from '../../Components/layout/Formularios/formsNormas';
import styles from '../pagProjetos/projCss/criarProj.module.css';

interface ModalNormasProps {
  opened: boolean;
  onClose: () => void;
}

export default function ModalNovaNorma({ opened, onClose }: ModalNormasProps) {
  return (
    <Modal
      radius="8px"
      opened={opened}
      onClose={onClose}
      title="Nova Norma"
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
      <FormsNormas
        onSubmitSuccess={() => {
          onClose();
        }}
        onCancel={onClose}
      />
    </Modal>
  );
}

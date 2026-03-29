import { Modal, ScrollArea } from '@mantine/core';
import FormsNormas from '../../Components/layout/Formularios/formsNormas';
import type { NormaFormData } from '../../Components/layout/Formularios/formsNormas';

interface ModalEditarNormaProps {
  opened: boolean;
  onClose: () => void;
  norma: NormaFormData | null;
  onSubmitSuccess: () => void;
}

export default function ModalEditarNorma({
  opened,
  onClose,
  norma,
  onSubmitSuccess,
}: ModalEditarNormaProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Editar Norma"
      size="lg"
      padding="lg"
      scrollAreaComponent={ScrollArea.Autosize}
      centered
    >
      {norma && (
        <FormsNormas
          initialData={norma}
          onCancel={onClose}
          onSubmitSuccess={() => {
            onClose();
            onSubmitSuccess();
          }}
        />
      )}
    </Modal>
  );
}

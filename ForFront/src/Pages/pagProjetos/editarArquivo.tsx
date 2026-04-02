import { Modal, ScrollArea } from '@mantine/core';
import type { ArquivoNormData } from '../../Components/layout/Formularios/formsArquivos';
import FormsArquivos from '../../Components/layout/Formularios/formsArquivos';

interface ModalEditarArquivoProps {
  opened: boolean;
  onClose: () => void;
  arquivo: ArquivoNormData | null;
  onSubmitSuccess: (arquivo: ArquivoNormData) => void;
  onIniciarIA?: () => void;
  onIAconcluida?: () => void;
  onIAerro?: () => void;
}

export default function ModalEditarArquivo({
  opened,
  onClose,
  arquivo,
  onSubmitSuccess,
  onIniciarIA,
  onIAconcluida,
  onIAerro,
}: ModalEditarArquivoProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Editar Arquivo"
      size="lg"
      padding="lg"
      scrollAreaComponent={ScrollArea.Autosize}
      centered
    >
      {arquivo && (
        <FormsArquivos
          initialArquivo={arquivo}
          onCancel={onClose}
          onSubmitSuccess={(novoArquivo) => {
            onClose();
            onSubmitSuccess(novoArquivo);
            onIniciarIA?.();
          }}
          onIniciarIA={onIniciarIA}
          onIAconcluida={onIAconcluida}
          onIAerro={onIAerro}
        />
      )}
    </Modal>
  );
}

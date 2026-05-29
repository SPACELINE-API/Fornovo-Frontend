import { Modal, ScrollArea } from '@mantine/core';
import FormsFuncionario from '../../Components/layout/Formularios/formsFuncionario';
import styles from '../pagProjetos/projCss/criarProj.module.css';
import type { ModalCriarFuncProps } from '../../types/funcionarios';




export default function ModalNovoFunc({ opened, onClose, onSubmitSuccess, initialData}: ModalCriarFuncProps) {
  const handleSuccess = () => {
    onClose();
    onSubmitSuccess?.();

  };
  return (
    <Modal
      radius="8px"
      opened={opened}
      onClose={onClose}
      title={initialData ? 'Editar dados do Funcionário' : 'Cadastrar Funcionário'}
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
      <FormsFuncionario onSubmitSuccess={handleSuccess} onCancel={onClose} />
    </Modal>
  );
}
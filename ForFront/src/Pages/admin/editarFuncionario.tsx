import { Modal, ScrollArea } from '@mantine/core';
import FormsFuncionario from '../../Components/layout/Formularios/formsFuncionario';
import type { ModalEditarFuncProps } from '../../types/funcionarios';
import styles from '../pagProjetos/projCss/criarProj.module.css';


export default function ModalEditarFunc({ opened, onClose, onSubmitSuccess, func}: ModalEditarFuncProps) {
  return (
    <Modal
      radius="8px"
      opened={opened}
      onClose={onClose}
      title={'Editar Funcionário'}
      size="lg"
      padding="lg"
      scrollAreaComponent={ScrollArea.Autosize}
      centered
      classNames={{ title: styles.modalLabel }}
      >
      {func && (
        <FormsFuncionario
          initialData={func}
          onCancel={onClose}
          onSubmitSuccess={() => {
            onClose();
            onSubmitSuccess?.();
          }}
          
        />
      )}
    </Modal>
  );
}
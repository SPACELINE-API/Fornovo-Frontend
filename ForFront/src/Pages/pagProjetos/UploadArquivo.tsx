import { Modal } from "@mantine/core";
import styles from "./projCss/criarProj.module.css";
import FormularioArquivos from "../../Components/layout/Formularios/formsArquivos";

interface ModalArquivosProps { 
    openedArquivo: boolean;
    onClose: () => void;
    onIniciarIA?: () => void;
    onIAconcluida?: () => void;
    onIAerro?: () => void;
}

export default function ModalArquivos({ 
    openedArquivo, 
    onClose, 
    onIniciarIA, 
    onIAconcluida, 
    onIAerro 
}: ModalArquivosProps) {
    return (
        <Modal
            radius="8px"
            opened={openedArquivo}
            onClose={onClose}
            title="Upload arquivo"
            size="600px"
            padding="lg"
            centered
            zIndex={5000}
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
            classNames={{ title: styles.modalLabel }}
        >
            <FormularioArquivos
                onSubmitSuccess={() => {
                    onClose();
                    onIniciarIA?.(); 
                }}
                onCancel={onClose}
                onIniciarIA={onIniciarIA}
                onIAconcluida={onIAconcluida}
                onIAerro={onIAerro}
            />
        </Modal>
    );
}
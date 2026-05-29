import { Modal } from "@mantine/core";
import FormsRelatorio from "../../Components/layout/Formularios/formsRelatorio";
import styles from "./projCss/criarProj.module.css";

interface ModalRelatorioProps {
    opened : boolean,
    onClose : () => void;
    onSuccess : () => void;
}

function ModalRelatorio({opened, onClose, onSuccess} : ModalRelatorioProps) {
    return (
        <Modal
            title="Upload arquivo"
            opened={opened}
            onClose={onClose}
            classNames={{ title: styles.modalLabel }}
            radius="8px"
            size="550px"
            padding="lg"
            centered
            zIndex={5000}
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <FormsRelatorio onClose={onClose} onSuccess={onSuccess} />
        </Modal>
    )
}

export default ModalRelatorio;
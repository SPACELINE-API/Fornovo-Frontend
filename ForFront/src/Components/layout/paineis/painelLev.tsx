import { FileText } from 'lucide-react';
import styles from './Painel.module.css';

interface PainelLevantamentoProps {
  vazio: boolean;
  onVisualizar: () => void;
}

function PainelLevantamento({ vazio, onVisualizar }: PainelLevantamentoProps) {
  return (
    <div className={styles.containerLevantamento}>
      <div className={styles.levHeader}>
        <div className={styles.levTitulo}>
          <FileText size={15} strokeWidth={1.75} />
          <span>Levantamento de campo</span>
        </div>
        {!vazio && <span className={styles.levBadge}>Preenchido</span>}
      </div>

      {vazio ? (
        <p className={styles.levVazio}>Ainda não cadastrado.</p>
      ) : (
        <button className={styles.btnVisualizar} onClick={onVisualizar}>
          Visualizar
        </button>
      )}
    </div>
  );
}

export default PainelLevantamento;

import styles from './dashCss/iaBanner.module.css';
import { X } from 'lucide-react';

interface IaBannerProps {
  estado: 'processando' | 'concluida' | 'erro';
  onClose?: () => void;
}

function IaBanner({ estado, onClose }: IaBannerProps) {
  if (estado === 'processando') {
    return (
      <div className={styles.banner}>
        <span className={styles.spinner} />
        <div className={styles.texto}>
          <span className={styles.titulo}>IA analisando o projeto...</span>
          <span className={styles.desc}>
            Verificando conformidade NBR. Isso pode levar alguns minutos.
          </span>
          <div className={styles.track}>
            <div className={styles.fillIndeterminado} />
          </div>
        </div>
      </div>
    );
  }

  if (estado === 'concluida') {
    return (
      <div className={`${styles.banner} ${styles.bannerSucesso}`}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
          <circle cx="9" cy="9" r="9" fill="#EAF5EF" />
          <path
            d="M5 9l3 3 5-5"
            stroke="#2E7D52"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className={styles.texto}>
          <span className={styles.titulo}>Análise concluída</span>
          <span className={styles.desc}>Memorial de cálculo disponível para download.</span>
          <div className={styles.track}>
            <div className={`${styles.fill} ${styles.fillSucesso}`} style={{ width: '100%' }} />
          </div>
        </div>

        {onClose     && (
          <button onClick={onClose} className={styles.botaoFechar} aria-label="Fechar banner">
            <X size={16} color="#2E7D52" />
          </button>
        )}
      </div>
    );
  }

  if (estado === 'erro') {
    return (
      <div className={`${styles.banner} ${styles.bannerErro}`}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
          <circle cx="9" cy="9" r="9" fill="#FCEBEB" />
          <path d="M6 6l6 6M12 6l-6 6" stroke="#A32D2D" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <div className={styles.texto}>
          <span className={`${styles.titulo} ${styles.tituloErro}`}>Falha no processamento</span>
          <span className={`${styles.desc} ${styles.descErro}`}>
            Não foi possível analisar o arquivo.{' '}
          </span>
          <div className={styles.track} style={{ background: '#F7C1C1' }}>
            <div className={`${styles.fill} ${styles.fillErro}`} style={{ width: '40%' }} />
          </div>
        </div>

        {onClose && (
          <button onClick={onClose} className={styles.botaoFechar} aria-label="Fechar banner">
            <X size={16} color="#7d2727" />
          </button>
        )}
      </div>
    );
  }

  return null;
}

export default IaBanner;

import styles from './dashCss/barraPesquisa.module.css';
import { Search } from 'lucide-react';

interface BarraPesquisaProps {
  busca: string;
  setBusca: React.Dispatch<React.SetStateAction<string>>;
}

function BarraPesquisa({ busca, setBusca }: BarraPesquisaProps) {
  return (
    <div className={styles.containerPesquisa}>
      <Search size={18} className={styles.iconePesquisa} />

      <input
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className={styles.barraPesquisa}
        type="text"
        placeholder="Pesquisar"
      />
    </div>
  );
}

export default BarraPesquisa;

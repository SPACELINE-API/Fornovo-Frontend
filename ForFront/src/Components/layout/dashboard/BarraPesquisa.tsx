import styles from './dashCss/barraPesquisa.module.css';

interface BarraPesquisaProps {
    busca : string,
    setBusca : React.Dispatch<React.SetStateAction<string>>
}

function BarraPesquisa({busca, setBusca} : BarraPesquisaProps) {
    return (
        <>
            <input value={busca} onChange={(e) => setBusca(e.target.value)} className={styles.barraPesquisa} type='text' placeholder='Pesquisar'></input>
        </>
    )
}

export default BarraPesquisa;
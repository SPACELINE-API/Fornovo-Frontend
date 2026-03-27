import styles from '../../Styles/paginas/Resumo.module.css';
import PainelProjeto from '../../Components/layout/paineis/painelProjeto';
import { useState, useEffect } from 'react';
import { Modal, Button } from '@mantine/core';
import PainelArquivos from '../../Components/layout/paineis/painelArquivos';
import PainelResponsaveis from '../../Components/layout/paineis/painelResponsaveis';
import type { LevantamentoDados } from '../../types/resumo';
import TabelaLevantamento from '../../Components/layout/paineis/tabelaLevantamento';
import { FileText } from 'lucide-react';
import api from '../../Services/apiService';
import { useParams } from 'react-router-dom';
import { capitalizar, formatarData, capitalizarNome } from '../../utils/formatos';

interface Projeto {
    id_projeto: string,
    nome_projeto: string,
    status: string,
    engenheiro_nome: string,
    data_inicio: string,
    data_fim: string,
    cliente: string,
    localizacao: string
}

function Resumo() {

    const [aberto, setAberto] = useState(false);
    const [carregando, setCarregando] = useState(true);
    const [projeto, setProjeto] = useState<Projeto | null>(null);
    const [levantamento, setLevantamento] = useState<LevantamentoDados | null>(null);
    const [vazio, setVazio] = useState(true);

    const { id } = useParams();

    useEffect(() => {
        async function buscarProjeto() {
            try {
                const response = await api.get(`projetos/buscarProjeto/${id}`);
                setProjeto(response.data);
            }
            catch (error) {
                console.log(error);
            }
            finally {
                setCarregando(false);
            }
        }
        if (id) {
            buscarProjeto();
        }
    }, [id])

    useEffect(() => {
        async function dadosLevantamento() {
            try {
                const response = await api.get(`calculos/form-levantamento/1`);
                setLevantamento(response.data);
                setVazio(false);
            }
            catch (error) {
                console.log(error);
                setVazio(true);
            }
            finally {
                setCarregando(false);
            }
        }
        if (id) {
            dadosLevantamento();
        }
    }, [id])

    if (carregando || !projeto) {
        return (
            <div>
                <p>Carregando informações do projeto...</p>
            </div>
        )
    }
    else {
        return (
            <div className={styles.containerDetalhes}>
                <h1>{capitalizar(projeto.nome_projeto)}</h1>
                <h3>Status: <span className={styles.status}>{capitalizar(projeto.status)}</span></h3>

                <div className={styles.containerConteudo}>
                    <div className={styles.containerEsquerdo}>
                        <h3>Informações gerais</h3>
                        {projeto && (
                            <PainelProjeto
                                cliente={capitalizar(projeto.cliente)}
                                localizacao={capitalizar(projeto.localizacao)}
                                dataInicio={formatarData(projeto.data_inicio)}
                                prazo={formatarData(projeto.data_fim)}
                            />
                        )}
                        <PainelResponsaveis dados={[{ nome: capitalizarNome(projeto.engenheiro_nome), funcao: "Engenheiro" }]} />
                    </div>
                    <div className={styles.containerDireito}>
                        <h3>Arquivos associados</h3>
                        <PainelArquivos />
                        <div className={styles.containerLevantamento}>
                            <div className={styles.titulo}>
                                <FileText size={'20px'} />
                                <p>Levantamento de campo</p>
                            </div>
                            <Button style={{
                                backgroundColor: '#34623f',
                                color: '#fff',
                                padding: '8px',
                                border: 'none',
                                borderRadius: '3px',
                                marginTop: '20px',
                                fontSize: '0.8rem',
                                fontWeight: '450',
                                height: 'auto'
                            }}
                                onClick={() => setAberto(true)}>
                                Visualizar
                            </Button>

                            <Modal
                                opened={aberto}
                                onClose={() => setAberto(false)}
                                size="60%"
                                centered
                            >
                                {vazio ? (
                                    <p>Levantamento ainda não cadastrado.</p>
                                ) : levantamento ? (
                                    <TabelaLevantamento dados={levantamento} />
                                ) : (
                                    <p>Carregando levantamento...</p>
                                )}
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Resumo;
import styles from '../../Styles/paginas/Resumo.module.css';
import PainelProjeto from '../../Components/layout/paineis/painelProjeto';
import { useState } from 'react';
import { Modal, Button } from '@mantine/core';
import PainelArquivos from '../../Components/layout/paineis/painelArquivos';
import PainelResponsaveis from '../../Components/layout/paineis/painelResponsaveis';
import type { LevantamentoDados } from '../../types/resumo';
import TabelaLevantamento from '../../Components/layout/paineis/tabelaLevantamento';
import { FileText } from 'lucide-react';

const dadosProjeto = [
    { cliente: "Cliente x", localizacao: "Cliente", dataInicio: "22/01/2021", prazo: "22/02/2026" }
]

const dadosResponsaveis = [
    { nome: "Ana Lopes", funcao: "Projetista" },
    { nome: "Everton Gomes", funcao: "Projetista" },
    { nome: "Yuri Menezes", funcao: "Projetista" },
    { nome: "João Lima", funcao: "Projetista" },
]

const dadosLevantamento: LevantamentoDados = {
    nome: "Sala Comercial",
    comprimentoAmbiente: 5,
    larguraAmbiente: 4,
    alturaAmbiente: 2.8,
    areaAmbiente: 12,

    tomadas: 10,
    iluminacao: 6,
    interruptores: 3,
    tipoTomada: "2P+T",
    tipoInterruptor: "Simples",
    tipoLuminaria: "LED",
    alturaInstalacao: 1.2,

    cabos: [
        { circuito: "C1", secao: 2.5 },
        { circuito: "C2", secao: 4 }
    ],

    disjuntores: [
        { amperagem: 20, quantidade: 2 }
    ],

    hastesAterramento: 2,
    caixasInspecao: 1,
    terminaisAereos: 4,

    quadrosRede: 1,
    patchCords: 10,
    cameras: 3,

    cabeamentos: [
        { circuito: "C1", comprimento: 15 }
    ],

    ramais: [
        { nome: "R1", diametro: 25, comprimento: 10 }
    ],

    reservatorio: {
        tipo: "Caixa d'água",
        capacidade: 1000
    },

    conteineres: 2,
    banheirosQuimicos: 1,

    fundacoes: [
        {
            tipo: "Sapata",
            profundidade: 2,
            volumeLastro: 3,
            volumeConcreto: 5,
            pesoFerragem: 200,
            pesoEstribo: 50,
            areaForma: 10
        }
    ]
};

function Resumo() {

    const [aberto, setAberto] = useState(false)

    return (
        <div className={styles.containerDetalhes}>
            <h1>Nome do projeto</h1>
            <h3>Status: <span className={styles.status}>Ativo</span></h3>

            <div className={styles.containerSuperior}>
                <div className={styles.containerInfosGerais}>
                    <div className={styles.bloco}>
                        <h3>Informações gerais</h3>
                        {dadosProjeto.map((dado, index) => (
                            <PainelProjeto
                                key={index}
                                cliente={dado.cliente}
                                localizacao={dado.localizacao}
                                dataInicio={dado.dataInicio}
                                prazo={dado.prazo}
                            />
                        ))}
                    </div>
                    <div>
                        <PainelResponsaveis dados={dadosResponsaveis} />
                    </div>
                </div>
                <div className={styles.bloco}>
                    <h3>Arquivos associados</h3>
                    <PainelArquivos />
                    <div className={styles.containerLevantamento}>
                        <div className={styles.titulo}>
                            <FileText />
                            <p>Levantamento de campo</p>
                        </div>
                        <Button style={{
                            backgroundColor: '#34623f',
                            color: '#fff',
                            padding: '6px',
                            border: 'none',
                            borderRadius: '3px',
                            marginTop: '20px',
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
                            <TabelaLevantamento dados={dadosLevantamento} />
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Resumo;
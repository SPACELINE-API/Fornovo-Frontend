import { Table, Text, Stack } from '@mantine/core';
import type { LevantamentoDados } from '../../../types/resumo';

type Props = {
    dados: LevantamentoDados;
};

function TabelaLevantamento({ dados } : Props) {
  return (
    <Stack>

      <Text fw={700} fz="xl">Levantamento de Campo</Text>
      <Text c="dimmed">Visualização dos dados preenchidos no formulário</Text>

      {/* Ambiente */}
      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Tbody>
          <Table.Tr><Table.Td fw={700} ta="center" colSpan={2}>Ambiente</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Nome</Table.Td><Table.Td>{dados.nome}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Comprimento</Table.Td><Table.Td>{dados.comprimentoAmbiente} m</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Largura</Table.Td><Table.Td>{dados.larguraAmbiente} m</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Altura</Table.Td><Table.Td>{dados.alturaAmbiente} m</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Área</Table.Td><Table.Td>{dados.areaAmbiente} m</Table.Td></Table.Tr>
        </Table.Tbody>
      </Table>

      {/* Elétrica */}
      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Tbody>
          <Table.Tr><Table.Td fw={700} ta="center" colSpan={2}>Elétrica</Table.Td></Table.Tr>
          <Table.Tr><Table.Td fw={700} ta="center" colSpan={2}>Pontos Elétricos</Table.Td></Table.Tr>

          <Table.Tr><Table.Td>Tomadas</Table.Td><Table.Td>{dados.tomadas}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Iluminação</Table.Td><Table.Td>{dados.iluminacao}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Interruptores</Table.Td><Table.Td>{dados.interruptores}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Tipo de Tomada</Table.Td><Table.Td>{dados.tipoTomada}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Tipo de Interruptor</Table.Td><Table.Td>{dados.tipoInterruptor}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Tipo de Luminária</Table.Td><Table.Td>{dados.tipoLuminaria}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Altura de Instalação</Table.Td><Table.Td>{dados.alturaInstalacao} m</Table.Td></Table.Tr>

          <Table.Tr><Table.Td fw={700} ta="center" colSpan={2}>Cabos por Circuito</Table.Td></Table.Tr>
          <Table.Tr><Table.Td fw={500}>Circuito</Table.Td><Table.Td fw={500}>Seção (mm²)</Table.Td></Table.Tr>
          {dados.cabos.map((c, i) => (
            <Table.Tr key={i}>
              <Table.Td>{c.circuito}</Table.Td>
              <Table.Td>{c.secao}</Table.Td>
            </Table.Tr>
          ))}

          <Table.Tr><Table.Td fw={700} ta="center" colSpan={2}>Disjuntores</Table.Td></Table.Tr>
          <Table.Tr><Table.Td fw={500}>Amperagem</Table.Td><Table.Td fw={500}>Quantidade</Table.Td></Table.Tr>
          {dados.disjuntores.map((d, i) => (
            <Table.Tr key={i}>
              <Table.Td>{d.amperagem}</Table.Td>
              <Table.Td>{d.quantidade}</Table.Td>
            </Table.Tr>
          ))}

          <Table.Tr><Table.Td fw={700} ta="center" colSpan={2}>Aterramento e SPDA</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Hastes</Table.Td><Table.Td>{dados.hastesAterramento}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Caixas</Table.Td><Table.Td>{dados.caixasInspecao}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Terminais</Table.Td><Table.Td>{dados.terminaisAereos}</Table.Td></Table.Tr>

          <Table.Tr><Table.Td fw={700} ta="center" colSpan={2}>Telefonia / CFTV</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Quadros</Table.Td><Table.Td>{dados.quadrosRede}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Patch</Table.Td><Table.Td>{dados.patchCords}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Câmeras</Table.Td><Table.Td>{dados.cameras}</Table.Td></Table.Tr>

          <Table.Tr><Table.Td fw={700} ta="center" colSpan={2}>Cabeamento</Table.Td></Table.Tr>
          <Table.Tr><Table.Td fw={500}>Circuito</Table.Td><Table.Td fw={500}>Comprimento</Table.Td></Table.Tr>
          {dados.cabeamentos.map((c, i) => (
            <Table.Tr key={i}>
              <Table.Td>{c.circuito}</Table.Td>
              <Table.Td>{c.comprimento}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      {/* Hidráulica */}
      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Tbody>
          <Table.Tr><Table.Td fw={700} ta="center" colSpan={3}>Hidráulica</Table.Td></Table.Tr>

          <Table.Tr><Table.Td fw={700} colSpan={3}>Ramais</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Nome</Table.Td><Table.Td>Diâmetro</Table.Td><Table.Td>Comprimento</Table.Td></Table.Tr>
          {dados.ramais.map((r, i) => (
            <Table.Tr key={i}>
              <Table.Td>{r.nome}</Table.Td>
              <Table.Td>{r.diametro}</Table.Td>
              <Table.Td>{r.comprimento}</Table.Td>
            </Table.Tr>
          ))}

          <Table.Tr><Table.Td fw={700} colSpan={3}>Reservatório</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Tipo</Table.Td><Table.Td colSpan={2}>{dados.reservatorio.tipo}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Capacidade</Table.Td><Table.Td colSpan={2}>{dados.reservatorio.capacidade} L</Table.Td></Table.Tr>
        </Table.Tbody>
      </Table>

      {/* Serviços */}
      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Tbody>
          <Table.Tr><Table.Td fw={700} ta='center' colSpan={2}>Serviços</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Contêineres</Table.Td><Table.Td>{dados.conteineres}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Banheiros</Table.Td><Table.Td>{dados.banheirosQuimicos}</Table.Td></Table.Tr>
        </Table.Tbody>
      </Table>

      {/* Estrutura */}
      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Tbody>
          <Table.Tr><Table.Td fw={700} ta='center' colSpan={7}>Estrutura</Table.Td></Table.Tr>
          {dados.fundacoes.map((f, i) => (
            <Table.Tr key={i}>
              <Table.Td>{f.tipo}</Table.Td>
              <Table.Td>{f.profundidade}</Table.Td>
              <Table.Td>{f.volumeLastro}</Table.Td>
              <Table.Td>{f.volumeConcreto}</Table.Td>
              <Table.Td>{f.pesoFerragem}</Table.Td>
              <Table.Td>{f.pesoEstribo}</Table.Td>
              <Table.Td>{f.areaForma}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

    </Stack>
  );
}

export default TabelaLevantamento;
import { Table, Text, Stack } from '@mantine/core';
import type { LevantamentoDados } from '../../../types/resumo';

type Props = {
  dados: LevantamentoDados;
};

function TabelaLevantamento({ dados }: Props) {
  return (
    <Stack>

      <Text fw={700} fz="xl">Levantamento de Campo</Text>
      <Text c="dimmed">Visualização dos dados preenchidos no formulário</Text>

      {/* Ambiente */}
      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Tbody>
          <Table.Tr><Table.Td fw={700} ta="center" colSpan={2}>Ambiente</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Nome</Table.Td><Table.Td>{dados.nome}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Comprimento</Table.Td><Table.Td>{dados.comprimento} m</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Largura</Table.Td><Table.Td>{dados.largura} m</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Altura</Table.Td><Table.Td>{dados.altura} m</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Área</Table.Td><Table.Td>{dados.area} m</Table.Td></Table.Tr>
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
          {dados.cabos?.map((c, i) => (
            <Table.Tr key={i}>
              <Table.Td>{c.circuito}</Table.Td>
              <Table.Td>{c.secao}</Table.Td>
            </Table.Tr>
          ))}

          <Table.Tr><Table.Td fw={700} ta="center" colSpan={2}>Disjuntores</Table.Td></Table.Tr>
          <Table.Tr><Table.Td fw={500}>Amperagem</Table.Td><Table.Td fw={500}>Quantidade</Table.Td></Table.Tr>
          {dados.disjuntores?.map((d, i) => (
            <Table.Tr key={i}>
              <Table.Td>{d.amperagem}</Table.Td>
              <Table.Td>{d.quantidade}</Table.Td>
            </Table.Tr>
          ))}

          <Table.Tr><Table.Td fw={700} ta="center" colSpan={2}>Aterramento e SPDA</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Hastes de Aterramento</Table.Td><Table.Td>{dados.hastesAterramento}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Caixas de Inspeção</Table.Td><Table.Td>{dados.caixasInspecao}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Terminais Aéreos</Table.Td><Table.Td>{dados.terminaisAereos}</Table.Td></Table.Tr>

          <Table.Tr><Table.Td fw={700} ta="center" colSpan={2}>Telefonia, Rede e CFTV</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Quadros de rede</Table.Td><Table.Td>{dados.quadrosRede}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Patch Cords</Table.Td><Table.Td>{dados.patchCords}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Câmeras</Table.Td><Table.Td>{dados.cameras}</Table.Td></Table.Tr>

          <Table.Tr><Table.Td fw={700} ta="center" colSpan={2}>Cabeamento por circuito</Table.Td></Table.Tr>
          <Table.Tr><Table.Td fw={500}>Circuito</Table.Td><Table.Td fw={500}>Comprimento</Table.Td></Table.Tr>
          {dados.cabeamentos?.map((c, i) => (
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

          <Table.Tr><Table.Td fw={700} ta="center" colSpan={3}>Ramais</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Nome</Table.Td><Table.Td>Diâmetro</Table.Td><Table.Td>Comprimento</Table.Td></Table.Tr>
          {dados.ramais?.map((r, i) => (
            <Table.Tr key={i}>
              <Table.Td>{r.nome}</Table.Td>
              <Table.Td>{r.diametro}</Table.Td>
              <Table.Td>{r.comprimento}</Table.Td>
            </Table.Tr>
          ))}

          <Table.Tr><Table.Td fw={700} ta="center" colSpan={3}>Quantidades</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Registros</Table.Td><Table.Td colSpan={2}>{dados.registros}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Válvulas</Table.Td><Table.Td colSpan={2}>{dados.valvulas}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Conexões</Table.Td><Table.Td colSpan={2}>{dados.conexoes}</Table.Td></Table.Tr>

          <Table.Tr><Table.Td fw={700} ta="center" colSpan={3}>Reservatório</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Tipo</Table.Td><Table.Td colSpan={2}>{dados.reservatorio.tipo}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Capacidade</Table.Td><Table.Td colSpan={2}>{dados.reservatorio.capacidade} L</Table.Td></Table.Tr>

          <Table.Tr><Table.Td fw={700} ta="center" colSpan={3}>Extintores</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Tipo</Table.Td><Table.Td>Peso</Table.Td><Table.Td>Capacidade (L)</Table.Td></Table.Tr>
          {dados.extintores?.map((e, i) => (
            <Table.Tr key={i}>
              <Table.Td>{e.tipo}</Table.Td>
              <Table.Td>{e.peso}</Table.Td>
              <Table.Td>{e.capacidade}</Table.Td>
            </Table.Tr>
          ))}

          <Table.Tr><Table.Td fw={700} ta="center" colSpan={3}>Hidrantes</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Localização</Table.Td><Table.Td>Diâmetro</Table.Td><Table.Td>Conexões</Table.Td></Table.Tr>
          {dados.hidrantes?.map((h, i) => (
            <Table.Tr key={i}>
              <Table.Td>{h.localizacao}</Table.Td>
              <Table.Td>{h.diametro}</Table.Td>
              <Table.Td>{h.conexoes}</Table.Td>
            </Table.Tr>
          ))}

          <Table.Tr><Table.Td fw={700} ta="center" colSpan={3}>Dutos</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Diâmetro</Table.Td><Table.Td>Comprimento</Table.Td></Table.Tr>
          {dados.dutos?.map((d, i) => (
            <Table.Tr key={i}>
              <Table.Td>{d.diametro}</Table.Td>
              <Table.Td>{d.comprimento}</Table.Td>
            </Table.Tr>
          ))}

          <Table.Tr><Table.Td fw={700} ta="center" colSpan={3}>Cobertura</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Tipo de Estrutura</Table.Td><Table.Td colSpan={2}>{dados.tipoEstrutura}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Tipo de telhamento</Table.Td><Table.Td colSpan={2}>{dados.tipoTelhamento}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Espessura</Table.Td><Table.Td colSpan={2}>{dados.espessura}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Inclinação</Table.Td><Table.Td colSpan={2}>{dados.inclinacao}</Table.Td></Table.Tr>

          <Table.Tr><Table.Td fw={700} ta="center" colSpan={3}>Peças</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Descrição</Table.Td><Table.Td colSpan={2}>{dados.pecas.descricao}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Capacidade</Table.Td><Table.Td colSpan={2}>{dados.pecas.secao}</Table.Td></Table.Tr>
        </Table.Tbody>
      </Table>

      {/* Serviços */}
      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Tbody>
          <Table.Tr><Table.Td fw={700} ta='center' colSpan={2}>Serviços Preliminares e Movimentos do Solo</Table.Td></Table.Tr>
          <Table.Tr><Table.Td fw={700} ta="center" colSpan={3}>Canteiro de obras</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Contâineres</Table.Td><Table.Td colSpan={2}>{dados.containeres}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Banheiros químicos</Table.Td><Table.Td colSpan={2}>{dados.banheirosQuimicos}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Andâimes</Table.Td><Table.Td colSpan={2}>{dados.andaimes}</Table.Td></Table.Tr>

          <Table.Tr><Table.Td fw={700} ta="center" colSpan={3}>Resíduos</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Resíduo Comum</Table.Td><Table.Td colSpan={2}>{dados.residuoComum}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Resido Contaminado</Table.Td><Table.Td colSpan={2}>{dados.residuoContaminado}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Destinação</Table.Td><Table.Td colSpan={2}>{dados.destinacaoResiduo}</Table.Td></Table.Tr>

          <Table.Tr><Table.Td fw={700} ta="center" colSpan={3}>Escavação</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Profundidade</Table.Td><Table.Td colSpan={2}>{dados.profundidadeEscavacao}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Inclinação do Terreno</Table.Td><Table.Td colSpan={2}>{dados.inclinacaoTerreno}</Table.Td></Table.Tr>

          <Table.Tr><Table.Td fw={700} ta="center" colSpan={3}>Volumes</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Terraplanagem</Table.Td><Table.Td colSpan={2}>{dados.volumes.terraplanagem}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Escavação</Table.Td><Table.Td colSpan={2}>{dados.volumes.escavacao}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Aterro</Table.Td><Table.Td colSpan={2}>{dados.volumes.aterro}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Enroncamento</Table.Td><Table.Td colSpan={2}>{dados.enrocamento}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Contenção</Table.Td><Table.Td colSpan={2}>{dados.contencao}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Taludamento</Table.Td><Table.Td colSpan={2}>{dados.taludamento}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Nivelamento</Table.Td><Table.Td colSpan={2}>{dados.nivelamento}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Compactação</Table.Td><Table.Td colSpan={2}>{dados.compactacao}</Table.Td></Table.Tr>
        </Table.Tbody>
      </Table>

      {/* Estrutura */}
      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Tbody>
          <Table.Tr><Table.Td fw={700} ta='center' colSpan={7}>Estrutura</Table.Td></Table.Tr>
          {dados.fundacoes?.map((f, i) => (
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
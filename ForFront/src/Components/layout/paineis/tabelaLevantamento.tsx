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

      <Table striped highlightOnHover withTableBorder withColumnBorders style={{ flex: 1 }} mb="xl">
        <Table.Tbody>
          <Table.Tr><Table.Td fw={700} fz="lg" ta="center" colSpan={2}>Ambiente</Table.Td></Table.Tr>
          <Table.Tr><Table.Td w="50%">Nome</Table.Td><Table.Td>{dados.nome}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Comprimento</Table.Td><Table.Td>{dados.comprimento} m</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Largura</Table.Td><Table.Td>{dados.largura} m</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Altura</Table.Td><Table.Td>{dados.altura} m</Table.Td></Table.Tr>
        </Table.Tbody >
      </Table>
      <Table striped highlightOnHover withTableBorder withColumnBorders mt="lg" style={{ flex: 1 }} mb="xl">
        <Table.Tbody>
          <Table.Tr><Table.Td fw={700} ta="center" colSpan={2} fz="lg" >Elétrica</Table.Td></Table.Tr>
          <Table.Tr><Table.Td fw={700} ta="center" colSpan={2}>Pontos Elétricos</Table.Td></Table.Tr>
          <Table.Tr><Table.Td w="50%">Tomadas</Table.Td><Table.Td>{dados.tomadas}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Iluminação</Table.Td><Table.Td>{dados.iluminacao}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Interruptores</Table.Td><Table.Td>{dados.interruptores}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Tipo de Tomada</Table.Td><Table.Td>{dados.tipoTomada}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Tipo de Interruptor</Table.Td><Table.Td>{dados.tipoInterruptor}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Tipo de Luminária</Table.Td><Table.Td>{dados.tipoLuminaria}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Altura de Instalação</Table.Td><Table.Td>{dados.alturaInstalacao} m</Table.Td></Table.Tr>
          <Table.Tr><Table.Td fw={700} ta="center" colSpan={2}>Cabos por Circuito</Table.Td></Table.Tr>
          <Table.Tr><Table.Td fw={500}>Circuito</Table.Td><Table.Td fw={500}>Seção (mm²)</Table.Td></Table.Tr>{dados.cabos?.map((cabo, index) => (
            <Table.Tr key={index}>
              <Table.Td>{cabo.circuito}</Table.Td>
              <Table.Td>{cabo.secao}</Table.Td>
            </Table.Tr>
          ))}
          <Table.Tr><Table.Td fw={700} ta="center" colSpan={2}>Disjuntores</Table.Td></Table.Tr>
          <Table.Tr><Table.Td fw={500}>Amperagem (A)</Table.Td><Table.Td fw={500}>Quantidade</Table.Td></Table.Tr>{dados.disjuntores?.map((d, index) => (
            <Table.Tr key={index}>
              <Table.Td>{d.amperagem}</Table.Td>
              <Table.Td>{d.quantidade}</Table.Td>
            </Table.Tr>
          ))}
          <Table.Tr><Table.Td fw={700} ta="center" colSpan={2}>Aterramento e SPDA</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Hastes de Aterramento</Table.Td><Table.Td>{dados.hastesAterramento}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Caixas de Inspeção</Table.Td><Table.Td>{dados.caixasInspecao}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Terminais Aéreos</Table.Td><Table.Td>{dados.terminaisAereos}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td fw={700} ta="center" colSpan={2}>Telefonia, Rede e CFTV</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Quadros de Rede</Table.Td><Table.Td>{dados.quadrosRede}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Patch Cords</Table.Td><Table.Td>{dados.patchCords}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Câmeras</Table.Td><Table.Td>{dados.cameras}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td fw={700} ta="center" colSpan={2}>Cabeamento por Circuito</Table.Td></Table.Tr>
          <Table.Tr><Table.Td fw={500}>Circuito</Table.Td><Table.Td fw={500}>Comprimento (m)</Table.Td></Table.Tr>
          {dados.cabeamentos?.map((cab, index) => (
            <Table.Tr key={index}>
              <Table.Td>{cab.circuito}</Table.Td>
              <Table.Td>{cab.comprimento}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <Table striped highlightOnHover withTableBorder withColumnBorders mt="lg" style={{ flex: 1 }} mb="xl">
        <Table.Tbody>
          <Table.Tr><Table.Td fw={700} ta="center" colSpan={3} fz="lg" >Hidráulica</Table.Td></Table.Tr>
          <Table.Tr><Table.Td fw={700} ta="center" colSpan={3}>Ramais</Table.Td></Table.Tr>
          <Table.Tr><Table.Td fw={700}>Nome</Table.Td><Table.Td fw={500}>Diâmetro</Table.Td><Table.Td fw={500}>Comprimento (m)</Table.Td></Table.Tr>
          {dados.ramais?.map((ramal, index) => (
            <Table.Tr key={index}>
              <Table.Td w="20%">{ramal.nome}</Table.Td>
              <Table.Td w="20%">{ramal.diametro}</Table.Td>
              <Table.Td w="20%">{ramal.comprimento}</Table.Td>
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
          <Table.Tr><Table.Td fw={500}>Tipo</Table.Td><Table.Td fw={500}>Peso (kg)</Table.Td><Table.Td fw={500}>Capacidade (L)</Table.Td></Table.Tr>
          {dados.extintores?.map((ext, index) => (
            <Table.Tr key={index}>
              <Table.Td>{ext.tipo}</Table.Td>
              <Table.Td>{ext.peso}</Table.Td>
              <Table.Td>{ext.capacidade}</Table.Td>
            </Table.Tr>
          ))}
          <Table.Tr><Table.Td fw={700} ta="center" colSpan={3}>Hidrantes</Table.Td></Table.Tr>
          <Table.Tr><Table.Td fw={500}>Localização</Table.Td><Table.Td fw={500}>Diâmetro</Table.Td><Table.Td fw={500}>Conexões</Table.Td></Table.Tr>
          {dados.hidrantes?.map((hid, index) => (
            <Table.Tr key={index}>
              <Table.Td>{hid.localizacao}</Table.Td>
              <Table.Td>{hid.diametro}</Table.Td>
              <Table.Td>{hid.conexoes}</Table.Td>
            </Table.Tr>
          ))}
          <Table.Tr><Table.Td fw={700} ta="center" colSpan={3}>Dutos</Table.Td></Table.Tr>
          <Table.Tr><Table.Td fw={500}>Diâmetro</Table.Td><Table.Td fw={500} colSpan={2}>Comprimento (m)</Table.Td></Table.Tr>
          {dados.dutos?.map((duto, index) => (
            <Table.Tr key={index}>
              <Table.Td>{duto.diametro}</Table.Td>
              <Table.Td colSpan={2}>{duto.comprimento}</Table.Td>
            </Table.Tr>
          ))}
          <Table.Tr><Table.Td fw={700} ta="center" colSpan={3}>Cobertura</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Tipo de Estrutura</Table.Td><Table.Td colSpan={2}>{dados.tipoEstrutura}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Tipo de Telhamento</Table.Td><Table.Td colSpan={2}>{dados.tipoTelhamento}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Espessura</Table.Td><Table.Td colSpan={2}>{dados.espessura} cm</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Inclinação</Table.Td><Table.Td colSpan={2}>{dados.inclinacao}%</Table.Td></Table.Tr>
          <Table.Tr><Table.Td fw={700} ta="center" colSpan={3}>Peças</Table.Td></Table.Tr>
          <Table.Tr><Table.Td fw={500}>Descrição</Table.Td><Table.Td fw={500} colSpan={2}>Seção</Table.Td></Table.Tr>
          {dados.pecas?.map((peca, index) => (
            <Table.Tr key={index}>
              <Table.Td>{peca.descricao}</Table.Td>
              <Table.Td colSpan={2}>{peca.secao}</Table.Td>
            </Table.Tr>
          ))}

        </Table.Tbody>
      </Table>
      <Table striped highlightOnHover withTableBorder withColumnBorders mt="lg" style={{ flex: 1 }} mb="xl">
        <Table.Tbody>
          <Table.Tr><Table.Td fw={700} ta="center" colSpan={3} fz="lg" >Serviços Preliminares e Movimento de Solo</Table.Td></Table.Tr>
          <Table.Tr><Table.Td fw={700} ta="center" colSpan={2}>Canteiro de Obras</Table.Td></Table.Tr>
          <Table.Tr><Table.Td w="50%">Contêineres</Table.Td><Table.Td>{dados.conteineres}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Banheiros Químicos</Table.Td><Table.Td>{dados.banheirosQuimicos}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Andaimes</Table.Td><Table.Td>{dados.andaimes}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td fw={700} ta="center" colSpan={2}>Resíduos</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Resíduo Comum</Table.Td><Table.Td>{dados.residuoComum} m³</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Resíduo Contaminado</Table.Td><Table.Td>{dados.residuoContaminado} m³</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Destinação</Table.Td><Table.Td>{dados.destinacaoResiduo}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td fw={700} ta="center" colSpan={2}>Escavação</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Profundidade</Table.Td><Table.Td>{dados.profundidadeEscavacao} m</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Inclinação do Terreno</Table.Td><Table.Td>{dados.inclinacaoTerreno}%</Table.Td></Table.Tr>
          <Table.Tr><Table.Td fw={700} ta="center" colSpan={2}>Volumes</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Terraplanagem</Table.Td><Table.Td>{dados.volumes.terraplanagem} m³</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Escavação</Table.Td><Table.Td>{dados.volumes.escavacao} m³</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Aterro</Table.Td><Table.Td>{dados.volumes.aterro} m³</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Enrocamento</Table.Td><Table.Td>{dados.volumes.enrocamento} m³</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Contenção</Table.Td><Table.Td>{dados.volumes.contencao} m³</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Taludamento</Table.Td><Table.Td>{dados.volumes.taludamento} m³</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Nivelamento</Table.Td><Table.Td>{dados.volumes.nivelamento} m³</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Compactação</Table.Td><Table.Td>{dados.volumes.compactacao} m³</Table.Td></Table.Tr>
        </Table.Tbody>
      </Table>
      <Table striped highlightOnHover withTableBorder withColumnBorders mt="lg" ta="center" mb="xl">
        <Table.Tbody>
          <Table.Tr><Table.Td fw={700} ta="center" colSpan={7} fz="lg">Estrutura</Table.Td></Table.Tr>
          <Table.Tr><Table.Td fw={700} ta="center" colSpan={7}>Fundações</Table.Td></Table.Tr>
          <Table.Tr>
            <Table.Td fw={500}>Tipo</Table.Td>
            <Table.Td fw={500}>Profundidade (m)</Table.Td>
            <Table.Td fw={500}>Vol. Lastro (m³)</Table.Td>
            <Table.Td fw={500}>Vol. Concreto (m³)</Table.Td>
            <Table.Td fw={500}>Ferragem (KgF)</Table.Td>
            <Table.Td fw={500}>Estribo (KgF)</Table.Td>
            <Table.Td fw={500}>Forma (m²)</Table.Td>
          </Table.Tr>
          {dados.fundacoes?.map((fund, index) => (
            <Table.Tr key={index}>
              <Table.Td>{fund.tipo}</Table.Td>
              <Table.Td>{fund.profundidade}</Table.Td>
              <Table.Td>{fund.volumeLastro}</Table.Td>
              <Table.Td>{fund.volumeConcreto}</Table.Td>
              <Table.Td>{fund.pesoFerragem}</Table.Td>
              <Table.Td>{fund.pesoEstribo}</Table.Td>
              <Table.Td>{fund.areaForma}</Table.Td>
            </Table.Tr>
          ))}
          <Table.Tr><Table.Td fw={700} ta="center" colSpan={7}>Superestrutura em Concreto</Table.Td></Table.Tr>
          <Table.Tr>
            <Table.Td fw={500}>Tipo</Table.Td>
            <Table.Td fw={500}>Largura (m)</Table.Td>
            <Table.Td fw={500}>Altura (m)</Table.Td>
            <Table.Td fw={500}>Vol. Concreto (m³)</Table.Td>
            <Table.Td fw={500}>Ferragem (KgF)</Table.Td>
            <Table.Td fw={500}>Estribo (KgF)</Table.Td>
            <Table.Td fw={500}>Forma (m²)</Table.Td>
          </Table.Tr>
          {dados.superestrutura?.map((sup, index) => (
            <Table.Tr key={index}>
              <Table.Td>{sup.tipo}</Table.Td>
              <Table.Td>{sup.largura}</Table.Td>
              <Table.Td>{sup.altura}</Table.Td>
              <Table.Td>{sup.volumeConcreto}</Table.Td>
              <Table.Td>{sup.pesoFerragem}</Table.Td>
              <Table.Td>{sup.pesoEstribo}</Table.Td>
              <Table.Td>{sup.areaForma}</Table.Td>
            </Table.Tr>
          ))}
          <Table.Tr><Table.Td fw={700} ta="center" colSpan={7}>Estruturas Metálicas</Table.Td></Table.Tr>
          <Table.Tr>
            <Table.Td fw={500}>Tipo</Table.Td>
            <Table.Td fw={500}>Perfil</Table.Td>
            <Table.Td fw={500}>Seção</Table.Td>
            <Table.Td fw={500}>Peso (KgF)</Table.Td>
            <Table.Td fw={500} colSpan={3}>Elastômero</Table.Td>
          </Table.Tr>
          {dados.metalicas?.map((met, index) => (
            <Table.Tr key={index}>
              <Table.Td>{met.tipo}</Table.Td>
              <Table.Td>{met.tipoPerfil}</Table.Td>
              <Table.Td>{met.secao}</Table.Td>
              <Table.Td>{met.peso}</Table.Td>
              <Table.Td colSpan={3}>{met.elastomero}</Table.Td>
            </Table.Tr>
          ))}
          <Table.Tr><Table.Td fw={700} ta="center" colSpan={7}>Estruturas em Madeira</Table.Td></Table.Tr>
          <Table.Tr>
            <Table.Td fw={500}>Tipo de Peça</Table.Td>
            <Table.Td fw={500}>Seção</Table.Td>
            <Table.Td fw={500}>Peso Total (KgF)</Table.Td>
            <Table.Td fw={500} colSpan={4}>Tipo de Telhamento</Table.Td>
          </Table.Tr>
          {dados.madeira?.map((mad, index) => (
            <Table.Tr key={index}>
              <Table.Td>{mad.tipoPeca}</Table.Td>
              <Table.Td>{mad.secao}</Table.Td>
              <Table.Td>{mad.pesoTotal}</Table.Td>
              <Table.Td colSpan={4}>{mad.tipoTelhamento}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

    </Stack>
  );
}

export default TabelaLevantamento;
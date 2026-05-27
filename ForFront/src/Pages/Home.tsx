import { Grid, Group, Title } from '@mantine/core';
import { useHomeData } from '../hooks/useHomeData';
import KpiGrid from '../Components/graficos/KpiGrid';
import GraficosTabs from '../Components/graficos/GraficoTabs';
import GraficoAtrasados from '../Components/graficos/GraficoAtrasados';
import TopNormas from '../Components/graficos/TopNormas';
import ConformidadeProjetos from '../Components/graficos/ConformidadeProjetos';
import FeedNotificacoes from '../Components/graficos/FeedNots';

export default function Home() {
  const { kpi, carregando, conformidade } = useHomeData();

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1400 }}>
      <Group mb="xl" justify="space-between" align="flex-end">
        <div>
          <Title order={2} style={{ color: '#1a1a1a', fontWeight: 700 }}>
            Dashboard
          </Title>
        </div>
      </Group>

      <KpiGrid kpi={kpi} carregando={carregando} />

      <Grid mb="sm" gutter="md">
        <Grid.Col>
          <ConformidadeProjetos dados={conformidade} />
        </Grid.Col>
      </Grid>

      <Grid mb="xl" gutter="md">
        <Grid.Col span={{ base: 12, lg: 5 }}>
          <FeedNotificacoes />
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 7 }}>
          <GraficosTabs />
        </Grid.Col>
      </Grid>

      <Grid gutter="md">
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <TopNormas />
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 6 }}>
          <GraficoAtrasados />
        </Grid.Col>
      </Grid>
    </div>
  );
}

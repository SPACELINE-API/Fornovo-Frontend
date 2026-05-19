import { Grid } from '@mantine/core';
import { IconUsers, IconFolders, IconBook2 } from '@tabler/icons-react';
import KpiCard from './KpiCard';
import type { KpiData } from '../../types/dashboard';

interface KpiGridProps {
  kpi: KpiData;
  carregando: boolean;
}

export default function KpiGrid({ kpi, carregando }: KpiGridProps) {
  return (
    <Grid mb="xl" gutter="md" justify="center">
      <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
        <KpiCard
          label="Funcionários"
          value={kpi.funcionarios}
          icon={<IconUsers size={16} />}
          cor="#34623F"
          carregando={carregando}
          sub="cadastrados no sistema"
        />
      </Grid.Col>

      <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
        <KpiCard
          label="Projetos"
          value={kpi.projetos}
          icon={<IconFolders size={16} />}
          cor="#3b82f6"
          carregando={carregando}
          sub="no total"
        />
      </Grid.Col>

      <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
        <KpiCard
          label="Normas"
          value={kpi.normas}
          icon={<IconBook2 size={16} />}
          cor="#8b5cf6"
          carregando={carregando}
          sub="cadastradas"
        />
      </Grid.Col>
    </Grid>
  );
}

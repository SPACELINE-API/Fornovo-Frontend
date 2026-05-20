import { Grid } from '@mantine/core';
import { IconUsers, IconFolders, IconBook2 } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import KpiCard from './KpiCard';
import type { KpiData } from '../../types/dashboard';
import api from '../../Services/apiService';

interface KpiGridProps {
  kpi: KpiData;
  carregando: boolean;
}

export default function KpiGrid({ kpi, carregando }: KpiGridProps) {
  const [totalUsuarios, setTotalUsuarios] = useState<number>(0);
  const [carregandoUsuarios, setCarregandoUsuarios] = useState<boolean>(true);

  useEffect(() => {
    async function listarQuantidadeUsuario() {
      try {
        const response = await api.get('/usuarios/quantidadeUsuario');
        setTotalUsuarios(response.data.total);
      } catch (error) {
        console.error('Erro ao buscar quantidade de usuários:', error);
      } finally {
        setCarregandoUsuarios(false);
      }
    }

    listarQuantidadeUsuario();
  }, []);

  return (
    <Grid mb="xl" gutter="md" justify="center">
      <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
        <KpiCard
          label="Funcionários"
          value={totalUsuarios}
          icon={<IconUsers size={16} />}
          cor="#34623F"
          carregando={carregando || carregandoUsuarios}
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

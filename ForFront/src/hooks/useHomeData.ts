import { useEffect, useState } from 'react';
import api from '../Services/apiService';

import type {
  KpiData,
  StatusData,
  ProjetosPorMes,
  MemorialPorMes,
  ProjetoAtrasado,
  ConformidadeIA,
  TopNorma,
  Notificacao,
} from '../types/dashboard';

import {
  MOCK_STATUS,
  MOCK_MESES,
  MOCK_MEMORIAIS,
  MOCK_ATRASADOS,
  MOCK_CONFORMIDADE,
  MOCK_TOP_NORMAS,
  MOCK_NOTIFICACOES,
} from '../utils/mock';

interface UseHomeDataReturn {
  kpi: KpiData;
  statusData: StatusData[];
  mesesData: ProjetosPorMes[];
  memoriaisData: MemorialPorMes[];
  atrasadosData: ProjetoAtrasado[];
  conformidade: ConformidadeIA;
  topNormasData: TopNorma[];
  notificacoes: Notificacao[];
  carregando: boolean;
}

export function useHomeData(): UseHomeDataReturn {
  const [kpi, setKpi] = useState<KpiData>({
    funcionarios: 0,
    projetos: 0,
    normas: 0,
    issuesAbertas: 0,
  });

  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const fetchKpis = async () => {
      try {
        const [funcs, projs, normas] = await Promise.allSettled([
          api.get('usuarios/listarUsuarios'),
          api.get('projetos/listarProjetos'),
          api.get('normas/listarNormas'),
        ]);

        setKpi({
          funcionarios: funcs.status === 'fulfilled' ? funcs.value.data.length : 0,
          projetos: projs.status === 'fulfilled' ? projs.value.data.length : 0,
          normas: normas.status === 'fulfilled' ? normas.value.data.length : 0,

          issuesAbertas: 7,
        });
      } catch {
      } finally {
        setCarregando(false);
      }
    };

    fetchKpis();
  }, []);

  return {
    kpi,
    carregando,
    statusData: MOCK_STATUS,
    mesesData: MOCK_MESES,
    memoriaisData: MOCK_MEMORIAIS,
    atrasadosData: MOCK_ATRASADOS,
    topNormasData: MOCK_TOP_NORMAS,
    notificacoes: MOCK_NOTIFICACOES,
    conformidade: MOCK_CONFORMIDADE,
  };
}

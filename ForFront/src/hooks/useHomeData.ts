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

  const [conformidade, setConformidade] = useState<ConformidadeIA>(MOCK_CONFORMIDADE);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const fetchKpis = async () => {
      try {
        const [funcs, projs, normas, conf] = await Promise.allSettled([
          api.get('usuarios/quantidadeUsuario'),
          api.get('projetos/quantidadeProjeto'),
          api.get('normas/quantidadeNorma'),
          api.get('dados-ia/conformidade/'),
        ]);

        setKpi({
          funcionarios: funcs.status === 'fulfilled' ? funcs.value.data.total : 0,
          projetos: projs.status === 'fulfilled' ? projs.value.data.total : 0,
          normas: normas.status === 'fulfilled' ? normas.value.data.total : 0,

          issuesAbertas: 7,
        });

        if (conf.status === 'fulfilled') {
          const { valor, status, cor, metricas } = conf.value.data;
          setConformidade({
            valor: valor ?? MOCK_CONFORMIDADE.valor,
            status: status ?? MOCK_CONFORMIDADE.status,
            cor: cor ?? MOCK_CONFORMIDADE.cor,
            metricas: metricas ?? MOCK_CONFORMIDADE.metricas,
          });
        }
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
    conformidade,
  };
}

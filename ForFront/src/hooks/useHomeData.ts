import { useEffect, useState } from 'react';
import api from '../Services/apiService';

import type { KpiData, ConformidadeIA } from '../types/dashboard';

interface UseHomeDataReturn {
  kpi: KpiData;
  conformidade: ConformidadeIA | null;
  carregando: boolean;
}

export function useHomeData(): UseHomeDataReturn {
  const [kpi, setKpi] = useState<KpiData>({
    funcionarios: 0,
    projetos: 0,
    normas: 0,
    issuesAbertas: 0,
  });

  const [conformidade, setConformidade] = useState<ConformidadeIA | null>(null);
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
          setConformidade({ valor, status, cor, metricas });
        }
      } catch {
      } finally {
        setCarregando(false);
      }
    };

    fetchKpis();
  }, []);

  return { kpi, carregando, conformidade };
}

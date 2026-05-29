import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, Skeleton } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import type { ProjetoAtrasado } from '../../types/dashboard';
import api from '../../Services/apiService';

const PRAZO_CONFIG: { label: string; chave: 'percentual_no_prazo' | 'percentual_atrasados' }[] = [
  { label: 'No prazo', chave: 'percentual_no_prazo' },
  { label: 'Atrasados', chave: 'percentual_atrasados' },
];

interface QuantidadePorPrazoResponse {
  no_prazo: number;
  atrasados: number;
  total: number;
  percentual_no_prazo: number;
  percentual_atrasados: number;
}

function mapearResposta(data: QuantidadePorPrazoResponse): ProjetoAtrasado[] {
  return PRAZO_CONFIG.map(({ label, chave }) => ({
    label,
    valor: data[chave] ?? 0,
  }));
}

export default function GraficoAtrasados() {
  const [dados, setDados] = useState<ProjetoAtrasado[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const { data } = await api.get<QuantidadePorPrazoResponse>(
          'projetos/quantidadeProjetoPorPrazo'
        );
        setDados(mapearResposta(data));
      } catch {
        setDados(
          PRAZO_CONFIG.map(({ label }) => ({
            label,
            valor: 0,
          }))
        );
      } finally {
        setCarregando(false);
      }
    };

    fetchDados();
  }, []);

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'donut',
      parentHeightOffset: 0,
      toolbar: { show: false },
      animations: { enabled: true, speed: 600 },
    },
    labels: dados.map((d) => d.label),
    colors: ['#34623F', '#ef4444'],
    dataLabels: { enabled: false },
    legend: { show: false },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            value: {
              fontSize: '28px',
              fontWeight: 700,
              color: '#111827',
              formatter: (val) => `${val}%`,
            },
            total: {
              show: true,
              label: 'no prazo',
              fontSize: '12px',
              color: '#6b7280',
              formatter: (w) => {
                const val = w.globals.series[0];
                return `${val}%`;
              },
            },
          },
        },
      },
    },
    stroke: { width: 2, colors: ['#fff'] },
    tooltip: {
      y: { formatter: (val) => `${val}%` },
    },
  };

  return (
    <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: 3, height: '100%' }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          Projetos no prazo
        </Typography>

        {carregando ? (
          <Skeleton variant="rounded" height={220} sx={{ borderRadius: 2 }} />
        ) : (
          <>
            <ReactApexChart
              type="donut"
              series={dados.map((d) => d.valor)}
              options={options}
              height="100%"
            />

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
              {dados.map((d, i) => (
                <Box key={d.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      backgroundColor: i === 0 ? '#34623F' : '#ef4444',
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {d.label} ({d.valor}%)
                  </Typography>
                </Box>
              ))}
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
}

import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, Skeleton } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import type { StatusData } from '../../types/dashboard';
import api from '../../Services/apiService';

const STATUS_CONFIG: { name: string; color: `#${string}` }[] = [
  { name: 'Concluído', color: '#34623F' },
  { name: 'Em andamento', color: '#f59e0b' },
  { name: 'Em revisão', color: '#03668d' },
  { name: 'Pendente', color: '#c50205' },
];

type QuantidadePorStatusResponse = Record<string, number>;

function mapearResposta(data: QuantidadePorStatusResponse): StatusData[] {
  return STATUS_CONFIG.map(({ name, color }) => ({
    name,
    value: data[name] ?? 0,
    color,
  }));
}

export default function GraficoStatus() {
  const [dados, setDados] = useState<StatusData[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const { data } = await api.get<QuantidadePorStatusResponse>(
          'projetos/quantidadeProjetoPorStatus'
        );
        setDados(mapearResposta(data));
      } catch {
        setDados(mapearResposta({}));
      } finally {
        setCarregando(false);
      }
    };

    fetchDados();
  }, []);

  const total = dados.reduce((s, d) => s + d.value, 0);

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'donut',
      parentHeightOffset: 0,
      toolbar: { show: false },
      animations: { enabled: true, speed: 600 },
    },
    labels: dados.map((d) => d.name),
    colors: dados.map((d) => d.color),
    dataLabels: { enabled: false },
    legend: { show: false },
    plotOptions: {
      pie: {
        donut: {
          size: '62%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total',
              fontSize: '13px',
              color: '#6b7280',
              formatter: () => String(total),
            },
            value: {
              fontSize: '22px',
              fontWeight: 700,
              color: '#111827',
            },
          },
        },
      },
    },
    stroke: { width: 2, colors: ['#fff'] },
    tooltip: {
      y: {
        formatter: (val) =>
          total > 0
            ? `${val} projetos (${Math.round((val / total) * 100)}%)`
            : `${val} projetos`,
      },
    },
  };

  return (
    <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: 3, height: '100%' }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          Projetos por status
        </Typography>

        {carregando ? (
          <Skeleton variant="rounded" height={220} sx={{ borderRadius: 2 }} />
        ) : (
          <>
            <ReactApexChart
              type="donut"
              series={dados.map((d) => d.value)}
              options={options}
              height="70%"
            />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, mt: 1 }}>
              {dados.map((item) => (
                <Box
                  key={item.name}
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{ width: 10, height: 10, borderRadius: 1, backgroundColor: item.color }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {item.name}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 0.75 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {item.value}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      ({total > 0 ? Math.round((item.value / total) * 100) : 0}%)
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
}

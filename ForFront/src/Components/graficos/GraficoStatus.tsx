import { Card, CardContent, Typography, Box } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import type { StatusData } from '../../types/dashboard';

interface GraficoStatusProps {
  dados: StatusData[];
}

export default function GraficoStatus({ dados }: GraficoStatusProps) {
  const total = dados.reduce((s, d) => s + d.value, 0);

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'donut',
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
        formatter: (val) => `${val} projetos (${Math.round((val / total) * 100)}%)`,
      },
    },
  };

  return (
    <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: 3, height: '100%' }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          Projetos por status
        </Typography>

        <ReactApexChart
          type="donut"
          series={dados.map((d) => d.value)}
          options={options}
          height={220}
        />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, mt: 1 }}>
          {dados.map((item) => (
            <Box
              key={item.name}
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 10, height: 10, borderRadius: 1, backgroundColor: item.color }} />
                <Typography variant="body2" color="text.secondary">
                  {item.name}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 0.75 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {item.value}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  ({Math.round((item.value / total) * 100)}%)
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

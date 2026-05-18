import { Card, CardContent, Typography, Box } from '@mui/material';
import ReactApexChart from 'react-apexcharts';

interface DadosPrazo {
  label: string;
  valor: number;
}

interface GraficoAtrasadosProps {
  dados: DadosPrazo[];
}

export default function GraficoAtrasados({ dados }: GraficoAtrasadosProps) {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'donut',
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

        <ReactApexChart
          type="donut"
          series={dados.map((d) => d.valor)}
          options={options}
          height={240}
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
                {d.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

import { Card, CardContent, Typography, Box } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import type { ProjetosPorMes } from '../../types/dashboard';

interface GraficoMesesProps {
  mesesData: ProjetosPorMes[];
  memoriaisData: ProjetosPorMes[];
}

export default function GraficoMeses({ mesesData, memoriaisData }: GraficoMesesProps) {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'area',
      toolbar: { show: false },
      zoom: { enabled: false },
      animations: { enabled: true, speed: 600 },
    },
    colors: ['#34623F', '#3b82f6'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.15,
        opacityTo: 0.01,
        stops: [0, 100],
      },
    },
    stroke: { curve: 'smooth', width: 2.5 },
    markers: { size: 4, strokeWidth: 0 },
    xaxis: {
      categories: mesesData.map((d) => d.mes),
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: '#6b7280', fontSize: '12px' } },
    },
    yaxis: {
      labels: { style: { colors: '#6b7280', fontSize: '12px' } },
    },
    grid: {
      borderColor: '#f3f4f6',
      strokeDashArray: 0,
      yaxis: { lines: { show: true } },
      xaxis: { lines: { show: false } },
    },
    legend: { show: false },
    tooltip: {
      shared: true,
      intersect: false,
      y: { formatter: (val) => `${val} item(s)` },
    },
    dataLabels: { enabled: false },
  };

  const series = [
    { name: 'Projetos', data: mesesData.map((d) => d.quantidade) },
    { name: 'Memoriais', data: memoriaisData.map((d) => d.quantidade) },
  ];

  return (
    <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: 3, height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Atividade nos últimos 6 meses
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {[
              { label: 'Projetos', cor: '#34623F' },
              { label: 'Memoriais', cor: '#3b82f6' },
            ].map((l) => (
              <Box key={l.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: l.cor }} />
                <Typography variant="caption" color="text.secondary">
                  {l.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <ReactApexChart type="area" series={series} options={options} height={260} />
      </CardContent>
    </Card>
  );
}

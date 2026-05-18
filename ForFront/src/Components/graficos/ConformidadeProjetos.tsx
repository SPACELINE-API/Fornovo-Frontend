import { Card, CardContent, Typography, Box, Chip, LinearProgress } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import type { ConformidadeIA } from '../../types/dashboard';

interface ConformidadeProjetosProps {
  dados: ConformidadeIA;
}

export default function ConformidadeProjetos({ dados }: ConformidadeProjetosProps) {
  const { valor, metricas, cor, status } = dados;

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: 'area',
      sparkline: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },

    stroke: {
      curve: 'smooth',
      width: 3,
    },

    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0.4,
        opacityFrom: 0.35,
        opacityTo: 0,
      },
    },

    tooltip: {
      enabled: false,
    },

    colors: [cor],

    grid: {
      show: false,
    },

    xaxis: {
      labels: {
        show: false,
      },
    },

    yaxis: {
      show: false,
    },
  };

  const chartSeries = [
    {
      name: 'Confiabilidade',
      data: [72, 75, 78, 80, 84, 88, valor],
    },
  ];

  return (
    <Card
      elevation={0}
      sx={{
        border: '1px solid #e5e7eb',
        borderRadius: 4,
        height: '100%',
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 3,
          }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 0.5,
              }}
            >
              Conformidade da IA
            </Typography>
          </Box>

          <Chip
            label={status}
            size="small"
            sx={{
              backgroundColor: `${cor}15`,
              color: cor,
              fontWeight: 700,
            }}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: 1,
            mb: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: 52,
              fontWeight: 800,
              lineHeight: 1,
              color: '#111827',
            }}
          >
            {valor}%
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <LinearProgress
            variant="determinate"
            value={valor}
            sx={{
              height: 12,
              borderRadius: 99,

              backgroundColor: '#f3f4f6',

              '& .MuiLinearProgress-bar': {
                borderRadius: 99,
                backgroundColor: cor,
              },
            }}
          />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: 1,
            }}
          >
            <Typography variant="caption" color="error">
              Risco
            </Typography>

            <Typography variant="caption" color="warning.main">
              Atenção
            </Typography>

            <Typography
              variant="caption"
              sx={{
                color: '#16a34a',
              }}
            >
              Confiável
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 3 }}>
          <ReactApexChart options={chartOptions} series={chartSeries} type="area" height={80} />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
          }}
        >
          {metricas.map((item) => (
            <Box key={item.label}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 0.5,
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  {item.label}
                </Typography>

                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  {item.valor}%
                </Typography>
              </Box>

              <LinearProgress
                variant="determinate"
                value={item.valor}
                sx={{
                  height: 6,
                  borderRadius: 99,

                  backgroundColor: '#f3f4f6',

                  '& .MuiLinearProgress-bar': {
                    borderRadius: 99,
                    backgroundColor: cor,
                  },
                }}
              />
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

import { Card, CardContent, Typography, Box, Chip, LinearProgress } from '@mui/material';
import type { ConformidadeIA } from '../../types/dashboard';

interface ConformidadeProjetosProps {
  dados: ConformidadeIA;
}

export default function ConformidadeProjetos({ dados }: ConformidadeProjetosProps) {
  const { valor, cor, status } = dados;

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
              Conformidade da IA para o projeto
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
              fontSize: 28,
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
              height: 9,
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

      </CardContent>
    </Card>
  );
}

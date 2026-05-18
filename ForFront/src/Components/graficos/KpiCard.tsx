import { Card, CardContent, Typography, Skeleton, Box } from '@mui/material';

interface KpiCardProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  cor: `#${string}`;
  carregando: boolean;
  sub?: string;
}

export default function KpiCard({ label, value, icon, cor, carregando, sub }: KpiCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        border: '1px solid #e5e7eb',
        borderRadius: 3,
        height: '100%',
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 1,
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontWeight: 500,
            }}
          >
            {label}
          </Typography>

          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: 2,
              backgroundColor: `${cor}15`,
              color: cor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </Box>
        </Box>

        {carregando ? (
          <Skeleton variant="rounded" width={90} height={40} />
        ) : (
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            {value}
          </Typography>
        )}

        {sub && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              mt: 1,
              display: 'block',
            }}
          >
            {sub}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

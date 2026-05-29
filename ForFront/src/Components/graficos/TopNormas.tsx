import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, Chip, Skeleton } from '@mui/material';
import type { TopNorma } from '../../types/dashboard';
import api from '../../Services/apiService';

const TOP_LIMITE = 5;

interface TopNormasResponse {
  total: number;
  normas: TopNorma[];
}

export default function TopNormas() {
  const [dados, setDados] = useState<TopNorma[]>([]);
  const [total, setTotal] = useState(0);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const { data } = await api.get<TopNormasResponse>('projetos/topNormasUtilizadas');
        setDados(data.normas ?? []);
        setTotal(data.total ?? 0);
      } catch {
        setDados([]);
        setTotal(0);
      } finally {
        setCarregando(false);
      }
    };

    fetchDados();
  }, []);

  const lista = dados.slice(0, TOP_LIMITE);
  const maximo = lista[0]?.usos ?? 1;

  return (
    <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: 3, height: '100%' }}>
      <CardContent>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Top normas utilizadas
          </Typography>
          <Chip
            label={carregando ? '...' : `Top ${lista.length} · ${total} vínculos`}
            size="small"
            sx={{ backgroundColor: '#f3f4f6', color: '#6b7280', fontSize: 11 }}
          />
        </Box>

        {carregando ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {Array.from({ length: TOP_LIMITE }).map((_, i) => (
              <Skeleton key={i} variant="rounded" height={36} />
            ))}
          </Box>
        ) : lista.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Nenhuma norma vinculada a projetos ainda.
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {lista.map((norma, i) => {
              const pct = maximo > 0 ? (norma.usos / maximo) * 100 : 0;
              const barColor = i === 0 ? '#34623F' : i === 1 ? '#4d7a5a' : '#89c094';

              return (
                <Box key={norma.nome}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 0.5,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }} noWrap>
                        {norma.nome}
                      </Typography>
                    </Box>

                    <Box
                      sx={{ display: 'flex', alignItems: 'center', gap: 0.75, flexShrink: 0, ml: 1 }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 700,
                          color: i === 0 ? '#34623F' : '#374151',
                          minWidth: 24,
                          textAlign: 'right',
                        }}
                      >
                        {norma.usos}
                      </Typography>
                      <Typography variant="caption" color="text.disabled">
                        uso{norma.usos !== 1 ? 's' : ''}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      height: 5,
                      borderRadius: 2,
                      backgroundColor: '#f3f4f6',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        height: '100%',
                        width: `${pct}%`,
                        borderRadius: 2,
                        backgroundColor: barColor,
                        transition: 'width 0.6s ease',
                      }}
                    />
                  </Box>
                </Box>
              );
            })}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

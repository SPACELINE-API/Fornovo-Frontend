import { useState } from 'react';
import { Card, CardContent, Tabs, Tab, Box } from '@mui/material';
import GraficoStatus from './GraficoStatus';
import GraficoMeses from './GraficoMeses';

export default function GraficosTabs() {
  const [tab, setTab] = useState(0);

  return (
    <Card elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: 3, height: '100%' }}>
      <CardContent>
        <Tabs
          value={tab}
          onChange={(_, value) => setTab(value)}
          sx={{
            mb: 2,
            minHeight: 36,
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              minHeight: 36,
              fontSize: 13,
            },
            '& .MuiTabs-indicator': { backgroundColor: '#34623F' },
            '& .Mui-selected': { color: '#34623F !important' },
          }}
        >
          <Tab label="Status" />
          <Tab label="Atividade por mês" />
        </Tabs>

        <Box sx={{ minHeight: { xs: 280, md: 320 } }}>
          {tab === 0 && <GraficoStatus />}
          {tab === 1 && <GraficoMeses />}
        </Box>
      </CardContent>
    </Card>
  );
}

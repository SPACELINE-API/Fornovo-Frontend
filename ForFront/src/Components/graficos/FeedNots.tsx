import { useEffect, useState } from 'react';
import { Card, Text, Group, Badge, Avatar, Stack, Divider, ScrollArea, Skeleton } from '@mantine/core';
import { IconAlertCircle, IconCircleCheck, IconHourglass } from '@tabler/icons-react';
import type { Notificacao, TipoNotificacao } from '../../types/dashboard';
import api from '../../Services/apiService';

const BADGE_COR: Record<TipoNotificacao, string> = {
  info: 'blue',
  sucesso: 'green',
  alerta: 'yellow',
  erro: 'red',
};

const TIPO_ICON: Record<TipoNotificacao, React.ReactNode> = {
  info: <IconAlertCircle size={14} />,
  sucesso: <IconCircleCheck size={14} />,
  alerta: <IconHourglass size={14} />,
  erro: <IconAlertCircle size={14} />,
};

function iniciais(nome?: string) {
  if (!nome) return '?';
  return nome
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

export default function FeedNotificacoes() {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const { data } = await api.get<Notificacao[]>('projetos/notificacoes');
        setNotificacoes(data);
      } catch {
        setNotificacoes([]);
      } finally {
        setCarregando(false);
      }
    };

    fetchDados();
  }, []);

  return (
    <Card withBorder radius="md" p="lg">
      <Group justify="space-between" mb="md">
        <Text fw={600}>Últimas notificações</Text>
      </Group>

      {carregando ? (
        <Stack gap="sm">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} height={56} radius="md" />
          ))}
        </Stack>
      ) : notificacoes.length === 0 ? (
        <Text size="sm" c="dimmed">
          Nenhuma notificação registrada ainda. As ações no sistema aparecerão aqui.
        </Text>
      ) : (
        <ScrollArea h={420} offsetScrollbars scrollbarSize={8}>
          <Stack gap={0} pr="sm">
            {notificacoes.map((n, i) => (
              <div key={n.id}>
                <Group align="flex-start" py="sm" gap="md" wrap="nowrap">
                  <Avatar
                    size="sm"
                    radius="xl"
                    color="green"
                    style={{ flexShrink: 0, marginTop: 2 }}
                  >
                    {iniciais(n.usuario)}
                  </Avatar>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Group gap={6} mb={2} wrap="nowrap">
                      <Badge
                        size="xs"
                        variant="light"
                        color={BADGE_COR[n.tipo]}
                        leftSection={TIPO_ICON[n.tipo]}
                      >
                        {n.tipo}
                      </Badge>

                      <Text size="xs" c="dimmed" style={{ whiteSpace: 'nowrap' }}>
                        {n.usuario}
                      </Text>
                    </Group>

                    <Text size="sm" style={{ wordBreak: 'break-word' }}>
                      {n.mensagem}
                    </Text>
                  </div>

                  <Text
                    size="xs"
                    c="dimmed"
                    style={{ whiteSpace: 'nowrap', flexShrink: 0, marginTop: 2 }}
                  >
                    {n.data}
                  </Text>
                </Group>

                {i < notificacoes.length - 1 && <Divider />}
              </div>
            ))}
          </Stack>
        </ScrollArea>
      )}
    </Card>
  );
}

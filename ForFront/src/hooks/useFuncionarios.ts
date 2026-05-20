import { useEffect, useState } from 'react';
import api from '../Services/apiService';
import { notifications } from '@mantine/notifications';

export const useFuncionarios = () => {
  const [data, setData] = useState<{ value: string; label: string }[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFuncionarios = async () => {
      setLoading(true);

      try {
        const response = await api.get('usuarios/listarUsuario');

        const ativos = response.data
          .filter((f: any) => f.status === 'Ativo')
          .map((f: any) => ({
            value: String(f.id),
            label: f.nome,
          }));

        setData(ativos);
      } catch {
        notifications.show({
          title: 'Erro',
          message: 'Não foi possível carregar funcionários.',
          color: 'red',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFuncionarios();
  }, []);

  return {
    funcionarios: data,
    loading,
  };
};
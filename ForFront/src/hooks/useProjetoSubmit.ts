import { useState } from 'react';
import { notifications } from '@mantine/notifications';
import api from '../Services/apiService';
import { buildProjetoPayload } from '../utils/projetoPayload';
import type { ProjetoFormsData } from '../types/projeto';

interface UseProjetoSubmitProps {
  initialData?: ProjetoFormsData | null;
  onSubmitSuccess?: (msg: string) => void;
  onCancel?: () => void;
}

interface UseProjetoSubmitReturn {
  loading: boolean;
  sucesso: boolean;
  handleSubmit: (values: ProjetoFormsData) => Promise<void>;
}

export const useProjetoSubmit = ({
  initialData,
  onSubmitSuccess,
  onCancel,
}: UseProjetoSubmitProps): UseProjetoSubmitReturn => {
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  const handleSubmit = async (values: ProjetoFormsData) => {
    setLoading(true);

    try {
      const payload = buildProjetoPayload(values);

      const response = initialData?.id
        ? await api.patch(`projetos/atualizarProjeto/${initialData.id}`, payload)
        : await api.post('projetos/cadastrarProjeto', payload);

      if (response.status === 200 || response.status === 201) {
        setSucesso(true);

        notifications.show({
          title: 'Sucesso!',
          message: initialData
            ? 'Projeto atualizado com sucesso.'
            : 'Projeto salvo no banco de dados.',
          color: 'green',
          position: 'bottom-left',
          autoClose: 3500,
        });

        if (onSubmitSuccess) {
          setTimeout(() => onSubmitSuccess('OK'), 1500);
        }
      }
    } catch (error: any) {
      notifications.show({
        title: 'Erro ao salvar',
        message: error.response?.data?.erro || 'Verifique os dados e tente novamente.',
        color: 'red',
        position: 'bottom-left',
        autoClose: 3500,
      });

      setTimeout(() => onCancel?.(), 500);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sucesso, handleSubmit };
};
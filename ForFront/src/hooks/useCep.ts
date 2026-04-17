import { useState } from 'react';
import { notifications } from '@mantine/notifications';

interface CepData {
  cidade: string;
  estado: string;
  bairro: string;
}

interface UseCepReturn {
  loadingCep: boolean;
  fetchCep: (rawCep: string) => Promise<CepData | null>;
  maskCEP: (value: string) => string;
}

export const useCep = (): UseCepReturn => {
  const [loadingCep, setLoadingCep] = useState(false);

  const maskCEP = (value: string) =>
    value
      .replace(/\D/g, '')
      .replace(/^(\d{5})(\d)/, '$1-$2')
      .slice(0, 9);

  const fetchCep = async (rawCep: string): Promise<CepData | null> => {
    const cep = rawCep.replace(/\D/g, '');
    if (cep.length !== 8) return null;

    setLoadingCep(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        notifications.show({
          title: 'CEP não encontrado',
          message: 'Verifique o número digitado.',
          color: 'yellow',
        });
        return null;
      }

      return {
        cidade: data.localidade || '',
        estado: data.uf || '',
        bairro: data.bairro || '',
      };
    } catch {
      notifications.show({
        title: 'Erro na busca',
        message: 'Não foi possível buscar o CEP.',
        color: 'red',
      });
      return null;
    } finally {
      setLoadingCep(false);
    }
  };

  return { loadingCep, fetchCep, maskCEP };
};
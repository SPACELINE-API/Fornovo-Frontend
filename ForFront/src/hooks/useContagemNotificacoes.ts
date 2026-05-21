import { useCallback, useEffect, useState } from 'react';
import api from '../Services/apiService';

/** Dispare após marcar notificações como lidas (task do dropdown do sino). */
export const EVENTO_ATUALIZAR_CONTAGEM_NOTIFICACOES = 'fornovo:notificacoes-contagem-atualizar';

export function invalidarContagemNotificacoes() {
  window.dispatchEvent(new Event(EVENTO_ATUALIZAR_CONTAGEM_NOTIFICACOES));
}

interface ContagemResponse {
  nao_lidas: number;
}

export function useContagemNotificacoes(intervaloMs = 60_000) {
  const [naoLidas, setNaoLidas] = useState(0);
  const [carregando, setCarregando] = useState(true);

  const atualizar = useCallback(async () => {
    try {
      const { data } = await api.get<ContagemResponse>('projetos/notificacoes/contagem');
      setNaoLidas(data.nao_lidas ?? 0);
    } catch {
      setNaoLidas(0);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    atualizar();

    const intervalo = window.setInterval(atualizar, intervaloMs);
    const aoInvalidar = () => atualizar();

    window.addEventListener(EVENTO_ATUALIZAR_CONTAGEM_NOTIFICACOES, aoInvalidar);

    return () => {
      window.clearInterval(intervalo);
      window.removeEventListener(EVENTO_ATUALIZAR_CONTAGEM_NOTIFICACOES, aoInvalidar);
    };
  }, [atualizar, intervaloMs]);

  return { naoLidas, carregando, atualizar };
}

import { Outlet, useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import Menu from '../Components/layout/dashboard/Menu';
import IaBanner from '../Components/layout/dashboard/iaBanner';
import api from '../Services/apiService';

type IaEstado = 'idle' | 'processando' | 'concluida' | 'erro';

function ProjetoDetalhe() {
  const [iaEstado, setIaEstado] = useState<IaEstado>('idle');
  const { id } = useParams<{ id: string }>();

  const verificarStatusProjeto = useCallback(async () => {
    if (!id) return;

    try {
      const response = await api.get(`projetos/statusIa/${id}`);

      if (response.data.status === 'Concluído') {
        setIaEstado('concluida');
      }
    } catch (err) {
      console.error('Erro ao checar status', err);
    }
  }, [id]);

  useEffect(() => {
    let interval: number | undefined;

    if (iaEstado === 'processando' || iaEstado === 'erro') {
      interval = window.setInterval(() => {
        verificarStatusProjeto();
      }, 60000);
    }

    return () => {
      if (interval) window.clearInterval(interval);
    };
  }, [iaEstado, verificarStatusProjeto]);

  return (
    <div>
      <Menu
        iaEstado={iaEstado}
        onIniciarIA={() => setIaEstado('processando')}
        onIAconcluida={() => setIaEstado('concluida')}
        onIAerro={() => setIaEstado('erro')}
      />

      {iaEstado !== 'idle' && (
        <div style={{ padding: '0 32px' }}>
          <IaBanner
            estado={iaEstado as 'processando' | 'concluida' | 'erro'}
            onClose={() => setIaEstado('idle')}
          />
        </div>
      )}

      <Outlet />
    </div>
  );
}

export default ProjetoDetalhe;

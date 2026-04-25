import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const token = localStorage.getItem('access_token');
  const role = localStorage.getItem('user_role');

  if (!token) {
    // Redireciona para o login se não houver token
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    // Redireciona para a home ou exibe não autorizado se não tiver o nível correto
    return <Navigate to="/" replace />;
  }

  // Se estiver tudo certo, renderiza as rotas filhas
  return <Outlet />;
};

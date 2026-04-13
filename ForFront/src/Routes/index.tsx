import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DashboardLayout from "../Components/layout/dashboard/dashboardLayout";
import Home from "../Pages/Home.tsx";
import Normas from "../Pages/pagNormas/Normas.tsx";
import ProjetoDetalhe from '../Pages/ProjetoDetalhe.tsx';
import Resumo from '../Pages/detalhes/Resumo.tsx';
import Calculo from '../Pages/detalhes/Calculo.tsx';
import Relatorio from '../Pages/detalhes/Relatorio.tsx';
import Especificacoes from '../Pages/detalhes/Especificacoes.tsx';
import Projetos from "../Pages/pagProjetos/Projetos.tsx"
import Recentes from "../Pages/Recentes.tsx"
import Funcionarios from "../Pages/admin/Funcionarios.tsx"
//import ProtectedRoute from '../Components/layout/auth/ProtectedRoute.tsx';

const router = createBrowserRouter([
     /*{
        path: "/",
        element: < />
    }, 
     element: <ProtectedRoute />,
        children: [*/
    {
        path: "/",
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "normas",
                element: <Normas />
            },
            {
                path: "projetos",
                element: <Projetos />
            },
            {
                path: "detalhe/:id/",
                element: <ProjetoDetalhe />,
                children: [
                    {
                        path: "resumo",
                        element: <Resumo />
                    },
                    {
                        path: "especificacoes",
                        element: <Especificacoes />
                    },
                    {
                        path: "relatorio",
                        element: <Relatorio />
                    },
                    {
                        path: "calculo",
                        element: <Calculo />
                    }
                ]
            },
            {
                path: "recentes",
                element: <Recentes />
            },
            {
                path: "funcionarios",
                element: <Funcionarios />
            },

        ]
    }
]);

function AppRoutes() {
    return <RouterProvider router={router} />;
}

export default AppRoutes;
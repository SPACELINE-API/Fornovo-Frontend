import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DashboardLayout from "../Components/layout/dashboard/dashboardLayout";
import Home from "../Pages/Home.tsx"
import Normas from "../Pages/Normas.tsx"
import Projetos from "../Pages/Projetos.tsx"
import Recentes from "../Pages/Recentes.tsx"
import Funcionarios from "../Pages/admin/Funcionarios.tsx"

const router = createBrowserRouter([
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
                path: "recentes",
                element: <Recentes />
            },
            {
                path: "funcionarios",
                element: <Funcionarios />
            }

        ]
    }
]);

function AppRoutes() {
  return <RouterProvider router={router} />;
}

export default AppRoutes;
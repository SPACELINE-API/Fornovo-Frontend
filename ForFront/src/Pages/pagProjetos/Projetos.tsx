import { useState } from "react";
import { Button, Group, Title } from "@mantine/core";
import ModalCriarProjeto from "./CriarProjeto";

export default function Projetos() {
  const [opened, setOpened] = useState(false);
//   const [listaProjetos, setListaProjetos] = useState([]);
//   const carregarProjetos = () => {
//     const dados = JSON.parse(localStorage.getItem("@Fornovo:projetos") || "[]");
//     setListaProjetos(dados);
//   };

//   useEffect(() => {
//     carregarProjetos();
//   }, []);

  return (
    <div style={{ padding: '24px' }}>
      <Group justify="space-between" mb="xl">
        <Title order={2} className="">Projetos</Title>
        <Button 
            color="#34623F" 
            onClick={() => {
                setOpened(true);
            }}
            >
            + Novo Projeto
        </Button>
      </Group>

      <ModalCriarProjeto 
        opened={opened} 
        onClose={() => {
          setOpened(false);
        //   carregarProjetos();
        }} 
      />
    </div>
  );
}
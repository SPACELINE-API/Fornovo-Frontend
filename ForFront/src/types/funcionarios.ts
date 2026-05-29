export type NivelUsuario = 'Administrador' | 'Projetista' | 'Revisor';
export type StatusFunc = 'Ativo' | 'Inativo';

export interface Funcionario {
  id: string;
  nome: string;
  email: string;
  senha: string;
  nivelUsuario: string;
  status: StatusFunc;
}

export interface FuncFormData {
  id: string;
  nome: string;
  email: string;
  senha: string;
  nivelUsuario: string;
}

export interface ModalCriarFuncProps {
  opened: boolean;
  onClose: () => void;
  onSubmitSuccess?: () => void;
  initialData?: FuncFormData | null;
}

export interface ModalEditarFuncProps {
  opened: boolean;
  onClose: () => void;
  onSubmitSuccess?: () => void;
  func: FuncFormData | null;
}

export interface FormFuncionarioProps {
  onSubmitSuccess: () => void;
  onCancel: () => void;
  initialData?: FuncFormData;
}

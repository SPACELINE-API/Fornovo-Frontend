export type StatusNorma = 'ativo' | 'inativo';

export interface Norma {
  id: number;
  codigo: string;
  nome: string;
  ano: number;
  descricao: string;
  status: StatusNorma;
  url_arquivo?: string | null;
}

export interface NormaFormData {
  id: number;
  codigo: string;
  nome: string;
  ano: number;
  serie?: string;
  descricao: string;
  arquivo: File | null;
  url_arquivo?: string | null;
}

export interface ModalCriarNormaProps {
  opened: boolean;
  onClose: () => void;
  onSubmitSuccess?: () => void;
  initialData?: NormaFormData | null;
}

export interface ModalEditarNormaProps {
  opened: boolean;
  onClose: () => void;
  norma: NormaFormData | null;
  onSubmitSuccess: () => void;
}

export interface FormularioNormaProps {
  onSubmitSuccess: () => void;
  onCancel: () => void;
  initialData?: NormaFormData;
}

export type Condicao = "novo" | "usado";

export interface ProdutoFormValues {
  secao: string;
  marca: string;
  nome: string;
  preco: number; 
  condicao: Condicao;
}

export interface Option {
  label: string;
  value: string;
}

export interface FormProdutoProps {
  secoes: Option[];
  marcas: Option[];
  initialValues?: Partial<ProdutoFormValues>;
  onSubmit: (values: ProdutoFormValues) => void;
  loading?: boolean;
  className?: string;
}

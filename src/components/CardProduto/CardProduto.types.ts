export type ProdutoCondicao = "novo" | "usado";

export interface CardProdutoProps {
  marca: string;
  nome: string;
  preco: number;
  condicao: ProdutoCondicao;
  imagemMarcaSrc?: string;
  className?: string;
  onClick?: () => void;
}

import type { ElementType } from "react";
import type { CardProdutoProps } from "@/components/CardProduto";

export type SectionKey =
  | "computadores"
  | "acessorios"
  | "impressoras"
  | "games"
  | "gadgets";

export interface Secao {
  key: SectionKey;
  title: string;
  bg: string;
  accent: string;
  Icon: ElementType; 
}

export interface SecoesProps {
  className?: string;
  cols?: 1 | 2 | 3 | 4;
  data?: Partial<Record<SectionKey, CardProdutoProps[]>>;
}

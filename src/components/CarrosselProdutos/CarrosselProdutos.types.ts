import type { CardProdutoProps } from "@/components/CardProduto";
import type { SectionKey } from "@/components/Secoes";

export interface CarrosselItem {
  id: string;
  secao: SectionKey;
  produto: CardProdutoProps;
}

export interface CarrosselProdutosProps {
  items: CarrosselItem[];
  autoPlay?: boolean;
  className?: string;
}

import React from "react";
import { Card } from "antd";
import type { CardProdutoProps } from "./CardProduto.types";
import { palette } from "@/theme/palette";
import { useCurrency } from "@/hooks";
import fallbackLogo from "@/assets/images/logo.png";

const Pill: React.FC<{ condicao: CardProdutoProps["condicao"] }> = ({ condicao }) => {
  const isNovo = condicao === "novo";
  const style = isNovo
    ? { color: palette.leaf700, background: "rgba(47,158,68,0.12)" }
    : { color: "#7A5E00", background: "rgba(247,181,0,0.18)" };

  return (
    <span
      className="px-2 py-0.5 rounded-full text-xs font-medium select-none"
      style={style}
    >
      {isNovo ? "Novo" : "Usado"}
    </span>
  );
};

const CardProduto: React.FC<CardProdutoProps> = ({
  marca,
  nome,
  preco,
  condicao,
  imagemMarcaSrc,
  className,
  onClick,
}) => {
  const { formatCurrency } = useCurrency();
  const precoFmt = `R$ ${formatCurrency(preco)}`;

  return (
    <Card
      hoverable
      onClick={onClick}
      className={`rounded-xl overflow-hidden ring-1 ring-[#E3F2D1] shadow-sm ${className ?? ""}`}
      styles={{
        body: { padding: 16, background: palette.card },
      }}
    >
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full ring-1 ring-[#E3F2D1] bg-white overflow-hidden flex items-center justify-center">
          <img
            src={imagemMarcaSrc ?? fallbackLogo}
            alt={marca}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="text-sm text-inkSoft leading-tight truncate">{marca}</div>
          <div className="font-brandSerif text-[15px] text-ink truncate" title={nome}>
            {nome}
          </div>
          <div className="mt-1 font-semibold text-leaf-700">{precoFmt}</div>
        </div>

        <Pill condicao={condicao} />
      </div>
    </Card>
  );
};

export default CardProduto;

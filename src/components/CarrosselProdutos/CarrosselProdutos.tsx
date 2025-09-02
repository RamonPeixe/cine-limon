import React, { useRef } from "react";
import { Carousel, Tag, Button } from "antd";
import type { CarouselRef } from "antd/es/carousel";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import type { CarrosselProdutosProps } from "./CarrosselProdutos.types";
import type { SectionKey } from "@/components/Secoes";
import { palette } from "@/theme/palette";
import { useCurrency } from "@/hooks";

const META: Record<SectionKey, { title: string; color: string; bg: string }> = {
  computadores: {
    title: "Computadores",
    color: palette.leaf700,
    bg: "rgba(47,158,68,0.10)",
  },
  acessorios: {
    title: "Acessórios",
    color: palette.lemon500,
    bg: "rgba(247,181,0,0.12)",
  },
  impressoras: {
    title: "Impressoras",
    color: palette.leaf500,
    bg: "rgba(47,158,68,0.10)",
  },
  games: { title: "Games", color: "#2E90FF", bg: "rgba(46,144,255,0.12)" },
  gadgets: {
    title: "Gadgets",
    color: palette.leaf500,
    bg: "rgba(47,158,68,0.10)",
  },
};

const Pill: React.FC<{ condicao: "novo" | "usado" }> = ({ condicao }) => {
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

const CarrosselProdutos: React.FC<CarrosselProdutosProps> = ({
  items,
  autoPlay = true,
  className,
}) => {
  const ref = useRef<CarouselRef>(null);
  const { formatCurrency } = useCurrency();
  if (!items || items.length === 0) return null;

  return (
    <div
      className={`rounded-2xl bg-white p-6 ring-1 ring-[#E8E6DB] shadow-[0_12px_32px_rgba(20,32,34,0.06)] min-h-[440px] ${
        className ?? ""
      }`}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-brandSerif text-xl text-[#0F1F2B]">
          Adicionados Recentemente
        </h3>
        <div className="flex gap-2">
          <Button
            size="small"
            icon={<LeftOutlined />}
            onClick={() => ref.current?.prev()}
          />
          <Button
            size="small"
            icon={<RightOutlined />}
            onClick={() => ref.current?.next()}
          />
        </div>
      </div>

      <Carousel
        ref={ref}
        autoplay={autoPlay}
        effect="scrollx"
        dots={{ className: "limon-carousel-dots" }}
      >
        {items.map(({ id, secao, produto }) => {
          const meta = META[secao];
          const precoFmt = `R$ ${formatCurrency(produto.preco)}`;

          return (
            <div key={id}>
              <div className="flex flex-col items-center text-center gap-4 px-2 py-2 pb-8">
                <Tag
                  bordered={false}
                  style={{
                    alignSelf: "center",
                    color: meta.color,
                    background: meta.bg,
                  }}
                >
                  {meta.title}
                </Tag>

                <div className="h-28 w-28 rounded-full ring-2 ring-[#E3F2D1] bg-white overflow-hidden flex items-center justify-center">
                  {produto.imagemMarcaSrc ? (
                    <img
                      src={produto.imagemMarcaSrc}
                      alt={produto.marca}
                      className="h-full w-full object-contain p-2"
                    />
                  ) : null}
                </div>

                <div className="space-y-1">
                  <div className="text-sm text-[#334A52]">{produto.marca}</div>
                  <div
                    className="font-brandSerif text-lg text-[#0F1F2B]"
                    title={produto.nome}
                  >
                    {produto.nome}
                  </div>
                  <div
                    className="font-semibold text-[15px]"
                    style={{ color: palette.leaf700 }}
                  >
                    {precoFmt}
                  </div>
                </div>

                <span className="z-10">
                  <Pill condicao={produto.condicao} />
                </span>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default CarrosselProdutos;

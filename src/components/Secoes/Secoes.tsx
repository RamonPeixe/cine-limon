import React from "react";
import type { Secao, SecoesProps, SectionKey } from "./Secoes.types";
import { LaptopOutlined, UsbOutlined, PrinterOutlined, RocketOutlined, BulbOutlined } from "@ant-design/icons";
import { palette } from "@/theme/palette";
import CardProduto from "@/components/CardProduto";

const SECOES: Secao[] = [
  { key: "computadores", title: "Computadores", bg: "#E7FBF7", accent: palette.leaf700, Icon: LaptopOutlined },
  { key: "acessorios",   title: "Acessórios",   bg: "#FFF9E6", accent: palette.lemon500, Icon: UsbOutlined },
  { key: "impressoras",  title: "Impressoras",  bg: "#F0FBF1", accent: palette.leaf500,  Icon: PrinterOutlined },
  { key: "games",        title: "Games",        bg: "#EEF5FF", accent: "#2E90FF",        Icon: RocketOutlined },
  { key: "gadgets",      title: "Gadgets",      bg: "#D5F4EF", accent: palette.leaf500,  Icon: BulbOutlined },
];

const Secoes: React.FC<SecoesProps> = ({ className, cols = 3, data = {} }) => {
  const gridCols =
    cols === 4 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
    : cols === 3 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
    : cols === 2 ? "grid-cols-1 sm:grid-cols-2"
    : "grid-cols-1";

  return (
    <div className={className ?? ""}>
      <div className="space-y-8">
        {SECOES.map(({ key, title, bg, accent, Icon }) => {
          const items = data[key as SectionKey] ?? [];
          if (items.length === 0) return null;

          return (
            <section
              key={key}
              className="rounded-2xl overflow-hidden ring-1 shadow-sm"
              style={{ background: bg, boxShadow: "0 10px 28px rgba(20,32,34,0.06)", borderColor: "#E8E6DB" }}
            >
              <header className="px-6 py-4 flex items-center gap-3">
                <span
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full"
                  style={{
                    color: accent,
                    background:
                      accent === "#2E90FF" ? "rgba(46,144,255,0.12)"
                      : accent === palette.lemon500 ? "rgba(247,181,0,0.12)"
                      : "rgba(47,158,68,0.12)",
                  }}
                >
                  <Icon />
                </span>
                <h3 className="font-brandSerif text-xl" style={{ color: "#0F1F2B" }}>{title}</h3>
                <div className="ml-3 h-[2px] flex-1 rounded" style={{ background: `${accent}33` }} />
              </header>

              <div className={`p-6 grid ${gridCols} gap-6`}>
                {items.map((p, i) => <CardProduto key={`${key}-${i}`} {...p} />)}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default Secoes;

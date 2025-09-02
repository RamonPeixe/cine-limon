import { useMemo, useState } from "react";
import Header from "@/components/Header";
import FormProduto from "@/components/FormProduto";
import type { ProdutoFormValues } from "@/components/FormProduto";
import Secoes from "@/components/Secoes";
import type { SectionKey } from "@/components/Secoes";
import CarrosselProdutos from "@/components/CarrosselProdutos";
import type { CarrosselItem } from "@/components/CarrosselProdutos";
import type { CardProdutoProps } from "@/components/CardProduto";
import Swal from "sweetalert2";
import { brandLogo } from "@/utils"; 

const secoes = [
  { label: "Computadores", value: "computadores" },
  { label: "Acessórios",   value: "acessorios" },
  { label: "Impressoras",  value: "impressoras" },
  { label: "Games",        value: "games" },
  { label: "Gadgets",      value: "gadgets" },
];

const marcas = [
  { label: "HP",                 value: "hp" },
  { label: "Positivo",           value: "positivo" },
  { label: "Xing Ling Genérico", value: "generica" },
  { label: "ASUS",               value: "asus" },
  { label: "Dell",               value: "dell" },
];

export default function App() {
  const [items, setItems] = useState<CarrosselItem[]>([]);

  const handleSubmit = (values: ProdutoFormValues) => {
    const secao = values.secao as SectionKey;
    const marcaValue = values.marca;
    const marcaLabel = marcas.find(m => m.value === marcaValue)?.label ?? marcaValue;

    const imagemMarcaSrc = brandLogo(marcaValue);

    const produtoCard: CardProdutoProps = {
      marca: marcaLabel,
      nome: values.nome,
      preco: Number(values.preco),
      condicao: values.condicao,
      imagemMarcaSrc,
    };

    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

    const item: CarrosselItem = { id, secao, produto: produtoCard };

    setItems(prev => [item, ...prev]);

    const secaoLabel = secoes.find(s => s.value === secao)?.label ?? secao;
    void Swal.fire({
      title: "Produto adicionado!",
      text: `${marcaLabel} — ${values.nome} em ${secaoLabel}`,
      icon: "success",
      confirmButtonText: "Ok",
      confirmButtonColor: "#2F9E44",
    });
  };

  const grouped = useMemo(() => {
    return items.reduce((acc, it) => {
      (acc[it.secao] ??= []).push(it.produto);
      return acc;
    }, {} as Partial<Record<SectionKey, CardProdutoProps[]>>);
  }, [items]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <section className="lg:col-span-1">
            <FormProduto secoes={secoes} marcas={marcas} onSubmit={handleSubmit} />
          </section>

          <section className="lg:col-span-1">
            <CarrosselProdutos items={items} autoPlay />
          </section>
        </div>

        <div className="mt-10">
          <Secoes cols={3} data={grouped} />
        </div>
      </main>
    </div>
  );
}

import { useMemo } from "react";
import { parseCurrencyRaw } from "@/utils";

type UseCurrencyOpts = {
  locale?: string;
  minFractionDigits?: number;
  maxFractionDigits?: number;
};

export function useCurrency(opts: UseCurrencyOpts = {}) {
  const {
    locale = "pt-BR",
    minFractionDigits = 2,
    maxFractionDigits = 2,
  } = opts;

  const nf = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        minimumFractionDigits: minFractionDigits,
        maximumFractionDigits: maxFractionDigits,
      }),
    [locale, minFractionDigits, maxFractionDigits]
  );

  const formatCurrency = (v?: string | number | null) => {
    if (v === undefined || v === null || v === "") return "";
    const n = typeof v === "number" ? v : Number(v);
    return nf.format(n);
  };

  const parseCurrency = (v?: string) => parseCurrencyRaw(v);

  return { formatCurrency, parseCurrency };
}

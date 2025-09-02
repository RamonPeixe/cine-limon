export function formatCurrencyRaw(
  v?: number | string | null,
  min = 2,
  max = 2,
  locale = "pt-BR"
): string {
  if (v === undefined || v === null || v === "") return "";
  const n = typeof v === "number" ? v : Number(v);
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: min,
    maximumFractionDigits: max,
  }).format(n);
}

export function parseCurrencyRaw(v?: string): number {
  if (!v) return 0;

  const cleaned = v.replace(/[^\d.,-]/g, "");

  const lastComma = cleaned.lastIndexOf(",");
  const lastDot = cleaned.lastIndexOf(".");

  let normalized = cleaned;

  if (lastComma > lastDot) {
    normalized = cleaned.replace(/\./g, "").replace(",", ".");
  } else {
    normalized = cleaned.replace(/,/g, "");
  }

  const n = Number(normalized);
  return Number.isNaN(n) ? 0 : n;
}

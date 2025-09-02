import hp from "@/assets/images/marca-hp.png";
import positivo from "@/assets/images/marca-positivo.png";
import generica from "@/assets/images/marca-generica.png";
import dell from "@/assets/images/marca-dell.png";
import asus from "@/assets/images/marca-asus.png";

export type BrandKey = "hp" | "positivo" | "generica" | "dell" | "asus";

export const BRAND_LOGO: Record<BrandKey, string> = {
  hp,
  positivo,
  generica,
  dell,
  asus,
};

export function getBrandLogo(value: string): string {
  return (BRAND_LOGO as Record<string, string>)[value] ?? generica;
}

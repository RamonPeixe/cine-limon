export const palette = {
  canvas:  "#FAFFF7",
  header:  "#FFF9E6",
  surface: "#F3FFE6",
  card:    "#FFFFFF",
  border:  "#E3F2D1",
  divider: "#D4E8C2",

  ink:     "#0F1F2B",
  inkSoft: "#334A52",

  leaf500: "#2F9E44",
  leaf700: "#1E7A38",
  lemon500:"#F7B500",

  info:    "#2E90FF",
  success: "#34C759",
  warning: "#F7B500",
  danger:  "#F97066",
} as const;

export type Palette = typeof palette;
export type PaletteKey = keyof Palette;

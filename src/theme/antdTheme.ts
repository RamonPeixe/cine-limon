import type { ThemeConfig } from "antd";
import { palette } from "./palette.ts";

export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary:     palette.leaf500,
    colorText:        palette.ink,
    colorTextSecondary: palette.inkSoft,
    colorBorder:      palette.border,
    colorBgContainer: palette.card,
    borderRadius:     12,
  },
  components: {
    Input: { activeShadow: "0 0 0 2px rgba(47,158,68,0.15)" },
    Select:{ optionSelectedBg: "#EAF7EE" },
  },
};

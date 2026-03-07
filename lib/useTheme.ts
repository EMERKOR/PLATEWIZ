import { createContext, useContext } from "react";
import type { Theme } from "@/types/theme";
import themeData from "@/config/theme.json";

const theme: Theme = themeData as Theme;

const ThemeContext = createContext<Theme>(theme);

export function useTheme(): Theme {
  return useContext(ThemeContext);
}

export { ThemeContext, theme };

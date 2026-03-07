import "../global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemeContext, theme } from "@/lib/useTheme";

export default function RootLayout() {
  return (
    <ThemeContext.Provider value={theme}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      />
    </ThemeContext.Provider>
  );
}

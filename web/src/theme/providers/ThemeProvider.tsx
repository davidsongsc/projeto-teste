"use client";

import { App, ConfigProvider } from "antd";
import { ReactNode, useMemo } from "react";
import { antdDarkTheme, antdLightTheme } from "@/src/theme";

interface ThemeProviderProps {
  children: ReactNode;
  theme?: "light" | "dark";
}

export default function ThemeProvider({
  children,
  theme = "dark",
}: ThemeProviderProps) {
  const config = useMemo(
    () => (theme === "dark" ? antdDarkTheme : antdLightTheme),
    [theme]
  );

  return (
    <ConfigProvider theme={config}>
      <App>{children}</App>
    </ConfigProvider>
  );
}
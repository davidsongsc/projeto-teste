'use client';

import { useMemo, ReactNode } from 'react';
import { ConfigProvider, App, theme } from 'antd';
import { lightColors, darkColors } from '../colors';
import NotificationProvider from './NotificationProvider';

interface ThemeProviderProps {
  children: ReactNode;
  themeType?: "light" | "dark";
}

export default function ThemeProvider({
  children,
  themeType = "dark",
}: ThemeProviderProps) {

  const colors = themeType === "dark" ? darkColors : lightColors;

  const config = useMemo(() => ({
    algorithm: themeType === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: colors.primary,
      colorBgBase: colors.background,
      colorBgContainer: colors.surface,
      colorTextBase: colors.text,
      colorTextSecondary: colors.textSecondary,
      colorBorder: colors.border,
      borderRadius: 8,
      fontSize: 14,
    },
    components: {
      Card: {
        headerBg: colors.surface,
        colorBgContainer: colors.surface,
      },
      Input: {
        controlHeightLG: 45,
        colorBgContainer: colors.surface,
        colorBorder: colors.border,
        textColor: colors.text,
        padding: 8, 
      },
      Button: {
        borderRadius: 6,
        controlHeightLG: 45,
      }
    }
  }), [themeType, colors]);

  return (
    <ConfigProvider theme={config}>
      <App>
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </App>
    </ConfigProvider>
  );
}
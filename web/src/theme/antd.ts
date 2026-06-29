import { theme } from "antd";
import { darkColors, lightColors } from "./colors";

export const antdLightTheme = {
  algorithm: theme.defaultAlgorithm,

  token: {
    colorPrimary: lightColors.primary,

    colorSuccess: lightColors.success,
    colorWarning: lightColors.warning,
    colorError: lightColors.error,

    colorBgBase: lightColors.background,
    colorBgContainer: lightColors.surface,

    colorText: lightColors.text,
    colorTextSecondary: lightColors.textSecondary,

    colorBorder: lightColors.border,
  },
};

export const antdDarkTheme = {
  algorithm: theme.darkAlgorithm,

  token: {
    colorPrimary: darkColors.primary,

    colorSuccess: darkColors.success,
    colorWarning: darkColors.warning,
    colorError: darkColors.error,

    colorBgBase: darkColors.background,
    colorBgContainer: darkColors.surface,

    colorText: darkColors.text,
    colorTextSecondary: darkColors.textSecondary,

    colorBorder: darkColors.border,
  },
};
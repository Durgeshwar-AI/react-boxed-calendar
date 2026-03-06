import { lightTheme } from "./light";
import { darkTheme } from "./dark";
import { metallicTheme } from "./metallic";
import { cyberpunkTheme } from "./cyberpunk";
import { retroTheme } from "./retro";
import { natureTheme } from "./nature";
import { monthThemes as seasonalThemes } from "./seasonal";

export type CalendarTheme = {
  containerBg?: string;
  containerBorder?: string;
  selectedBg: string;
  selectedText: string;
  todayBg: string;
  todayText: string;
  normalText: string;
  normalHoverBg: string;
  disabledBg: string;
  disabledText: string;
  borderRadius: string;
};

// Static themes (single theme object)
export const themes: Record<string, CalendarTheme> = {
  light: lightTheme,
  dark: darkTheme,
  metallic: metallicTheme,
  cyberpunk: cyberpunkTheme,
  retro: retroTheme,
  nature: natureTheme,
};

export const monthlyThemes: Record<string, Record<number, CalendarTheme>> = {
  seasonal: seasonalThemes,
};

export function getThemeForMonth(
  themeName: string,
  monthIndex: number
): CalendarTheme {
  if (themeName in monthlyThemes) {
    return monthlyThemes[themeName][monthIndex];
  }
  return themes[themeName] || themes.light;
}

export { monthThemes } from "./seasonal";
import { lightTheme } from "./light";
import { darkTheme } from "./dark";
import { metallicTheme } from "./metallic";
import { cyberpunkTheme } from "./cyberpunk";
import { retroTheme } from "./retro";
import { natureTheme } from "./nature";

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

export const themes: Record<string, CalendarTheme> = {
  light: lightTheme,
  dark: darkTheme,
  metallic: metallicTheme,
  cyberpunk: cyberpunkTheme,
  retro: retroTheme,
  nature: natureTheme,
};
import { lightTheme } from "./light";
import { darkTheme } from "./dark";
import { metallicTheme } from "./metallic";

export type CalendarTheme = {
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
};
import { type CalendarTheme } from "./index";

/**
 * Unified Month Themes - Combines all 12 months with Indian cultural colors
 * Each month has distinct background styling representing its festival/season
 * Includes Primary, Water, and Fog theme variants
 */

// Primary Themes
const monthThemes: Record<number, CalendarTheme> = {
  // January - Makar Sankranti
  0: {
    containerBg: "bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100",
    containerBorder: "border border-orange-400",
    selectedBg: "bg-blue-600",
    selectedText: "text-white",
    todayBg: "bg-yellow-300",
    todayText: "text-gray-900",
    normalText: "text-gray-800",
    normalHoverBg: "hover:bg-gray-100",
    disabledBg: "bg-gray-100",
    disabledText: "text-gray-400",
    borderRadius: "rounded-xl",
  },

  // February - Vasant Panchami
  1: {
    containerBg: "bg-gradient-to-br from-yellow-100 via-lime-100 to-green-100",
    containerBorder: "border border-yellow-400",
    selectedBg: "bg-blue-600",
    selectedText: "text-white",
    todayBg: "bg-yellow-300",
    todayText: "text-gray-900",
    normalText: "text-gray-800",
    normalHoverBg: "hover:bg-gray-100",
    disabledBg: "bg-gray-100",
    disabledText: "text-gray-400",
    borderRadius: "rounded-xl",
  },

  // March - Holi (Festival of Colors)
  2: {
    containerBg: "bg-gradient-to-br from-red-100 via-yellow-100 to-green-100",
    containerBorder: "border border-red-400",
    selectedBg: "bg-blue-600",
    selectedText: "text-white",
    todayBg: "bg-yellow-300",
    todayText: "text-gray-900",
    normalText: "text-gray-800",
    normalHoverBg: "hover:bg-gray-100",
    disabledBg: "bg-gray-100",
    disabledText: "text-gray-400",
    borderRadius: "rounded-xl",
  },

  // April - Gudi Padwa (Indian New Year)
  3: {
    containerBg: "bg-gradient-to-br from-orange-100 via-yellow-100 to-green-100",
    containerBorder: "border border-orange-400",
    selectedBg: "bg-blue-600",
    selectedText: "text-white",
    todayBg: "bg-yellow-300",
    todayText: "text-gray-900",
    normalText: "text-gray-800",
    normalHoverBg: "hover:bg-gray-100",
    disabledBg: "bg-gray-100",
    disabledText: "text-gray-400",
    borderRadius: "rounded-xl",
  },

  // May - Summer Heat
  4: {
    containerBg: "bg-gradient-to-br from-red-100 via-orange-100 to-yellow-100",
    containerBorder: "border border-red-400",
    selectedBg: "bg-blue-600",
    selectedText: "text-white",
    todayBg: "bg-yellow-300",
    todayText: "text-gray-900",
    normalText: "text-gray-800",
    normalHoverBg: "hover:bg-gray-100",
    disabledBg: "bg-gray-100",
    disabledText: "text-gray-400",
    borderRadius: "rounded-xl",
  },

  // June - Monsoon Season
  5: {
    containerBg: "bg-gradient-to-br from-green-100 via-emerald-100 to-blue-100",
    containerBorder: "border border-green-400",
    selectedBg: "bg-blue-600",
    selectedText: "text-white",
    todayBg: "bg-yellow-300",
    todayText: "text-gray-900",
    normalText: "text-gray-800",
    normalHoverBg: "hover:bg-gray-100",
    disabledBg: "bg-gray-100",
    disabledText: "text-gray-400",
    borderRadius: "rounded-xl",
  },

  // July - Rath Yatra
  6: {
    containerBg: "bg-gradient-to-br from-red-100 via-yellow-100 to-green-100",
    containerBorder: "border border-red-400",
    selectedBg: "bg-blue-600",
    selectedText: "text-white",
    todayBg: "bg-yellow-300",
    todayText: "text-gray-900",
    normalText: "text-gray-800",
    normalHoverBg: "hover:bg-gray-100",
    disabledBg: "bg-gray-100",
    disabledText: "text-gray-400",
    borderRadius: "rounded-xl",
  },

  // August - Janmashtami & Independence Day
  7: {
    containerBg: "bg-gradient-to-br from-blue-100 via-orange-100 to-green-100",
    containerBorder: "border border-blue-400",
    selectedBg: "bg-blue-600",
    selectedText: "text-white",
    todayBg: "bg-yellow-300",
    todayText: "text-gray-900",
    normalText: "text-gray-800",
    normalHoverBg: "hover:bg-gray-100",
    disabledBg: "bg-gray-100",
    disabledText: "text-gray-400",
    borderRadius: "rounded-xl",
  },

  // September - Ganesh Chaturthi
  8: {
    containerBg: "bg-gradient-to-br from-red-100 via-orange-100 to-yellow-100",
    containerBorder: "border border-red-400",
    selectedBg: "bg-blue-600",
    selectedText: "text-white",
    todayBg: "bg-yellow-300",
    todayText: "text-gray-900",
    normalText: "text-gray-800",
    normalHoverBg: "hover:bg-gray-100",
    disabledBg: "bg-gray-100",
    disabledText: "text-gray-400",
    borderRadius: "rounded-xl",
  },

  // October - Navratri & Dussehra
  9: {
    containerBg: "bg-gradient-to-br from-red-100 via-yellow-100 to-purple-100",
    containerBorder: "border border-purple-400",
    selectedBg: "bg-blue-600",
    selectedText: "text-white",
    todayBg: "bg-yellow-300",
    todayText: "text-gray-900",
    normalText: "text-gray-800",
    normalHoverBg: "hover:bg-gray-100",
    disabledBg: "bg-gray-100",
    disabledText: "text-gray-400",
    borderRadius: "rounded-xl",
  },

  // November - Diwali (Festival of Lights)
  10: {
    containerBg: "bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100",
    containerBorder: "border border-yellow-400",
    selectedBg: "bg-blue-600",
    selectedText: "text-white",
    todayBg: "bg-yellow-300",
    todayText: "text-gray-900",
    normalText: "text-gray-800",
    normalHoverBg: "hover:bg-gray-100",
    disabledBg: "bg-gray-100",
    disabledText: "text-gray-400",
    borderRadius: "rounded-xl",
  },

  // December - Winter Festival
  11: {
    containerBg: "bg-gradient-to-br from-blue-100 via-cyan-100 to-orange-100",
    containerBorder: "border border-blue-400",
    selectedBg: "bg-blue-600",
    selectedText: "text-white",
    todayBg: "bg-yellow-300",
    todayText: "text-gray-900",
    normalText: "text-gray-800",
    normalHoverBg: "hover:bg-gray-100",
    disabledBg: "bg-gray-100",
    disabledText: "text-gray-400",
    borderRadius: "rounded-xl",
  },
};

/**
 * Get theme for a specific month
 * @param monthIndex - Month index (0-11)
 * @returns CalendarTheme for the month
 */
export const getMonthTheme = (monthIndex: number): CalendarTheme => {
  return monthThemes[monthIndex] || monthThemes[0];
};

/**
 * Get all month themes
 */
export const getAllMonthThemes = (): Record<number, CalendarTheme> => {
  return monthThemes;
};

// ============ JANUARY VARIANTS ============
export const januaryTheme = monthThemes[0];
export const januaryWaterTheme: CalendarTheme = {
  containerBg: "bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50",
  containerBorder: "border border-cyan-400",
  selectedBg: "bg-blue-600",
  selectedText: "text-white",
  todayBg: "bg-yellow-300",
  todayText: "text-gray-900",
  normalText: "text-cyan-800",
  normalHoverBg: "hover:bg-gray-100",
  disabledBg: "bg-gray-100",
  disabledText: "text-gray-400",
  borderRadius: "rounded-xl",
};
export const januaryFogTheme: CalendarTheme = {
  containerBg: "bg-gradient-to-br from-gray-100 via-slate-100 to-gray-200",
  containerBorder: "border border-gray-400",
  selectedBg: "bg-blue-600",
  selectedText: "text-white",
  todayBg: "bg-yellow-300",
  todayText: "text-gray-900",
  normalText: "text-gray-700",
  normalHoverBg: "hover:bg-gray-100",
  disabledBg: "bg-gray-100",
  disabledText: "text-gray-400",
  borderRadius: "rounded-xl",
};

// ============ FEBRUARY VARIANTS ============
export const februaryTheme = monthThemes[1];
export const februaryWaterTheme: CalendarTheme = {
  containerBg: "bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50",
  containerBorder: "border border-teal-300",
  selectedBg: "bg-blue-600",
  selectedText: "text-white",
  todayBg: "bg-yellow-300",
  todayText: "text-gray-900",
  normalText: "text-teal-800",
  normalHoverBg: "hover:bg-gray-100",
  disabledBg: "bg-gray-100",
  disabledText: "text-gray-400",
  borderRadius: "rounded-xl",
};
export const februaryFogTheme: CalendarTheme = {
  containerBg: "bg-gradient-to-br from-gray-50 via-slate-50 to-blue-50",
  containerBorder: "border border-gray-300",
  selectedBg: "bg-blue-600",
  selectedText: "text-white",
  todayBg: "bg-yellow-300",
  todayText: "text-gray-900",
  normalText: "text-gray-700",
  normalHoverBg: "hover:bg-gray-100",
  disabledBg: "bg-gray-100",
  disabledText: "text-gray-400",
  borderRadius: "rounded-xl",
};

// ============ MARCH VARIANTS ============
export const marchTheme = monthThemes[2];
export const marchWaterTheme: CalendarTheme = {
  containerBg: "bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50",
  containerBorder: "border border-sky-300",
  selectedBg: "bg-blue-600",
  selectedText: "text-white",
  todayBg: "bg-yellow-300",
  todayText: "text-gray-900",
  normalText: "text-sky-800",
  normalHoverBg: "hover:bg-gray-100",
  disabledBg: "bg-gray-100",
  disabledText: "text-gray-400",
  borderRadius: "rounded-xl",
};
export const marchFogTheme: CalendarTheme = {
  containerBg: "bg-gradient-to-br from-gray-100 via-slate-100 to-rose-50",
  containerBorder: "border border-gray-300",
  selectedBg: "bg-blue-600",
  selectedText: "text-white",
  todayBg: "bg-yellow-300",
  todayText: "text-gray-900",
  normalText: "text-gray-700",
  normalHoverBg: "hover:bg-gray-100",
  disabledBg: "bg-gray-100",
  disabledText: "text-gray-400",
  borderRadius: "rounded-xl",
};

// ============ APRIL VARIANTS ============
export const aprilTheme = monthThemes[3];
export const aprilWaterTheme: CalendarTheme = {
  containerBg: "bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50",
  containerBorder: "border border-emerald-300",
  selectedBg: "bg-blue-600",
  selectedText: "text-white",
  todayBg: "bg-yellow-300",
  todayText: "text-gray-900",
  normalText: "text-emerald-800",
  normalHoverBg: "hover:bg-gray-100",
  disabledBg: "bg-gray-100",
  disabledText: "text-gray-400",
  borderRadius: "rounded-xl",
};
export const aprilFogTheme: CalendarTheme = {
  containerBg: "bg-gradient-to-br from-gray-100 via-slate-100 to-green-50",
  containerBorder: "border border-gray-300",
  selectedBg: "bg-blue-600",
  selectedText: "text-white",
  todayBg: "bg-yellow-300",
  todayText: "text-gray-900",
  normalText: "text-gray-700",
  normalHoverBg: "hover:bg-gray-100",
  disabledBg: "bg-gray-100",
  disabledText: "text-gray-400",
  borderRadius: "rounded-xl",
};

// ============ MAY VARIANTS ============
export const mayTheme = monthThemes[4];
export const mayWaterTheme: CalendarTheme = {
  containerBg: "bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50",
  containerBorder: "border border-blue-300",
  selectedBg: "bg-blue-600",
  selectedText: "text-white",
  todayBg: "bg-yellow-300",
  todayText: "text-gray-900",
  normalText: "text-blue-800",
  normalHoverBg: "hover:bg-gray-100",
  disabledBg: "bg-gray-100",
  disabledText: "text-gray-400",
  borderRadius: "rounded-xl",
};
export const mayFogTheme: CalendarTheme = {
  containerBg: "bg-gradient-to-br from-gray-100 via-slate-100 to-amber-50",
  containerBorder: "border border-gray-300",
  selectedBg: "bg-blue-600",
  selectedText: "text-white",
  todayBg: "bg-yellow-300",
  todayText: "text-gray-900",
  normalText: "text-gray-700",
  normalHoverBg: "hover:bg-gray-100",
  disabledBg: "bg-gray-100",
  disabledText: "text-gray-400",
  borderRadius: "rounded-xl",
};

// ============ JUNE VARIANTS ============
export const juneTheme = monthThemes[5];
export const juneWaterTheme: CalendarTheme = {
  containerBg: "bg-gradient-to-br from-slate-100 via-cyan-50 to-teal-100",
  containerBorder: "border border-slate-400",
  selectedBg: "bg-blue-600",
  selectedText: "text-white",
  todayBg: "bg-yellow-300",
  todayText: "text-gray-900",
  normalText: "text-slate-700",
  normalHoverBg: "hover:bg-gray-100",
  disabledBg: "bg-gray-100",
  disabledText: "text-gray-400",
  borderRadius: "rounded-xl",
};
export const juneFogTheme: CalendarTheme = {
  containerBg: "bg-gradient-to-br from-gray-200 via-slate-200 to-blue-100",
  containerBorder: "border border-gray-400",
  selectedBg: "bg-blue-600",
  selectedText: "text-white",
  todayBg: "bg-yellow-300",
  todayText: "text-gray-900",
  normalText: "text-gray-700",
  normalHoverBg: "hover:bg-gray-100",
  disabledBg: "bg-gray-100",
  disabledText: "text-gray-400",
  borderRadius: "rounded-xl",
};

// ============ JULY VARIANTS ============
export const julyTheme = monthThemes[6];
export const julyWaterTheme: CalendarTheme = {
  containerBg: "bg-gradient-to-br from-cyan-50 via-blue-50 to-sky-50",
  containerBorder: "border border-cyan-400",
  selectedBg: "bg-blue-600",
  selectedText: "text-white",
  todayBg: "bg-yellow-300",
  todayText: "text-gray-900",
  normalText: "text-cyan-800",
  normalHoverBg: "hover:bg-gray-100",
  disabledBg: "bg-gray-100",
  disabledText: "text-gray-400",
  borderRadius: "rounded-xl",
};
export const julyFogTheme: CalendarTheme = {
  containerBg: "bg-gradient-to-br from-gray-200 via-slate-200 to-cyan-100",
  containerBorder: "border border-gray-400",
  selectedBg: "bg-blue-600",
  selectedText: "text-white",
  todayBg: "bg-yellow-300",
  todayText: "text-gray-900",
  normalText: "text-gray-700",
  normalHoverBg: "hover:bg-gray-100",
  disabledBg: "bg-gray-100",
  disabledText: "text-gray-400",
  borderRadius: "rounded-xl",
};

// ============ AUGUST VARIANTS ============
export const augustTheme = monthThemes[7];
export const augustWaterTheme: CalendarTheme = {
  containerBg: "bg-gradient-to-br from-violet-50 via-indigo-50 to-blue-50",
  containerBorder: "border border-violet-300",
  selectedBg: "bg-blue-600",
  selectedText: "text-white",
  todayBg: "bg-yellow-300",
  todayText: "text-gray-900",
  normalText: "text-violet-800",
  normalHoverBg: "hover:bg-gray-100",
  disabledBg: "bg-gray-100",
  disabledText: "text-gray-400",
  borderRadius: "rounded-xl",
};
export const augustFogTheme: CalendarTheme = {
  containerBg: "bg-gradient-to-br from-gray-100 via-slate-100 to-purple-50",
  containerBorder: "border border-gray-300",
  selectedBg: "bg-blue-600",
  selectedText: "text-white",
  todayBg: "bg-yellow-300",
  todayText: "text-gray-900",
  normalText: "text-gray-700",
  normalHoverBg: "hover:bg-gray-100",
  disabledBg: "bg-gray-100",
  disabledText: "text-gray-400",
  borderRadius: "rounded-xl",
};

// ============ SEPTEMBER VARIANTS ============
export const septemberTheme = monthThemes[8];
export const septemberWaterTheme: CalendarTheme = {
  containerBg: "bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50",
  containerBorder: "border border-orange-300",
  selectedBg: "bg-blue-600",
  selectedText: "text-white",
  todayBg: "bg-yellow-300",
  todayText: "text-gray-900",
  normalText: "text-orange-800",
  normalHoverBg: "hover:bg-gray-100",
  disabledBg: "bg-gray-100",
  disabledText: "text-gray-400",
  borderRadius: "rounded-xl",
};
export const septemberFogTheme: CalendarTheme = {
  containerBg: "bg-gradient-to-br from-gray-100 via-slate-100 to-orange-50",
  containerBorder: "border border-gray-300",
  selectedBg: "bg-blue-600",
  selectedText: "text-white",
  todayBg: "bg-yellow-300",
  todayText: "text-gray-900",
  normalText: "text-gray-700",
  normalHoverBg: "hover:bg-gray-100",
  disabledBg: "bg-gray-100",
  disabledText: "text-gray-400",
  borderRadius: "rounded-xl",
};

// ============ OCTOBER VARIANTS ============
export const octoberTheme = monthThemes[9];
export const octoberWaterTheme: CalendarTheme = {
  containerBg: "bg-gradient-to-br from-slate-100 via-blue-100 to-teal-100",
  containerBorder: "border border-slate-400",
  selectedBg: "bg-blue-600",
  selectedText: "text-white",
  todayBg: "bg-yellow-300",
  todayText: "text-gray-900",
  normalText: "text-slate-800",
  normalHoverBg: "hover:bg-gray-100",
  disabledBg: "bg-gray-100",
  disabledText: "text-gray-400",
  borderRadius: "rounded-xl",
};
export const octoberFogTheme: CalendarTheme = {
  containerBg: "bg-gradient-to-br from-gray-200 via-slate-200 to-amber-100",
  containerBorder: "border border-gray-400",
  selectedBg: "bg-blue-600",
  selectedText: "text-white",
  todayBg: "bg-yellow-300",
  todayText: "text-gray-900",
  normalText: "text-gray-700",
  normalHoverBg: "hover:bg-gray-100",
  disabledBg: "bg-gray-100",
  disabledText: "text-gray-400",
  borderRadius: "rounded-xl",
};

// ============ NOVEMBER VARIANTS ============
export const novemberTheme = monthThemes[10];
export const novemberWaterTheme: CalendarTheme = {
  containerBg: "bg-gradient-to-br from-amber-50 via-yellow-50 to-blue-50",
  containerBorder: "border border-amber-300",
  selectedBg: "bg-blue-600",
  selectedText: "text-white",
  todayBg: "bg-yellow-300",
  todayText: "text-gray-900",
  normalText: "text-amber-800",
  normalHoverBg: "hover:bg-gray-100",
  disabledBg: "bg-gray-100",
  disabledText: "text-gray-400",
  borderRadius: "rounded-xl",
};
export const novemberFogTheme: CalendarTheme = {
  containerBg: "bg-gradient-to-br from-gray-100 via-slate-100 to-amber-50",
  containerBorder: "border border-gray-300",
  selectedBg: "bg-blue-600",
  selectedText: "text-white",
  todayBg: "bg-yellow-300",
  todayText: "text-gray-900",
  normalText: "text-gray-700",
  normalHoverBg: "hover:bg-gray-100",
  disabledBg: "bg-gray-100",
  disabledText: "text-gray-400",
  borderRadius: "rounded-xl",
};

// ============ DECEMBER VARIANTS ============
export const decemberTheme = monthThemes[11];
export const decemberWaterTheme: CalendarTheme = {
  containerBg: "bg-gradient-to-br from-cyan-50 via-sky-50 to-indigo-50",
  containerBorder: "border border-cyan-300",
  selectedBg: "bg-blue-600",
  selectedText: "text-white",
  todayBg: "bg-yellow-300",
  todayText: "text-gray-900",
  normalText: "text-cyan-800",
  normalHoverBg: "hover:bg-gray-100",
  disabledBg: "bg-gray-100",
  disabledText: "text-gray-400",
  borderRadius: "rounded-xl",
};
export const decemberFogTheme: CalendarTheme = {
  containerBg: "bg-gradient-to-br from-gray-100 via-slate-100 to-blue-50",
  containerBorder: "border border-gray-300",
  selectedBg: "bg-blue-600",
  selectedText: "text-white",
  todayBg: "bg-yellow-300",
  todayText: "text-gray-900",
  normalText: "text-gray-700",
  normalHoverBg: "hover:bg-gray-100",
  disabledBg: "bg-gray-100",
  disabledText: "text-gray-400",
  borderRadius: "rounded-xl",
};

/**
 * Month names for display
 */
export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

/**
 * Month descriptions (festivals/seasons)
 */
export const MONTH_DESCRIPTIONS = [
  "Makar Sankranti - Harvest Festival",
  "Vasant Panchami - Spring Festival",
  "Holi - Festival of Colors",
  "Gudi Padwa - Indian New Year",
  "Summer Heat",
  "Monsoon Season",
  "Rath Yatra - Sacred Festival",
  "Janmashtami & Independence Day",
  "Ganesh Chaturthi",
  "Navratri & Dussehra",
  "Diwali - Festival of Lights",
  "Winter Festival",
] as const;

import { type CalendarTheme } from "./index"

/**
 * Atmospheric Seasonal Themes
 * Winter (Nov–Jan) → cold, pale, airy
 * Spring (Feb–Apr) → fresh, pastel, blooming
 * Summer (May–Jun) → bright, saturated, hot
 * Rain (Jul–Aug) → moody, cloudy, water-heavy
 * Autumn (Sep–Oct) → earthy, dry, golden
 */

export const monthThemes: Record<number, CalendarTheme> = {
  // January — Deep Winter (frost + mist)
  0: {
    containerBg: "bg-gradient-to-br from-slate-100 via-blue-100 to-slate-200",
    containerBorder: "border border-slate-300",
    selectedBg: "bg-blue-500",
    selectedText: "text-white",
    todayBg: "bg-blue-200",
    todayText: "text-slate-900",
    normalText: "text-slate-700",
    normalHoverBg: "hover:bg-blue-50",
    disabledBg: "bg-slate-50",
    disabledText: "text-slate-300",
    borderRadius: "rounded-xl",
  },

  // February — Winter ending, hint of spring
  1: {
    containerBg: "bg-gradient-to-br from-blue-50 via-emerald-50 to-lime-100",
    containerBorder: "border border-emerald-200",
    selectedBg: "bg-emerald-500",
    selectedText: "text-white",
    todayBg: "bg-lime-200",
    todayText: "text-emerald-900",
    normalText: "text-emerald-800",
    normalHoverBg: "hover:bg-emerald-50",
    disabledBg: "bg-emerald-50",
    disabledText: "text-emerald-200",
    borderRadius: "rounded-xl",
  },

  // March — Bloom (soft florals)
  2: {
    containerBg: "bg-gradient-to-br from-rose-50 via-pink-100 to-green-100",
    containerBorder: "border border-pink-200",
    selectedBg: "bg-pink-500",
    selectedText: "text-white",
    todayBg: "bg-rose-200",
    todayText: "text-rose-900",
    normalText: "text-rose-800",
    normalHoverBg: "hover:bg-pink-50",
    disabledBg: "bg-rose-50",
    disabledText: "text-rose-200",
    borderRadius: "rounded-xl",
  },

  // April — Full Spring (sun + greenery)
  3: {
    containerBg: "bg-gradient-to-br from-green-50 via-lime-100 to-yellow-100",
    containerBorder: "border border-lime-300",
    selectedBg: "bg-lime-600",
    selectedText: "text-white",
    todayBg: "bg-yellow-200",
    todayText: "text-lime-900",
    normalText: "text-lime-800",
    normalHoverBg: "hover:bg-lime-50",
    disabledBg: "bg-lime-50",
    disabledText: "text-lime-200",
    borderRadius: "rounded-xl",
  },

  // May — Rising Heat (dry sunlight)
  4: {
    containerBg: "bg-gradient-to-br from-yellow-100 via-orange-200 to-amber-300",
    containerBorder: "border border-amber-400",
    selectedBg: "bg-orange-500",
    selectedText: "text-white",
    todayBg: "bg-yellow-300",
    todayText: "text-orange-900",
    normalText: "text-orange-900",
    normalHoverBg: "hover:bg-orange-100",
    disabledBg: "bg-orange-50",
    disabledText: "text-orange-200",
    borderRadius: "rounded-xl",
  },

  // June — Peak Summer (intense heat)
  5: {
    containerBg: "bg-gradient-to-br from-orange-300 via-red-300 to-yellow-300",
    containerBorder: "border border-red-500",
    selectedBg: "bg-red-600",
    selectedText: "text-white",
    todayBg: "bg-orange-400",
    todayText: "text-white",
    normalText: "text-red-900",
    normalHoverBg: "hover:bg-red-100",
    disabledBg: "bg-red-50",
    disabledText: "text-red-200",
    borderRadius: "rounded-xl",
  },

  // July — Monsoon Begins (heavy sky)
  6: {
    containerBg: "bg-gradient-to-br from-slate-300 via-blue-300 to-indigo-400",
    containerBorder: "border border-indigo-500",
    selectedBg: "bg-indigo-700",
    selectedText: "text-white",
    todayBg: "bg-blue-400",
    todayText: "text-white",
    normalText: "text-slate-900",
    normalHoverBg: "hover:bg-blue-100",
    disabledBg: "bg-slate-100",
    disabledText: "text-slate-400",
    borderRadius: "rounded-xl",
  },

  // August — Lush Rain (deep green + clouds)
  7: {
    containerBg: "bg-gradient-to-br from-emerald-300 via-teal-300 to-slate-400",
    containerBorder: "border border-teal-600",
    selectedBg: "bg-teal-700",
    selectedText: "text-white",
    todayBg: "bg-emerald-400",
    todayText: "text-white",
    normalText: "text-slate-900",
    normalHoverBg: "hover:bg-teal-100",
    disabledBg: "bg-teal-50",
    disabledText: "text-teal-300",
    borderRadius: "rounded-xl",
  },

  // September — Soft Autumn (dry gold)
  8: {
    containerBg: "bg-gradient-to-br from-yellow-200 via-amber-300 to-orange-300",
    containerBorder: "border border-amber-500",
    selectedBg: "bg-amber-600",
    selectedText: "text-white",
    todayBg: "bg-yellow-400",
    todayText: "text-amber-900",
    normalText: "text-amber-900",
    normalHoverBg: "hover:bg-amber-100",
    disabledBg: "bg-amber-50",
    disabledText: "text-amber-200",
    borderRadius: "rounded-xl",
  },

  // October — Deep Autumn (burnt earth)
  9: {
    containerBg: "bg-gradient-to-br from-orange-400 via-red-400 to-amber-500",
    containerBorder: "border border-orange-700",
    selectedBg: "bg-red-700",
    selectedText: "text-white",
    todayBg: "bg-orange-500",
    todayText: "text-white",
    normalText: "text-amber-950",
    normalHoverBg: "hover:bg-orange-200",
    disabledBg: "bg-orange-50",
    disabledText: "text-orange-300",
    borderRadius: "rounded-xl",
  },

  // November — Early Winter (cool fading warmth)
  10: {
    containerBg: "bg-gradient-to-br from-slate-200 via-blue-200 to-gray-300",
    containerBorder: "border border-slate-400",
    selectedBg: "bg-slate-700",
    selectedText: "text-white",
    todayBg: "bg-blue-300",
    todayText: "text-slate-900",
    normalText: "text-slate-700",
    normalHoverBg: "hover:bg-slate-100",
    disabledBg: "bg-slate-50",
    disabledText: "text-slate-300",
    borderRadius: "rounded-xl",
  },

  // December — Coldest (icy blue light)
  11: {
    containerBg: "bg-gradient-to-br from-cyan-100 via-blue-200 to-indigo-300",
    containerBorder: "border border-cyan-500",
    selectedBg: "bg-blue-800",
    selectedText: "text-white",
    todayBg: "bg-cyan-300",
    todayText: "text-white",
    normalText: "text-slate-800",
    normalHoverBg: "hover:bg-cyan-100",
    disabledBg: "bg-cyan-50",
    disabledText: "text-cyan-300",
    borderRadius: "rounded-xl",
  },
}
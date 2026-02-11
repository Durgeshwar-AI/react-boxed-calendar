import { useState } from "react";
import { themes } from "./themes";

export interface CalendarProps {
  // Modes
  mode?: "single" | "range";

  // Single date selection
  selectedDate?: Date | null;
  onDateChange?: (date: Date) => void;

  // Range selection
  selectedRange?: { start: Date | null; end: Date | null };
  onRangeChange?: (start: Date | null, end: Date | null) => void;

  // Date limits
  minDate?: Date;
  maxDate?: Date;

  // Behavior toggles
  disablePastDates?: boolean;
  disableFutureDates?: boolean;
  disableWeekends?: boolean;
  disableMonthNav?: boolean;

  // User callback for disabling dates
  isDateDisabled?: (date: Date) => boolean;

  highlightToday?: boolean;
  weekStartsOn?: 0 | 1; // 0 = Sunday, 1 = Monday

  // Localization
  locale?: {
    weekDays?: [string, string, string, string, string, string, string];
    monthNames?: [string, string, string, string, string, string, string, string, string, string, string, string];
  };

  // Theme
  theme?: {
    containerBg?: string;
    containerBorder?: string;

    selectedBg?: string;
    selectedText?: string;

    todayBg?: string;
    todayText?: string;

    normalText?: string;
    normalHoverBg?: string;

    disabledBg?: string;
    disabledText?: string;

    borderRadius?: string;
  };

  // Size
  size?: "sm" | "md" | "lg";
  // theme Name 
  themeName?: "light" | "dark" | "metallic" | "cyberpunk" | "retro" | "nature";

  // Custom sizing (optional) - overrides size preset
  customSize?: {
    box?: number;     // full calendar width/height
    cell?: number;    // each date cell size
    gap?: number;     // spacing between cells
  };
}

const Calendar = ({
  mode = "single",
  selectedDate = null,
  onDateChange,

  selectedRange = { start: null, end: null },
  onRangeChange,

  minDate,
  maxDate,

  disablePastDates = false,
  disableFutureDates = false,
  disableWeekends = false,
  disableMonthNav = false,

  isDateDisabled,

  highlightToday = true,
  weekStartsOn = 0,

  locale = {
    weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    monthNames: [
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
    ],
  },

  theme = {},
  themeName = "light",
  size = "md",

  // Destructure customSize
  customSize,
}: CalendarProps) => {
  const resolvedTheme = {
    ...themes[themeName],
    ...theme, // custom overrides
  };
  const [currentMonth, setCurrentMonth] = useState<Date>(
    selectedDate ?? new Date()
  );
  const [activePanel, setActivePanel] = useState<"month" | "year" | null>(null);
  const [yearPageStart, setYearPageStart] = useState<number>(
    (selectedDate ?? new Date()).getFullYear() - 6
  );

  // Replaced cellSize logic with preset + custom support
  const presetCellSize =
    size === "sm"
      ? "w-8 h-8 text-xs"
      : size === "lg"
        ? "w-14 h-14 text-lg"
        : "w-10 h-10 text-sm"; // md default

  // Custom sizing styles with explicit px units
  const cellStyle = customSize?.cell
    ? { width: `${customSize.cell}px`, height: `${customSize.cell}px` }
    : undefined;

  const gridGap = customSize?.gap ?? 8;

  // Helpers
  const sameDay = (d1: Date | null, d2: Date | null) => {
    if (!d1 || !d2) return false;
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  };

  const isToday = (date: Date) => sameDay(date, new Date());

  const dateIsBefore = (a: Date, b: Date) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    dateA.setHours(0, 0, 0, 0);
    dateB.setHours(0, 0, 0, 0);
    return dateA.getTime() < dateB.getTime();
  };

  const dateIsAfter = (a: Date, b: Date) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    dateA.setHours(0, 0, 0, 0);
    dateB.setHours(0, 0, 0, 0);
    return dateA.getTime() > dateB.getTime();
  };

  const shouldDisable = (date: Date) => {
    if (disablePastDates) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const checkDate = new Date(date);
      checkDate.setHours(0, 0, 0, 0);
      if (checkDate < today) return true;
    }

    if (minDate && dateIsBefore(date, minDate)) return true;

    if (disableFutureDates) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const checkDate = new Date(date);
      checkDate.setHours(0, 0, 0, 0);
      if (checkDate > today) return true;
    }

    if (maxDate && dateIsAfter(date, maxDate)) return true;

    if (disableWeekends && (date.getDay() === 0 || date.getDay() === 6))
      return true;

    if (isDateDisabled && isDateDisabled(date)) return true;

    return false;
  };

  const handleSelect = (date: Date) => {
    if (shouldDisable(date)) return;

    if (mode === "single" && onDateChange) {
      onDateChange(date);
    }

    if (mode === "range" && onRangeChange) {
      const { start, end } = selectedRange;

      if (!start || (start && end)) {
        onRangeChange(date, null);
      } else if (start && !end) {
        if (dateIsBefore(date, start)) {
          onRangeChange(date, start);
        } else {
          onRangeChange(start, date);
        }
      }
    }
  };

  const changeMonth = (offset: number) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + offset);
    setCurrentMonth(newMonth);
    setActivePanel(null);
  };

  const toggleMonthPanel = () => {
    if (disableMonthNav) return;
    setActivePanel((prev) => (prev === "month" ? null : "month"));
  };

  const toggleYearPanel = () => {
    if (disableMonthNav) return;
    setYearPageStart(currentMonth.getFullYear() - 6);
    setActivePanel((prev) => (prev === "year" ? null : "year"));
  };

  const setMonth = (monthIndex: number) => {
    const next = new Date(currentMonth);
    next.setMonth(monthIndex);
    setCurrentMonth(next);
    setActivePanel(null);
  };

  const setYear = (year: number) => {
    const next = new Date(currentMonth);
    next.setFullYear(year);
    setCurrentMonth(next);
    setActivePanel(null);
  };

  // Generate days
  const getDays = () => {
    const y = currentMonth.getFullYear();
    const m = currentMonth.getMonth();

    const first = new Date(y, m, 1);
    const last = new Date(y, m + 1, 0);

    const startOffset = (first.getDay() - weekStartsOn + 7) % 7;
    const days: (Date | null)[] = [];

    for (let i = 0; i < startOffset; i++) days.push(null);
    for (let d = 1; d <= last.getDate(); d++) days.push(new Date(y, m, d));

    return days;
  };

  const days = getDays();

  return (
    <div className={`
    p-6 shadow-lg
    ${resolvedTheme.containerBg}
    ${resolvedTheme.containerBorder}
    rounded-2xl
  `}
      style={
        customSize?.box
          ? { width: `${customSize.box}px`, height: `${customSize.box}px` }
          : undefined
      }>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        {!disableMonthNav && (
          <button
            onClick={() => changeMonth(-1)}
            className={`p-2 ${resolvedTheme.normalHoverBg} rounded-full transition-colors`}
            aria-label="Previous month"
          >
            <svg className={`w-6 h-6 ${resolvedTheme.normalText}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleMonthPanel}
            className={`font-bold text-xl ${resolvedTheme.normalText} px-2 py-1 rounded-lg transition-colors ${disableMonthNav ? "cursor-default" : `${resolvedTheme.normalHoverBg}`
              }`}
            aria-label="Select month"
            aria-expanded={activePanel === "month"}
          >
            {locale.monthNames![currentMonth.getMonth()]}
          </button>
          <button
            type="button"
            onClick={toggleYearPanel}
            className={`font-bold text-xl ${resolvedTheme.normalText} px-2 py-1 rounded-lg transition-colors ${disableMonthNav ? "cursor-default" : `${resolvedTheme.normalHoverBg}`
              }`}
            aria-label="Select year"
            aria-expanded={activePanel === "year"}
          >
            {currentMonth.getFullYear()}
          </button>
        </div>

        {!disableMonthNav && (
          <button
            onClick={() => changeMonth(1)}
            className={`p-2 ${resolvedTheme.normalHoverBg} rounded-full transition-colors`}
            aria-label="Next month"
          >
            <svg className={`w-6 h-6 ${resolvedTheme.normalText}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {activePanel === "month" && !disableMonthNav && (
        <div className={`mb-4 p-4 ${resolvedTheme.containerBg} border ${resolvedTheme.containerBorder} rounded-xl shadow-sm`}>
          <div className="grid grid-cols-3" style={{ gap: gridGap }}>
            {locale.monthNames!.map((name, index) => {
              const isCurrent = index === currentMonth.getMonth();
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => setMonth(index)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isCurrent
                      ? `${resolvedTheme.selectedBg} text-white`
                      : `${resolvedTheme.normalText} ${resolvedTheme.normalHoverBg}`
                    }`}
                >
                  {name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {activePanel === "year" && !disableMonthNav && (
        <div className={`mb-4 p-4 ${resolvedTheme.containerBg} border ${resolvedTheme.containerBorder} rounded-xl shadow-sm`}>
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={() => setYearPageStart((prev) => prev - 12)}
              className={`p-2 ${resolvedTheme.normalHoverBg} rounded-full transition-colors`}
              aria-label="Previous years"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className={`text-sm font-semibold ${resolvedTheme.normalText}`}>
              {yearPageStart} - {yearPageStart + 11}
            </span>
            <button
              type="button"
              onClick={() => setYearPageStart((prev) => prev + 12)}
              className={`p-2 ${resolvedTheme.normalHoverBg} rounded-full transition-colors`}
              aria-label="Next years"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div
            className="grid grid-cols-4"
            style={{ gap: gridGap }}
          >
            {Array.from({ length: 12 }, (_, i) => yearPageStart + i).map(
              (year) => {
                const isCurrent = year === currentMonth.getFullYear();
                return (
                  <button
                    key={year}
                    type="button"
                    onClick={() => setYear(year)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isCurrent
                        ? `${resolvedTheme.selectedBg} text-white`
                        : `${resolvedTheme.normalText} ${resolvedTheme.normalHoverBg}`
                      }`}
                  >
                    {year}
                  </button>
                );
              }
            )}
          </div>
        </div>
      )}

      {/* Week days - Updated with consistent gap */}
      <div
        className="grid grid-cols-7 mb-2"
        style={{ gap: gridGap }}
      >
        {locale.weekDays!.map((d) => (
          <div
            key={d}
            className="text-center font-semibold text-gray-600 text-sm py-2"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Grid - Updated with custom gap and cell sizing */}
      <div
        className="grid grid-cols-7 place-items-center"
        style={{ gap: gridGap }}
      >
        {days.map((day, i) => {
          if (!day) return (
            <div
              key={i}
              style={cellStyle}
              className={customSize ? "" : presetCellSize}
            />
          );

          const disabled = shouldDisable(day);
          const isSelected =
            mode === "single"
              ? sameDay(day, selectedDate)
              : (selectedRange.start && sameDay(day, selectedRange.start)) ||
              (selectedRange.end && sameDay(day, selectedRange.end));

          const isInRange =
            mode === "range" &&
            selectedRange.start &&
            selectedRange.end &&
            dateIsAfter(day, selectedRange.start) &&
            dateIsBefore(day, selectedRange.end);

          return (
            <button
              key={day.toISOString()}
              disabled={disabled}
              onClick={() => handleSelect(day)}
              style={cellStyle}
              className={`
                inline-flex items-center justify-center font-medium transition-all
                ${customSize ? "" : presetCellSize}
                ${resolvedTheme.borderRadius}
                ${disabled
                  ? `${resolvedTheme.disabledBg} ${resolvedTheme.disabledText} cursor-not-allowed`
                  : isSelected
                    ? `${resolvedTheme.selectedBg} ${resolvedTheme.selectedText} scale-105 shadow-lg`
                    : isToday(day) && highlightToday
                      ? `${resolvedTheme.todayBg} ${resolvedTheme.todayText}`
                      : isInRange
                        ? "bg-blue-50 text-blue-600"
                        : `${resolvedTheme.normalText} ${resolvedTheme.normalHoverBg} hover:scale-105`
                }
              `}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      {mode === "single" && (
        <div className="mt-6 flex items-center justify-center space-x-4 text-sm">
          <div className="flex items-center">
            <div className={`w-4 h-4 rounded mr-2 ${resolvedTheme.selectedBg}`}></div>
            <span className={resolvedTheme.normalText}>Selected</span>
          </div>
          {highlightToday && (
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded mr-2 ${resolvedTheme.todayBg}`}></div>
              <span className={resolvedTheme.normalText}>Today</span>
            </div>
          )}
        </div>
      )}

      {mode === "range" && (
        <div className="mt-6 flex items-center justify-center space-x-4 text-sm">
          <div className="flex items-center">
            <div className={`w-4 h-4 rounded mr-2 ${resolvedTheme.selectedBg}`}></div>
            <span className={resolvedTheme.normalText}>Selected</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-50 border border-blue-200 rounded mr-2"></div>
            <span className={resolvedTheme.normalText}>In Range</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
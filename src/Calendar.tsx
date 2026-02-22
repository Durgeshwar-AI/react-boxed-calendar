import { useState, useMemo, useEffect, useCallback } from "react";
import { themes } from "./themes";
import { getMonthTheme } from "./themes/month";
import {
  generateMonthGrid,
  isDateAfter,
  isDateBefore,
  isSameDay,
  isToday,
} from "./utils";

export interface CalendarTheme {
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
}

export interface CalendarLocale {
  weekDays?: [string, string, string, string, string, string, string];
  monthNames?: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
  ];
}

export interface CalendarProps {
  mode?: "single" | "range" | "multi";
  selectedDate?: Date | null;
  onDateChange?: (date: Date) => void;
  selectedRange?: { start: Date | null; end: Date | null };
  onRangeChange?: (start: Date | null, end: Date | null) => void;
  selectedDates?: Date[];
  onDatesChange?: (dates: Date[]) => void;
  minDate?: Date;
  maxDate?: Date;
  disablePastDates?: boolean;
  disableFutureDates?: boolean;
  disableWeekends?: boolean;
  disableMonthNav?: boolean;
  weekdayOFF?: number[];
  weekdayOFFColor?: {
    bg?: string;
    text?: string;
    hoverBg?: string;
  };
  isDateDisabled?: (date: Date) => boolean;
  highlightToday?: boolean;
  weekStartsOn?: 0 | 1;
  holidays?: Date[];
  holidayColor?: {
    bg?: string;
    text?: string;
    hoverBg?: string;
  };
  locale?: CalendarLocale;
  theme?: CalendarTheme;
  themeName?: keyof typeof themes;
  size?: "sm" | "md" | "lg";
  customSize?: {
    box?: number;
    cell?: number;
    gap?: number;
  };
}

const DEFAULT_THEME: Required<CalendarTheme> = {
  containerBg: "bg-white",
  containerBorder: "border-gray-100",
  selectedBg: "bg-blue-600",
  selectedText: "text-white",
  todayBg: "bg-blue-100",
  todayText: "text-blue-700",
  normalText: "text-gray-700",
  normalHoverBg: "hover:bg-gray-100",
  disabledBg: "bg-gray-50",
  disabledText: "text-gray-300",
  borderRadius: "rounded-2xl",
};

const DEFAULT_LOCALE: Required<CalendarLocale> = {
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
};

const Calendar = ({
  mode = "single",
  selectedDate = null,
  onDateChange,
  selectedRange = { start: null, end: null },
  onRangeChange,
  selectedDates = [],
  onDatesChange,
  minDate,
  maxDate,
  disablePastDates = false,
  disableFutureDates = false,
  disableWeekends = false,
  disableMonthNav = false,
  weekdayOFF = [],
  weekdayOFFColor = {
    bg: "bg-gray-100",
    text: "text-gray-500",
    hoverBg: "hover:bg-gray-200",
  },
  isDateDisabled,
  highlightToday = true,
  weekStartsOn = 0,
  holidays = [],
  holidayColor = {
    bg: "bg-red-100",
    text: "text-red-700",
    hoverBg: "hover:bg-red-200",
  },
  locale: userLocale,
  theme: userTheme,
  themeName = "light",
  size = "md",
  customSize,
}: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(
    selectedDate ?? new Date(),
  );
  const [activePanel, setActivePanel] = useState<"month" | "year" | null>(null);
  const [yearPageStart, setYearPageStart] = useState<number>(
    (selectedDate ?? new Date()).getFullYear() - 6,
  );

  // Theme resolution: defaults → month theme → preset → user overrides
  const mergedTheme = useMemo(() => {
    return {
      ...DEFAULT_THEME,
      ...getMonthTheme(currentMonth.getMonth()),
      ...themes[themeName],
      ...userTheme,
    };
  }, [currentMonth, themeName, userTheme]);

  // Locale resolution: defaults → user overrides
  const mergedLocale = useMemo(() => {
    return {
      ...DEFAULT_LOCALE,
      ...userLocale,
    };
  }, [userLocale]);

  // Sync view when selectedDate changes externally
  useEffect(() => {
    if (selectedDate && !isSameDay(selectedDate, currentMonth)) {
      if (
        selectedDate.getMonth() !== currentMonth.getMonth() ||
        selectedDate.getFullYear() !== currentMonth.getFullYear()
      ) {
        const month = () => {
          setCurrentMonth(new Date(selectedDate));
        };
        month();
      }
    }
  }, [selectedDate, currentMonth]);

  // Size presets with custom override support
  const presetCellSize = useMemo(() => {
    switch (size) {
      case "sm":
        return "w-8 h-8 text-xs";
      case "lg":
        return "w-14 h-14 text-lg";
      default:
        return "w-10 h-10 text-sm";
    }
  }, [size]);

  const cellStyle = customSize?.cell
    ? { width: `${customSize.cell}px`, height: `${customSize.cell}px` }
    : undefined;

  const gridGap = customSize?.gap ?? 8;

  // Normalize disabled weekdays for fast lookup
  const weekdayOFFSet = useMemo(
    () => new Set<number>(weekdayOFF),
    [weekdayOFF],
  );

  // Merge color props with defaults
  const mergedHolidayColor = useMemo(
    () => ({
      bg: "bg-white",
      text: "text-black",
      hoverBg: "hover:bg-gray-100",
      ...holidayColor,
    }),
    [holidayColor],
  );

  const mergedWeekdayOffColor = useMemo(
    () => ({
      bg: "bg-gray-100",
      text: "text-gray-500",
      hoverBg: "hover:bg-gray-200",
      ...weekdayOFFColor,
    }),
    [weekdayOFFColor],
  );

  // Generate calendar grid
  const days = useMemo(() => {
    return generateMonthGrid(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      weekStartsOn,
    );
  }, [currentMonth, weekStartsOn]);

  // Check if date is a holiday
  const isHoliday = useCallback(
    (date: Date) => {
      return holidays.some((holiday) => isSameDay(holiday, date));
    },
    [holidays],
  );

  // Disable logic
  const shouldDisable = useCallback(
    (date: Date) => {
      if (disablePastDates && isDateBefore(date, new Date())) return true;
      if (disableFutureDates && isDateAfter(date, new Date())) return true;
      if (minDate && isDateBefore(date, minDate)) return true;
      if (maxDate && isDateAfter(date, maxDate)) return true;
      if (disableWeekends && (date.getDay() === 0 || date.getDay() === 6))
        return true;
      if (weekdayOFFSet.has(date.getDay())) return true;
      if (isDateDisabled && isDateDisabled(date)) return true;
      return false;
    },
    [
      disablePastDates,
      disableFutureDates,
      minDate,
      maxDate,
      disableWeekends,
      weekdayOFFSet,
      isDateDisabled,
    ],
  );

  // Create Set from selectedDates for O(1) lookup
  const selectedDatesSet = useMemo(
    () => new Set(selectedDates.map((d) => d.toISOString())),
    [selectedDates],
  );

  // Selection handler with automatic month navigation
  const handleSelect = useCallback(
    (date: Date) => {
      if (shouldDisable(date)) return;

      // Auto-navigate to the clicked date's month if it's different from current month
      const clickedMonth = date.getMonth();
      const clickedYear = date.getFullYear();
      const currentDisplayMonth = currentMonth.getMonth();
      const currentDisplayYear = currentMonth.getFullYear();

      // If the clicked date is from a different month/year, navigate to it
      if (clickedMonth !== currentDisplayMonth || clickedYear !== currentDisplayYear) {
        const newMonth = new Date(currentMonth);
        newMonth.setFullYear(clickedYear);
        newMonth.setMonth(clickedMonth);
        setCurrentMonth(newMonth);
        setActivePanel(null);
      }

      // Then proceed with date selection
      if (mode === "single" && onDateChange) {
        onDateChange(date);
      } else if (mode === "range" && onRangeChange) {
        const { start, end } = selectedRange;
        if (!start || (start && end)) {
          onRangeChange(date, null);
        } else if (start && !end) {
          if (isDateBefore(date, start)) {
            onRangeChange(date, start);
          } else {
            onRangeChange(start, date);
          }
        }
      } else if (mode === "multi" && onDatesChange) {
        const dateKey = date.toISOString();
        const isAlreadySelected = selectedDatesSet.has(dateKey);
        
        if (isAlreadySelected) {
          // Remove date from selection
          const newDates = selectedDates.filter(
            (d) => d.toISOString() !== dateKey
          );
          onDatesChange(newDates);
        } else {
          // Add date to selection
          onDatesChange([...selectedDates, date]);
        }
      }
    },
    [mode, onDateChange, onRangeChange, selectedRange, shouldDisable, selectedDates, selectedDatesSet, onDatesChange, currentMonth],
  );

  // Navigation handlers
  const changeMonth = useCallback(
    (offset: number) => {
      const newMonth = new Date(currentMonth);
      newMonth.setMonth(newMonth.getMonth() + offset);
      setCurrentMonth(newMonth);
      setActivePanel(null);
    },
    [currentMonth],
  );

  const setMonth = useCallback(
    (monthIndex: number) => {
      const next = new Date(currentMonth);
      next.setMonth(monthIndex);
      setCurrentMonth(next);
      setActivePanel(null);
    },
    [currentMonth],
  );

  const setYear = useCallback(
    (year: number) => {
      const next = new Date(currentMonth);
      next.setFullYear(year);
      setCurrentMonth(next);
      setActivePanel(null);
    },
    [currentMonth],
  );

  const toggleMonthPanel = useCallback(() => {
    if (disableMonthNav) return;
    setActivePanel((prev) => (prev === "month" ? null : "month"));
  }, [disableMonthNav]);

  const toggleYearPanel = useCallback(() => {
    if (disableMonthNav) return;
    setYearPageStart(currentMonth.getFullYear() - 6);
    setActivePanel((prev) => (prev === "year" ? null : "year"));
  }, [currentMonth, disableMonthNav]);

  return (
    <div
      className={`
        p-6 shadow-lg select-none
        ${mergedTheme.containerBg}
        ${mergedTheme.containerBorder}
        ${mergedTheme.borderRadius}
      `}
      style={
        customSize?.box
          ? { width: `${customSize.box}px`, height: `${customSize.box}px` }
          : undefined
      }
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        {!disableMonthNav && (
          <button
            onClick={() => changeMonth(-1)}
            className={`
              p-2 rounded-full transition-colors
              focus:outline-none focus:ring-2 focus:ring-blue-500
              ${mergedTheme.normalHoverBg}
            `}
            aria-label="Previous month"
          >
            <svg
              className={`w-6 h-6 ${mergedTheme.normalText}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        <div className="flex items-center gap-2 mx-auto">
          <button
            type="button"
            onClick={toggleMonthPanel}
            className={`
              font-bold text-xl px-2 py-1 rounded-lg transition-colors
              focus:outline-none focus:ring-2 focus:ring-blue-500
              ${disableMonthNav ? "cursor-default" : mergedTheme.normalHoverBg}
              ${mergedTheme.normalText}
            `}
            aria-label="Select month"
            aria-expanded={activePanel === "month"}
          >
            {mergedLocale.monthNames[currentMonth.getMonth()]}
          </button>
          <button
            type="button"
            onClick={toggleYearPanel}
            className={`
              font-bold text-xl px-2 py-1 rounded-lg transition-colors
              focus:outline-none focus:ring-2 focus:ring-blue-500
              ${disableMonthNav ? "cursor-default" : mergedTheme.normalHoverBg}
              ${mergedTheme.normalText}
            `}
            aria-label="Select year"
            aria-expanded={activePanel === "year"}
          >
            {currentMonth.getFullYear()}
          </button>
        </div>

        {!disableMonthNav && (
          <button
            onClick={() => changeMonth(1)}
            className={`
              p-2 rounded-full transition-colors
              focus:outline-none focus:ring-2 focus:ring-blue-500
              ${mergedTheme.normalHoverBg}
            `}
            aria-label="Next month"
          >
            <svg
              className={`w-6 h-6 ${mergedTheme.normalText}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Month Selector */}
      {activePanel === "month" && !disableMonthNav && (
        <div
          className={`
          mb-4 p-4 border rounded-xl shadow-sm
          ${mergedTheme.containerBg}
          ${mergedTheme.containerBorder}
        `}
        >
          <div className="grid grid-cols-3" style={{ gap: gridGap }}>
            {mergedLocale.monthNames.map((name, index) => {
              const isCurrent = index === currentMonth.getMonth();
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => setMonth(index)}
                  className={`
                    px-3 py-2 text-sm font-medium rounded-lg transition-colors
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${
                      isCurrent
                        ? `${mergedTheme.selectedBg} ${mergedTheme.selectedText}`
                        : `${mergedTheme.normalText} ${mergedTheme.normalHoverBg}`
                    }
                  `}
                >
                  {name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Year Selector */}
      {activePanel === "year" && !disableMonthNav && (
        <div
          className={`
          mb-4 p-4 border rounded-xl shadow-sm
          ${mergedTheme.containerBg}
          ${mergedTheme.containerBorder}
        `}
        >
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={() => setYearPageStart((prev) => prev - 12)}
              className={`
                p-2 rounded-full transition-colors
                focus:outline-none focus:ring-2 focus:ring-blue-500
                ${mergedTheme.normalHoverBg}
              `}
              aria-label="Previous years"
            >
              <svg
                className={`w-5 h-5 ${mergedTheme.normalText}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <span className={`text-sm font-semibold ${mergedTheme.normalText}`}>
              {yearPageStart} - {yearPageStart + 11}
            </span>
            <button
              type="button"
              onClick={() => setYearPageStart((prev) => prev + 12)}
              className={`
                p-2 rounded-full transition-colors
                focus:outline-none focus:ring-2 focus:ring-blue-500
                ${mergedTheme.normalHoverBg}
              `}
              aria-label="Next years"
            >
              <svg
                className={`w-5 h-5 ${mergedTheme.normalText}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-4" style={{ gap: gridGap }}>
            {Array.from({ length: 12 }, (_, i) => yearPageStart + i).map(
              (year) => {
                const isCurrent = year === currentMonth.getFullYear();
                return (
                  <button
                    key={year}
                    type="button"
                    onClick={() => setYear(year)}
                    className={`
                    px-3 py-2 text-sm font-medium rounded-lg transition-colors
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${
                      isCurrent
                        ? `${mergedTheme.selectedBg} ${mergedTheme.selectedText}`
                        : `${mergedTheme.normalText} ${mergedTheme.normalHoverBg}`
                    }
                  `}
                  >
                    {year}
                  </button>
                );
              },
            )}
          </div>
        </div>
      )}

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 mb-2" style={{ gap: gridGap }}>
        {mergedLocale.weekDays.map((d, i) => (
          <div
            key={`weekday-${i}`}
            className="text-center font-semibold text-gray-600 text-sm py-2"
            aria-label={d}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div
        className="grid grid-cols-7 place-items-center"
        style={{ gap: gridGap }}
      >
        {days.map((day, i) => {
          if (!day) {
            return (
              <div
                key={i}
                style={cellStyle}
                className={customSize ? "" : presetCellSize}
              />
            );
          }

          const disabled = shouldDisable(day);
          const isSelected =
            mode === "single"
              ? isSameDay(day, selectedDate)
              : mode === "multi"
              ? selectedDatesSet.has(day.toISOString())
              : (selectedRange.start && isSameDay(day, selectedRange.start)) ||
                (selectedRange.end && isSameDay(day, selectedRange.end));

          const isInRange =
            mode === "range" &&
            selectedRange.start &&
            selectedRange.end &&
            isDateAfter(day, selectedRange.start) &&
            isDateBefore(day, selectedRange.end);

          const isTodayDate = isToday(day);
          const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
          const isHolidayDate = isHoliday(day);
          const isWeekdayOff = weekdayOFFSet.has(day.getDay());

          // Determine cell styles with priority: selected > today > range > holiday > weekdayOff > normal
          let cellStyles = "";

          if (disabled) {
            cellStyles = `${mergedTheme.disabledBg} ${mergedTheme.disabledText} cursor-not-allowed opacity-50`;
          } else if (isSelected) {
            cellStyles = `${mergedTheme.selectedBg} ${mergedTheme.selectedText} scale-105 shadow-lg z-10`;
          } else if (isTodayDate && highlightToday) {
            cellStyles = `${mergedTheme.todayBg} ${mergedTheme.todayText} font-bold ring-1 ring-blue-200`;
          } else if (isInRange) {
            cellStyles = "bg-blue-50 text-blue-600";
          } else if (isHolidayDate) {
            cellStyles = `${mergedHolidayColor.bg} ${mergedHolidayColor.text} ${mergedHolidayColor.hoverBg || ""}`;
          } else if (isWeekdayOff) {
            cellStyles = `${mergedWeekdayOffColor.bg} ${mergedWeekdayOffColor.text} ${mergedWeekdayOffColor.hoverBg || ""}`;
          } else {
            cellStyles = `${mergedTheme.normalText} ${mergedTheme.normalHoverBg} hover:scale-105`;
          }

          return (
            <button
              key={day.toISOString()}
              disabled={disabled}
              onClick={() => handleSelect(day)}
              aria-label={day.toDateString()}
              aria-selected={!!isSelected}
              aria-current={isTodayDate ? "date" : undefined}
              style={cellStyle}
              className={`
                inline-flex items-center justify-center font-medium transition-all
                focus:outline-none focus:ring-2 focus:ring-blue-500
                ${customSize ? "" : presetCellSize}
                ${mergedTheme.borderRadius}
                ${!isCurrentMonth ? "opacity-40" : ""}
                ${cellStyles}
              `}
            >
              {isHolidayDate ? (
                <span className="text-red-600">{day.getDate()}</span>
              ) : (
                day.getDate()
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      {mode === "single" && (
        <div className="mt-6 flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center">
            <div className={`w-4 h-4 rounded mr-2 ${mergedTheme.selectedBg}`} />
            <span className={mergedTheme.normalText}>Selected</span>
          </div>
          {highlightToday && (
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded mr-2 ${mergedTheme.todayBg}`} />
              <span className={mergedTheme.normalText}>Today</span>
            </div>
          )}
          <div className="flex items-center">
            <div className="w-4 h-4 rounded mr-2 bg-red-600" />
            <span className={mergedTheme.normalText}>Holiday</span>
          </div>
        </div>
      )}

      {mode === "range" && (
        <div className="mt-6 flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center">
            <div className={`w-4 h-4 rounded mr-2 ${mergedTheme.selectedBg}`} />
            <span className={mergedTheme.normalText}>Start/End</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-50 border border-blue-200 rounded mr-2" />
            <span className={mergedTheme.normalText}>In Range</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded mr-2 bg-red-600" />
            <span className={mergedTheme.normalText}>Holiday</span>
          </div>
        </div>
      )}

      {mode === "multi" && (
        <div className="mt-6 flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center">
            <div className={`w-4 h-4 rounded mr-2 ${mergedTheme.selectedBg}`} />
            <span className={mergedTheme.normalText}>
              {selectedDates.length} selected
            </span>
          </div>
          {highlightToday && (
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded mr-2 ${mergedTheme.todayBg}`} />
              <span className={mergedTheme.normalText}>Today</span>
            </div>
          )}
          <div className="flex items-center">
            <div className="w-4 h-4 rounded mr-2 bg-red-600" />
            <span className={mergedTheme.normalText}>Holiday</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;

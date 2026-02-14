import { useState, useMemo, useEffect, useCallback } from "react";
import {
  generateMonthGrid,
  isDateAfter,
  isDateBefore,
  isSameDay,
  isToday,
} from "./utils";

export interface CalendarTheme {
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
  weekDays?: string[];
  monthNames?: string[];
}

export interface CalendarProps {
  mode?: "single" | "range";
  selectedDate?: Date | null;
  onDateChange?: (date: Date) => void;
  selectedRange?: { start: Date | null; end: Date | null };
  onRangeChange?: (start: Date | null, end: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  disablePastDates?: boolean;
  disableFutureDates?: boolean;
  disableWeekends?: boolean;
  disableMonthNav?: boolean;
  isDateDisabled?: (date: Date) => boolean;
  highlightToday?: boolean;
  weekStartsOn?: 0 | 1;
  locale?: CalendarLocale;
  theme?: CalendarTheme;
  size?: "sm" | "md" | "lg";
}

const DEFAULT_THEME: Required<CalendarTheme> = {
  selectedBg: "bg-blue-600",
  selectedText: "text-white",
  todayBg: "bg-blue-100",
  todayText: "text-blue-700",
  normalText: "text-gray-700",
  normalHoverBg: "hover:bg-gray-100",
  disabledBg: "bg-gray-50",
  disabledText: "text-gray-300",
  borderRadius: "rounded-xl",
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
  minDate,
  maxDate,
  disablePastDates = false,
  disableFutureDates = false,
  disableWeekends = false,
  disableMonthNav = false,
  isDateDisabled,
  highlightToday = true,
  weekStartsOn = 0,
  locale: userLocale,
  theme: userTheme,
  size = "md",
}: CalendarProps) => {
  // Merge props with defaults
  const theme = useMemo(
    () => ({ ...DEFAULT_THEME, ...userTheme }),
    [userTheme]
  );

  const locale = useMemo(
    () => ({ ...DEFAULT_LOCALE, ...userLocale }),
    [userLocale]
  );

  const [currentMonth, setCurrentMonth] = useState<Date>(
    selectedDate ?? new Date()
  );

  // Sync currentMonth if selectedDate changes drastically?
  // Maybe better to leave it controlled by user navigation unless initial load.
  // Actually, if selectedDate changes from outside (e.g. from null to a date), we probably want to jump to it.
  useEffect(() => {
    if (selectedDate && !isSameDay(selectedDate, currentMonth)) {
       // Only update if the month is different? No, currentMonth is confusingly named, it stores a Date object representing the view.
       // If selectedDate is in a different month, switch to it.
       if (selectedDate.getMonth() !== currentMonth.getMonth() || selectedDate.getFullYear() !== currentMonth.getFullYear()) {
         setCurrentMonth(new Date(selectedDate));
       }
    }
  }, [selectedDate]); // Watch selectedDate

  const [activePanel, setActivePanel] = useState<"month" | "year" | null>(null);
  const [yearPageStart, setYearPageStart] = useState<number>(
    currentMonth.getFullYear() - 6
  );

  const cellSize = useMemo(() => {
    switch (size) {
      case "sm": return "w-8 h-8 text-xs";
      case "lg": return "w-14 h-14 text-lg";
      default: return "w-10 h-10 text-sm";
    }
  }, [size]);

  const days = useMemo(() => {
    return generateMonthGrid(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      weekStartsOn
    );
  }, [currentMonth, weekStartsOn]);

  const shouldDisable = useCallback((date: Date) => {
    if (disablePastDates && isDateBefore(date, new Date())) return true;
    if (disableFutureDates && isDateAfter(date, new Date())) return true;
    if (minDate && isDateBefore(date, minDate)) return true;
    if (maxDate && isDateAfter(date, maxDate)) return true;
    if (disableWeekends && (date.getDay() === 0 || date.getDay() === 6)) return true;
    if (isDateDisabled && isDateDisabled(date)) return true;
    return false;
  }, [disablePastDates, disableFutureDates, minDate, maxDate, disableWeekends, isDateDisabled]);

  const handleSelect = useCallback((date: Date) => {
    if (shouldDisable(date)) return;

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
    }
  }, [mode, onDateChange, onRangeChange, selectedRange, shouldDisable]);

  const changeMonth = (offset: number) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + offset);
    setCurrentMonth(newMonth);
    setActivePanel(null);
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

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100 select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        {!disableMonthNav && (
          <button
            onClick={() => changeMonth(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Previous month"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        <div className="flex items-center gap-2 mx-auto">
          <button
            type="button"
            onClick={() => !disableMonthNav && setActivePanel(activePanel === "month" ? null : "month")}
            className={`font-bold text-xl text-gray-900 px-2 py-1 rounded-lg transition-colors ${
              disableMonthNav ? "cursor-default" : "hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            }`}
            aria-expanded={activePanel === "month"}
          >
            {locale.monthNames![currentMonth.getMonth()]}
          </button>
          <button
            type="button"
            onClick={() => {
                if (disableMonthNav) return;
                setYearPageStart(currentMonth.getFullYear() - 6);
                setActivePanel(activePanel === "year" ? null : "year");
            }}
            className={`font-bold text-xl text-gray-900 px-2 py-1 rounded-lg transition-colors ${
              disableMonthNav ? "cursor-default" : "hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            }`}
            aria-expanded={activePanel === "year"}
          >
            {currentMonth.getFullYear()}
          </button>
        </div>

        {!disableMonthNav && (
          <button
            onClick={() => changeMonth(1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Next month"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {activePanel === "month" && !disableMonthNav && (
        <div className="mb-4 p-4 bg-white border border-gray-100 rounded-xl shadow-sm animate-in fade-in slide-in-from-top-2">
          <div className="grid grid-cols-3 gap-2">
            {locale.monthNames!.map((name, index) => {
              const isCurrent = index === currentMonth.getMonth();
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => setMonth(index)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isCurrent
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
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
        <div className="mb-4 p-4 bg-white border border-gray-100 rounded-xl shadow-sm animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={() => setYearPageStart((prev) => prev - 12)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Previous years"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-sm font-semibold text-gray-700">
              {yearPageStart} - {yearPageStart + 11}
            </span>
            <button
              type="button"
              onClick={() => setYearPageStart((prev) => prev + 12)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Next years"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 12 }, (_, i) => yearPageStart + i).map(
              (year) => {
                const isCurrent = year === currentMonth.getFullYear();
                return (
                  <button
                    key={year}
                    type="button"
                    onClick={() => setYear(year)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isCurrent
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
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

      {/* Week days */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {locale.weekDays!.map((d, i) => (
          <div
            key={`weekday-${i}`}
            className="text-center font-semibold text-gray-600 text-sm py-2"
            aria-label={d}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-2 place-items-center">
        {days.map((day) => {
          const disabled = shouldDisable(day);
          const isSelected =
            mode === "single"
              ? isSameDay(day, selectedDate)
              : (selectedRange.start && isSameDay(day, selectedRange.start)) ||
                (selectedRange.end && isSameDay(day, selectedRange.end));

          const isInRange =
            mode === "range" &&
            selectedRange.start &&
            selectedRange.end &&
            isDateAfter(day, selectedRange.start) &&
            isDateBefore(day, selectedRange.end);

          const isTodayDate = isToday(day);
          const isCurrentMonth =
            day.getMonth() === currentMonth.getMonth() &&
            day.getFullYear() === currentMonth.getFullYear();

          return (
            <button
              key={day.toISOString()}
              disabled={disabled}
              onClick={() => handleSelect(day)}
              aria-label={day.toDateString()}
              aria-selected={!!isSelected}
              aria-current={isTodayDate ? "date" : undefined}
              className={`
                inline-flex items-center justify-center font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500
                ${cellSize}
                ${theme.borderRadius}
                ${
                  !isCurrentMonth ? "opacity-40" : ""
                }
                ${
                  disabled
                    ? `${theme.disabledBg} ${theme.disabledText} cursor-not-allowed opacity-50`
                    : isSelected
                    ? `${theme.selectedBg} ${theme.selectedText} scale-105 shadow-md z-10`
                    : isTodayDate && highlightToday
                    ? `${theme.todayBg} ${theme.todayText} font-bold ring-1 ring-blue-200`
                    : isInRange
                    ? "bg-blue-50 text-blue-600"
                    : `${theme.normalText} ${theme.normalHoverBg} hover:scale-105`
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
        <div className="mt-6 flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center">
            <div className={`w-3 h-3 ${theme.selectedBg} rounded-full mr-2`}></div>
            <span className="text-gray-600">Selected</span>
          </div>
          {highlightToday && (
            <div className="flex items-center">
              <div className={`w-3 h-3 ${theme.todayBg} rounded-full mr-2 border border-blue-200`}></div>
              <span className="text-gray-600">Today</span>
            </div>
          )}
        </div>
      )}

      {mode === "range" && (
        <div className="mt-6 flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center">
            <div className={`w-3 h-3 ${theme.selectedBg} rounded-full mr-2`}></div>
            <span className="text-gray-600">Start/End</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-50 border border-blue-200 rounded-full mr-2"></div>
            <span className="text-gray-600">In Range</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;

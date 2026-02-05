import { useState } from "react";

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

  theme = {
    selectedBg: "bg-blue-600",
    selectedText: "text-white",

    todayBg: "bg-blue-100",
    todayText: "text-blue-700",

    normalText: "text-gray-700",
    normalHoverBg: "hover:bg-gray-100",

    disabledBg: "bg-gray-50",
    disabledText: "text-gray-300",

    borderRadius: "rounded-xl",
  },

  size = "md",
}: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(
    selectedDate ?? new Date()
  );

  const cellSize =
    size === "sm"
      ? "w-8 h-8 text-xs"
      : size === "lg"
      ? "w-14 h-14 text-lg"
      : "w-10 h-10 text-sm"; // md default

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
        // Pad with trailing empty cells to complete the grid (ensure 7-column layout)
    const remainingCells = (7 - (days.length % 7)) % 7;
    for (let i = 0; i < remainingCells; i++) days.push(null);

    return days;
  };

  const days = getDays();

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        {!disableMonthNav && (
          <button
            onClick={() => changeMonth(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Previous month"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        <h2 className="font-bold text-xl text-gray-900">
          {locale.monthNames![currentMonth.getMonth()]}{" "}
          {currentMonth.getFullYear()}
        </h2>

        {!disableMonthNav && (
          <button
            onClick={() => changeMonth(1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Next month"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* Week days */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {locale.weekDays!.map((d) => (
          <div
            key={d}
            className="text-center font-semibold text-gray-600 text-sm py-2"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-2 place-items-center">
        {days.map((day, i) => {
          if (!day) return <div key={i} className={cellSize} />;

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
              className={`
                inline-flex items-center justify-center font-medium transition-all
                ${cellSize}
                ${theme.borderRadius}
                ${
                  disabled
                    ? `${theme.disabledBg} ${theme.disabledText} cursor-not-allowed`
                    : isSelected
                    ? `${theme.selectedBg} ${theme.selectedText} scale-105 shadow-lg`
                    : isToday(day) && highlightToday
                    ? `${theme.todayBg} ${theme.todayText}`
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
        <div className="mt-6 flex items-center justify-center space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-600 rounded mr-2"></div>
            <span className="text-gray-600">Selected</span>
          </div>
          {highlightToday && (
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-100 rounded mr-2"></div>
              <span className="text-gray-600">Today</span>
            </div>
          )}
        </div>
      )}

      {mode === "range" && (
        <div className="mt-6 flex items-center justify-center space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-600 rounded mr-2"></div>
            <span className="text-gray-600">Selected</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-50 border border-blue-200 rounded mr-2"></div>
            <span className="text-gray-600">In Range</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;

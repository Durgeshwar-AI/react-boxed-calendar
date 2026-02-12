# React Boxed Calendar

A highly customizable, flexible React calendar component with single and range date selection modes, built with TypeScript and Tailwind CSS.

![npm version](https://img.shields.io/npm/v/react-boxed-calendar)
![npm downloads](https://img.shields.io/npm/dm/react-boxed-calendar)
![license](https://img.shields.io/npm/l/react-boxed-calendar)

## Features

- 📅 Single date and date range selection modes
- 🎨 Fully customizable theme using Tailwind CSS classes
- 🔒 Disable past/future dates, weekends, or custom dates
- 🌍 Locale support for weekdays and month names
- 📱 Responsive sizes (sm, md, lg)
- ♿ Accessibility-friendly
- 💪 Written in TypeScript with full type support
- 🎯 Zero external dependencies (except React and Tailwind CSS)

## Installation

```bash
npm install react-boxed-calendar
```

Make sure you have Tailwind CSS configured in your project. If not, follow the [Tailwind CSS installation guide](https://tailwindcss.com/docs/installation).

## Usage

### Basic Example (Single Date Selection)

```tsx
import { useState } from "react";
import { Calendar } from "react-boxed-calendar";

function App() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <Calendar
      mode="single"
      selectedDate={selectedDate}
      onDateChange={setSelectedDate}
    />
  );
}
```

### Date Range Selection

```tsx
import { useState } from "react";
import { Calendar } from "react-boxed-calendar";

function App() {
  const [range, setRange] = useState({ start: null, end: null });

  const handleRangeChange = (start: Date | null, end: Date | null) => {
    setRange({ start, end });
  };

  return (
    <Calendar
      mode="range"
      selectedRange={range}
      onRangeChange={handleRangeChange}
    />
  );
}
```

### Advanced Configuration

```tsx
<Calendar
  mode="single"
  selectedDate={selectedDate}
  onDateChange={setSelectedDate}
  disablePastDates={true}
  disableWeekends={true}
  highlightToday={true}
  weekStartsOn={1} // Monday
  size="lg"
  theme={{
    selectedBg: "bg-purple-600",
    selectedText: "text-white",
    todayBg: "bg-purple-100",
    todayText: "text-purple-600",
    normalText: "text-gray-700",
    normalHoverBg: "hover:bg-gray-200",
    disabledBg: "bg-gray-100",
    disabledText: "text-gray-400",
    borderRadius: "rounded-xl",
  }}
  locale={{
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
  }}
/>
```

## Props

| Prop                 | Type                                               | Default                      | Description                                  |
| -------------------- | -------------------------------------------------- | ---------------------------- | -------------------------------------------- |
| `mode`               | `"single" \| "range"`                              | `"single"`                   | Selection mode                               |
| `selectedDate`       | `Date \| null`                                     | `null`                       | Currently selected date (single mode)        |
| `onDateChange`       | `(date: Date) => void`                             | -                            | Callback when date is selected (single mode) |
| `selectedRange`      | `{ start: Date \| null; end: Date \| null }`       | `{ start: null, end: null }` | Selected date range (range mode)             |
| `onRangeChange`      | `(start: Date \| null, end: Date \| null) => void` | -                            | Callback when range is selected (range mode) |
| `minDate`            | `Date`                                             | -                            | Minimum selectable date                      |
| `maxDate`            | `Date`                                             | -                            | Maximum selectable date                      |
| `disablePastDates`   | `boolean`                                          | `false`                      | Disable all past dates                       |
| `disableFutureDates` | `boolean`                                          | `false`                      | Disable all future dates                     |
| `disableWeekends`    | `boolean`                                          | `false`                      | Disable weekends (Sat & Sun)                 |
| `disableMonthNav`    | `boolean`                                          | `false`                      | Disable month navigation                     |
| `isDateDisabled`     | `(date: Date) => boolean`                          | -                            | Custom function to disable specific dates    |
| `highlightToday`     | `boolean`                                          | `true`                       | Highlight today's date                       |
| `weekStartsOn`       | `0 \| 1`                                           | `0`                          | Week start day (0=Sunday, 1=Monday)          |
| `locale`             | `object`                                           | -                            | Custom locale for weekdays and month names   |
| `theme`              | `object`                                           | -                            | Custom theme configuration                   |
| `size`               | `"sm" \| "md" \| "lg"`                             | `"md"`                       | Calendar size                                |

## Theme Customization

The `theme` prop accepts an object with the following Tailwind CSS class strings:

```typescript
{
  selectedBg?: string;        // Background for selected dates
  selectedText?: string;      // Text color for selected dates
  todayBg?: string;          // Background for today
  todayText?: string;        // Text color for today
  normalText?: string;       // Text color for normal dates
  normalHoverBg?: string;    // Hover background for normal dates
  disabledBg?: string;       // Background for disabled dates
  disabledText?: string;     // Text color for disabled dates
  borderRadius?: string;     // Border radius for date cells
}
```

## Custom Date Disabling

You can disable specific dates using the `isDateDisabled` callback:

```tsx
<Calendar
  isDateDisabled={(date) => {
    // Disable specific dates (e.g., holidays)
    const holidays = [
      new Date(2024, 11, 25), // Christmas
      new Date(2024, 0, 1), // New Year
    ];
    return holidays.some(
      (holiday) => holiday.toDateString() === date.toDateString()
    );
  }}
/>
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. Follow [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Support

If you encounter any issues or have questions, please file an issue on the [GitHub repository](https://github.com/Durgeshwar-AI/react-boxed-calendar/issues).

import { useState } from "react";
import Navbar from "../components/Navbar";
import CalendarSection from "../components/CalendarSection";
import { Calendar } from "react-boxed-calendar";

const Home = () => {
  // Selection Mode States
  const [singleDate, setSingleDate] = useState<Date | null>(new Date());
  const [rangeDates, setRangeDates] = useState<{ start: Date | null; end: Date | null }>({ start: null, end: null });
  const [multiDates, setMultiDates] = useState<Date[]>([]);

  // Theme States
  const [lightDate, setLightDate] = useState<Date | null>(new Date());
  const [darkDate, setDarkDate] = useState<Date | null>(new Date());
  const [metallicDate, setMetallicDate] = useState<Date | null>(new Date());
  const [cyberpunkDate, setCyberpunkDate] = useState<Date | null>(new Date());
  const [retroDate, setRetroDate] = useState<Date | null>(new Date());
  const [natureDate, setNatureDate] = useState<Date | null>(new Date());

  // Size States
  const [smDate, setSmDate] = useState<Date | null>(new Date());
  const [mdDate, setMdDate] = useState<Date | null>(new Date());
  const [lgDate, setLgDate] = useState<Date | null>(new Date());
  const [customDate, setCustomDate] = useState<Date | null>(new Date());

  // Constraint States
  const [noPastDate, setNoPastDate] = useState<Date | null>(new Date());
  const [noFutureDate, setNoFutureDate] = useState<Date | null>(new Date());
  const [noWeekendsDate, setNoWeekendsDate] = useState<Date | null>(new Date());
  const [customDisabledDate, setCustomDisabledDate] = useState<Date | null>(new Date());

  // Holiday & Weekday Off States
  const [holidayDate, setHolidayDate] = useState<Date | null>(new Date());
  const [weekdayOffDate, setWeekdayOffDate] = useState<Date | null>(new Date());

  // Locale State
  const [localeDate, setLocaleDate] = useState<Date | null>(new Date());

  // Navigation State
  const [noNavDate, setNoNavDate] = useState<Date | null>(new Date());

  // Holiday dates (example: Christmas, New Year)
  const holidays = [
    new Date(new Date().getFullYear(), 11, 25), // December 25
    new Date(new Date().getFullYear(), 0, 1),  // January 1
    new Date(new Date().getFullYear(), 6, 4),  // July 4
  ];

  // Custom disabled date function (disable 15th of each month)
  const isDateDisabled = (date: Date) => date.getDate() === 15;

  // French locale
  const frenchLocale = {
    weekDays: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"] as [string, string, string, string, string, string, string],
    monthNames: [
      "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
      "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ] as [string, string, string, string, string, string, string, string, string, string, string, string],
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            React Boxed Calendar
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A beautiful, feature-rich calendar component for React. 
            Multiple themes, flexible selection modes, and extensive customization options.
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="https://www.npmjs.com/package/react-boxed-calendar"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              npm
            </a>
            <a 
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Selection Modes */}
      <div id="modes">
      <CalendarSection
        title="Selection Modes"
        description="Choose between single date, date range, or multiple dates selection."
        code={`<Calendar
  mode="single"
  selectedDate={date}
  onDateChange={setDate}
/>

<Calendar
  mode="range"
  selectedRange={range}
  onRangeChange={(start, end) => setRange({ start, end })}
/>

<Calendar
  mode="multi"
  selectedDates={dates}
  onDatesChange={setDates}
/>`}
      >
        <div className="space-y-8 flex flex-col items-center">
          <div>
            <h4 className="text-sm font-semibold text-gray-500 mb-3 text-center">Single</h4>
            <Calendar
              mode="single"
              selectedDate={singleDate}
              onDateChange={setSingleDate}
            />
          </div>
        </div>
      </CalendarSection>

      {/* Range Selection */}
      <CalendarSection
        title="Range Selection"
        description="Select a range of dates for booking or scheduling applications."
        code={`<Calendar
  mode="range"
  selectedRange={selectedRange}
  onRangeChange={(start, end) => setRange({ start, end })}
/>`}
      >
        <Calendar
          mode="range"
          selectedRange={rangeDates}
          onRangeChange={(start, end) => setRangeDates({ start, end })}
        />
      </CalendarSection>

      {/* Multi Selection */}
      <CalendarSection
        title="Multi Selection"
        description="Select multiple dates for event scheduling or availability."
        code={`<Calendar
  mode="multi"
  selectedDates={selectedDates}
  onDatesChange={setDates}
/>`}
      >
        <Calendar
          mode="multi"
          selectedDates={multiDates}
          onDatesChange={setMultiDates}
        />
      </CalendarSection>

      {/* Themes - Light & Dark */}
      <CalendarSection
        title="Themes"
        description="Choose from 6 built-in themes or create your own custom theme."
        code={`<Calendar themeName="light" />
<Calendar themeName="dark" />
<Calendar themeName="metallic" />
<Calendar themeName="cyberpunk" />
<Calendar themeName="retro" />
<Calendar themeName="nature" />`}
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-semibold text-gray-500 mb-3 text-center">Light</h4>
            <Calendar themeName="light" selectedDate={lightDate} onDateChange={setLightDate} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-500 mb-3 text-center">Dark</h4>
            <Calendar themeName="dark" selectedDate={darkDate} onDateChange={setDarkDate} />
          </div>
        </div>
      </CalendarSection>

      {/* Themes - More */}
      <CalendarSection
        title="More Themes"
        description="Explore additional themes for different aesthetics."
        code={`<Calendar themeName="metallic" />
<Calendar themeName="cyberpunk" />
<Calendar themeName="retro" />
<Calendar themeName="nature" />`}
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-semibold text-gray-500 mb-3 text-center">Metallic</h4>
            <Calendar themeName="metallic" selectedDate={metallicDate} onDateChange={setMetallicDate} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-500 mb-3 text-center">Cyberpunk</h4>
            <Calendar themeName="cyberpunk" selectedDate={cyberpunkDate} onDateChange={setCyberpunkDate} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-500 mb-3 text-center">Retro</h4>
            <Calendar themeName="retro" selectedDate={retroDate} onDateChange={setRetroDate} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-500 mb-3 text-center">Nature</h4>
            <Calendar themeName="nature" selectedDate={natureDate} onDateChange={setNatureDate} />
          </div>
        </div>
      </CalendarSection>

      {/* Sizes - Preset */}
      <CalendarSection
        title="Sizes"
        description="Three preset sizes plus custom sizing options."
        code={`<Calendar size="sm" />
<Calendar size="md" />
<Calendar size="lg" />

<Calendar 
  customSize={{
    box: 400,
    cell: 40,
    gap: 10
  }}
/>`}
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-semibold text-gray-500 mb-3 text-center">Small (sm)</h4>
            <Calendar size="sm" selectedDate={smDate} onDateChange={setSmDate} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-500 mb-3 text-center">Medium (md) - Default</h4>
            <Calendar size="md" selectedDate={mdDate} onDateChange={setMdDate} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-500 mb-3 text-center">Large (lg)</h4>
            <Calendar size="lg" selectedDate={lgDate} onDateChange={setLgDate} />
          </div>
        </div>
      </CalendarSection>

      {/* Custom Size */}
      <CalendarSection
        title="Custom Size"
        description="Fully customize the calendar dimensions."
        code={`<Calendar 
  customSize={{
    box: 450,
    cell: 50,
    gap: 12
  }}
/>`}
      >
        <Calendar 
          customSize={{
            box: 450,
            cell: 50,
            gap: 12
          }}
          selectedDate={customDate}
          onDateChange={setCustomDate}
        />
      </CalendarSection>

      {/* Date Constraints - Disable Past & Future */}
      <CalendarSection
        title="Date Constraints"
        description="Disable past or future dates, weekends, or implement custom disable logic."
        code={`<Calendar disablePastDates />
<Calendar disableFutureDates />
<Calendar disableWeekends />
<Calendar 
  isDateDisabled={(date) => date.getDate() === 15}
/>`}
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-semibold text-gray-500 mb-3 text-center">Disable Past Dates</h4>
            <Calendar disablePastDates selectedDate={noPastDate} onDateChange={setNoPastDate} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-500 mb-3 text-center">Disable Future Dates</h4>
            <Calendar disableFutureDates selectedDate={noFutureDate} onDateChange={setNoFutureDate} />
          </div>
        </div>
      </CalendarSection>

      {/* More Constraints */}
      <CalendarSection
        title="Weekends & Custom Disabled"
        description="Disable weekends or implement custom disabled date logic."
        code={`<Calendar disableWeekends />
<Calendar 
  isDateDisabled={(date) => date.getDate() === 15}
/>`}
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-semibold text-gray-500 mb-3 text-center">Disable Weekends</h4>
            <Calendar disableWeekends selectedDate={noWeekendsDate} onDateChange={setNoWeekendsDate} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-500 mb-3 text-center">Custom Disabled (15th of month)</h4>
            <Calendar isDateDisabled={isDateDisabled} selectedDate={customDisabledDate} onDateChange={setCustomDisabledDate} />
          </div>
        </div>
      </CalendarSection>

      {/* Holidays */}
      <CalendarSection
        title="Holidays"
        description="Highlight specific dates as holidays with custom styling."
        code={`<Calendar 
  holidays={holidays}
  holidayColor={{
    bg: "bg-red-100",
    text: "text-red-700",
    hoverBg: "hover:bg-red-200"
  }}
/>`}
      >
        <Calendar 
          holidays={holidays}
          selectedDate={holidayDate}
          onDateChange={setHolidayDate}
        />
      </CalendarSection>

      {/* Weekday Off */}
      <CalendarSection
        title="Weekday Off"
        description="Mark specific weekdays as off days with custom styling."
        code={`<Calendar 
  weekdayOFF={[2]} // Tuesday off
  weekdayOFFColor={{
    bg: "bg-gray-100",
    text: "text-gray-500"
  }}
/>`}
      >
        <Calendar 
          weekdayOFF={[2]} // Tuesday off
          selectedDate={weekdayOffDate}
          onDateChange={setWeekdayOffDate}
        />
      </CalendarSection>

      {/* Localization */}
      <CalendarSection
        title="Localization"
        description="Customize weekday names and month names for any locale."
        code={`<Calendar 
  locale={{
    weekDays: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
    monthNames: [
      "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
      "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ]
  }}
/>`}
      >
        <Calendar 
          locale={frenchLocale}
          selectedDate={localeDate}
          onDateChange={setLocaleDate}
        />
      </CalendarSection>

      {/* Navigation */}
      <CalendarSection
        title="Disable Navigation"
        description="Optionally disable month/year navigation for fixed date selection."
        code={`<Calendar disableMonthNav />`}
      >
        <Calendar 
          disableMonthNav
          selectedDate={noNavDate}
          onDateChange={setNoNavDate}
        />
      </CalendarSection>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-gray-400">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-4">
            React Boxed Calendar - A beautiful calendar component for React
          </p>
          <p className="text-sm">
            Built with ❤️ for the React community
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

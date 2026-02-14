import { useState } from "react";
import { Calendar } from "react-boxed-calendar";
import "react-boxed-calendar/style.css"; // Ensure styles are imported

function App() {
  const [singleDate, setSingleDate] = useState(new Date());
  const [range, setRange] = useState({ start: null, end: null });

  // Example for disabling holidays
  const disableHolidays = (date) => {
    // Disable 15th and 25th of every month
    return date.getDate() === 15 || date.getDate() === 25;
  };

  return (
    <div className="container">
      <div className="header">
        <h1>React Boxed Calendar Demo</h1>
        <p>A highly customizable, flexible React calendar component.</p>
      </div>

      <div className="demo-grid">
        {/* Basic Usage */}
        <div className="card">
          <h2>Basic Usage</h2>
          <div className="description">
            <p>Standard single date selection mode.</p>
            <ul className="features-list">
              <li>Mode: Single</li>
              <li>Default Theme</li>
              <li>Today Highlighted</li>
            </ul>
          </div>
          <div className="calendar-wrapper">
            <Calendar
              mode="single"
              selectedDate={singleDate}
              onDateChange={setSingleDate}
            />
          </div>
          <div style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#64748b", textAlign: "center" }}>
            Selected: {singleDate ? singleDate.toLocaleDateString() : "None"}
          </div>
        </div>

        {/* Date Range Selection */}
        <div className="card">
          <h2>Date Range Selection</h2>
          <div className="description">
            <p>Select a start and end date.</p>
            <ul className="features-list">
              <li>Mode: Range</li>
              <li>Range Visualization</li>
              <li>Auto-ordering</li>
            </ul>
          </div>
          <div className="calendar-wrapper">
            <Calendar
              mode="range"
              selectedRange={range}
              onRangeChange={(start, end) => setRange({ start, end })}
            />
          </div>
          <div style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#64748b", textAlign: "center" }}>
            Range: {range.start ? range.start.toLocaleDateString() : "Start"} - {range.end ? range.end.toLocaleDateString() : "End"}
          </div>
        </div>

        {/* Custom Theme */}
        <div className="card">
          <h2>Custom Theme</h2>
          <div className="description">
            <p>Fully customizable colors and styles.</p>
            <ul className="features-list">
              <li>Custom Colors (Purple)</li>
              <li>Rounded Corners</li>
              <li>Custom Text Colors</li>
            </ul>
          </div>
          <div className="calendar-wrapper">
            <Calendar
              mode="single"
              theme={{
                selectedBg: "bg-purple-600",
                selectedText: "text-white",
                todayBg: "bg-purple-100",
                todayText: "text-purple-700",
                normalText: "text-slate-700",
                normalHoverBg: "hover:bg-purple-50",
                disabledBg: "bg-slate-100",
                disabledText: "text-slate-400",
                borderRadius: "rounded-full",
              }}
            />
          </div>
        </div>

        {/* Advanced Configuration */}
        <div className="card">
          <h2>Advanced Config</h2>
          <div className="description">
            <p>Control availability and constraints.</p>
            <ul className="features-list">
              <li>Disable Weekends</li>
              <li>Disable Future Dates</li>
              <li>Custom Disable (15th & 25th)</li>
              <li>Week Starts on Monday</li>
            </ul>
          </div>
          <div className="calendar-wrapper">
            <Calendar
              mode="single"
              disableWeekends={true}
              disableFutureDates={true}
              isDateDisabled={disableHolidays}
              weekStartsOn={1}
            />
          </div>
        </div>

        {/* Small Size */}
        <div className="card">
          <h2>Compact Mode</h2>
          <div className="description">
            <p>Smaller footprint for tight spaces.</p>
            <ul className="features-list">
              <li>Size: 'sm'</li>
              <li>Compact Grid</li>
              <li>Minimalist</li>
            </ul>
          </div>
          <div className="calendar-wrapper">
            <Calendar
              mode="single"
              size="sm"
            />
          </div>
        </div>

        {/* Localization */}
        <div className="card">
          <h2>Localization (ES)</h2>
          <div className="description">
            <p>Custom locale support.</p>
            <ul className="features-list">
              <li>Spanish Weekdays</li>
              <li>Spanish Months</li>
            </ul>
          </div>
          <div className="calendar-wrapper">
            <Calendar
              mode="single"
              locale={{
                weekDays: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
                monthNames: [
                  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
                ]
              }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;

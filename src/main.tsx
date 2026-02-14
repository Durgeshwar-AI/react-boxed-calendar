import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Calendar from './Calendar';

const App = () => {
  const [singleDate, setSingleDate] = useState<Date | null>(new Date());
  const [range, setRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            React Boxed Calendar
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            A flexible, customizable calendar component.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Single Date Selection */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
              Single Date Selection
            </h2>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
              <Calendar
                mode="single"
                selectedDate={singleDate}
                onDateChange={setSingleDate}
                theme={{
                   selectedBg: "bg-indigo-600",
                   todayText: "text-indigo-600",
                   todayBg: "bg-indigo-50"
                }}
              />
              <div className="mt-6 text-sm text-gray-600">
                Selected: <span className="font-medium text-gray-900">{singleDate?.toDateString() ?? 'None'}</span>
              </div>
            </div>
          </div>

          {/* Range Selection */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
              Range Selection
            </h2>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
              <Calendar
                mode="range"
                selectedRange={range}
                onRangeChange={(start, end) => setRange({ start, end })}
                disableWeekends
                theme={{
                   selectedBg: "bg-emerald-600",
                   todayText: "text-emerald-600",
                   todayBg: "bg-emerald-50"
                }}
              />
              <div className="mt-6 text-sm text-gray-600">
                Range: <span className="font-medium text-gray-900">
                  {range.start?.toLocaleDateString() ?? '?'} - {range.end?.toLocaleDateString() ?? '?'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Customization Section */}
        <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
              Deep Customization (French Locale)
            </h2>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
              <Calendar
                mode="single"
                locale={{
                  weekDays: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
                  monthNames: [
                    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
                    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
                  ]
                }}
                weekStartsOn={1}
                highlightToday={true}
                disablePastDates={true}
                theme={{
                   selectedBg: "bg-rose-500",
                   selectedText: "text-white",
                   todayBg: "bg-rose-100",
                   todayText: "text-rose-600",
                   borderRadius: "rounded-full"
                }}
              />
            </div>
        </div>
      </div>
    </div>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

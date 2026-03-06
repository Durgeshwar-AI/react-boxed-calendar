import type { ReactNode } from "react";
import CodeBlock from "./CodeBlock";

interface CalendarSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  code?: string;
}

const CalendarSection = ({
  title,
  description,
  children,
  code,
}: CalendarSectionProps) => {
  return (
    <section className="py-12 sm:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-3">
          {title}
        </h2>
        {description && (
          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 max-w-2xl">
            {description}
          </p>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-gray-50 rounded-xl p-4 sm:p-8 flex items-center justify-center min-h-75 sm:min-h-100 overflow-auto">
            {children}
          </div>

          {code && (
            <div className="w-full">
              <CodeBlock code={code} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CalendarSection;

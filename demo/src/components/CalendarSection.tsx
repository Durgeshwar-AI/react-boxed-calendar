import { ReactNode } from "react";
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
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">{title}</h2>
        {description && (
          <p className="text-gray-600 mb-8 max-w-2xl">{description}</p>
        )}
        
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="bg-gray-50 rounded-xl p-8 flex items-center justify-center min-h-[400px]">
            {children}
          </div>
          
          {code && (
            <div className="lg:sticky lg:top-8">
              <CodeBlock code={code} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CalendarSection;

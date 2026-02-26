
export const isSameDay = (d1: Date | null, d2: Date | null): boolean => {
  if (!d1 || !d2) return false;
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
};

export const isToday = (date: Date): boolean => isSameDay(date, new Date());

export const isDateBefore = (a: Date, b: Date): boolean => {
  const dateA = new Date(a);
  const dateB = new Date(b);
  dateA.setHours(0, 0, 0, 0);
  dateB.setHours(0, 0, 0, 0);
  return dateA.getTime() < dateB.getTime();
};

export const isDateAfter = (a: Date, b: Date): boolean => {
  const dateA = new Date(a);
  const dateB = new Date(b);
  dateA.setHours(0, 0, 0, 0);
  dateB.setHours(0, 0, 0, 0);
  return dateA.getTime() > dateB.getTime();
};

export const generateMonthGrid = (year: number, month: number, weekStartsOn: 0 | 1 = 0): Date[] => {
  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const startOffset = (firstDayOfMonth.getDay() - weekStartsOn + 7) % 7;

  const grid: Date[] = [];

  // Previous month padding
  for (let i = startOffset; i > 0; i--) {
    grid.push(new Date(year, month, 1 - i));
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    grid.push(new Date(year, month, d));
  }

  // Next month padding to fill 6 rows (42 days)
  const remainingCells = 42 - grid.length;
  for (let i = 1; i <= remainingCells; i++) {
    grid.push(new Date(year, month + 1, i));
  }

  return grid;
};

// Helper to normalize date to midnight for accurate comparisons
const normalizeDate = (date: Date): Date => {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
};

// Preset date range utilities
export const getToday = (): { start: Date; end: Date } => {
  const today = normalizeDate(new Date());
  return { start: today, end: today };
};

export const getLast7Days = (): { start: Date; end: Date } => {
  const end = normalizeDate(new Date());
  const start = new Date(end);
  start.setDate(start.getDate() - 6);
  return { start, end };
};

export const getLast30Days = (): { start: Date; end: Date } => {
  const end = normalizeDate(new Date());
  const start = new Date(end);
  start.setDate(start.getDate() - 29);
  return { start, end };
};

export const getThisMonth = (): { start: Date; end: Date } => {
  const now = new Date();
  const start = normalizeDate(new Date(now.getFullYear(), now.getMonth(), 1));
  const end = normalizeDate(new Date(now.getFullYear(), now.getMonth() + 1, 0));
  return { start, end };
};

export const getLastMonth = (): { start: Date; end: Date } => {
  const now = new Date();
  const start = normalizeDate(new Date(now.getFullYear(), now.getMonth() - 1, 1));
  const end = normalizeDate(new Date(now.getFullYear(), now.getMonth(), 0));
  return { start, end };
};

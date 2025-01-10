import { format, addMonths, startOfYear } from "date-fns";

export const generateMonthlyLabels = (): string[] => {
  const start = startOfYear(new Date());
  return Array.from({ length: 12 }, (_, i) =>
    format(addMonths(start, i), "MMMM")
  );
};

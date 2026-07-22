export const buildPostFilters = (date?: Date, baseFilter?: string): string => {
  const base = baseFilter || "is_hidden==false";

  if (!date) return base;

  const start = new Date(date).setHours(0, 0, 0, 0);
  const end = new Date(date).setHours(23, 59, 59, 999);

  return `${base} , created_at>=${new Date(
    start
  ).toISOString()} , created_at<=${new Date(end).toISOString()}`;
};

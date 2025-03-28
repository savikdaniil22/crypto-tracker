export const formatNumber = (value: number | string | undefined | null): string => {
  const num = Number(value);
  if (isNaN(num)) return "-";
  if (num >= 1e12) return `${(num / 1e12).toFixed(2)}t`;
  if (num >= 1e9) return `${(num / 1e9).toFixed(2)}b`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(2)}m`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(2)}k`;
  return num.toFixed(2);
};

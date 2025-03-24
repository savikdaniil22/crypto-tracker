export function formatNumber(value: number): string {
  if (value === 0) return "$0";

  const abs = Math.abs(value);

  if (abs >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(2)}b`;
  } else if (abs >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}m`;
  } else if (abs >= 1_000) {
    return `$${(value / 1_000).toFixed(2)}k`;
  } else if (abs < 0.01) {
    return `$${value.toPrecision(2)}`;
  } else {
    return `$${value.toFixed(2)}`;
  }
}

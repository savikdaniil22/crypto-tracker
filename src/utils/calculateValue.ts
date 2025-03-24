export const calculateUsdValue = (amount: number, price: number): string => {
  if (!amount || !price) return "$0.00";

  const value = amount * price;
  return `$${value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

import { ICoin } from "../types";

export const filterCoins = (coins: ICoin[], search: string) => {
  return coins.filter((coin) => {
    const price = parseFloat(coin.priceUsd);
    const cap = parseFloat(coin.marketCapUsd);
    const change = parseFloat(coin.changePercent24Hr);

    const hasValue = price > 0 && cap > 0 && change !== 0;

    const matchesSearch =
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase());

    return hasValue && matchesSearch;
  });
};

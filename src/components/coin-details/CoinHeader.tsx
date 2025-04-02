import { CoinHeaderProps } from "../../types";

export const CoinHeader = ({ name, symbol }: CoinHeaderProps) => (
  <div className="flex items-center gap-4 mb-6">
    <img
      src={`https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`}
      alt={symbol}
      className="w-10 h-10"
    />
    <h1 className="text-2xl font-bold">
      {name} <span className="text-gray-500 text-lg">({symbol})</span>
    </h1>
  </div>
);

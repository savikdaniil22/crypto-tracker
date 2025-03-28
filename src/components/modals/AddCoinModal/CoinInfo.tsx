import { ICoin } from "../../../types";

const CoinInfo = ({ coin }: { coin: ICoin }) => (
  <div className="flex items-center gap-3 mb-4">
    <img
      src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
      alt={coin.symbol}
      className="w-8 h-8"
    />
    <span className="text-gray-600 text-sm">{coin.name}</span>
  </div>
);

export default CoinInfo;

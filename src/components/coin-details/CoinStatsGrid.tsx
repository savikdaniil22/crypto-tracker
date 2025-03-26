import { ICoin } from "../../types";

const CoinStatsGrid = ({ coin }: { coin: ICoin }) => (
  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
    <p>
      <strong>Rank:</strong> {coin.rank}
    </p>
    <p>
      <strong>Price (USD):</strong> ${(+coin.priceUsd).toFixed(4)}
    </p>
    <p>
      <strong>Market Cap (USD):</strong> ${(+coin.marketCapUsd).toLocaleString()}
    </p>
    <p>
      <strong>Circulating Supply:</strong> {coin.supply ? Number(coin.supply).toLocaleString() : "—"}
    </p>
    <p>
      <strong>Max Supply:</strong> {coin.maxSupply ? Number(coin.maxSupply).toLocaleString() : "—"}
    </p>
    <p>
      <strong>24h Change:</strong> {(+coin.changePercent24Hr).toFixed(2)}%
    </p>
  </div>
);

export default CoinStatsGrid;

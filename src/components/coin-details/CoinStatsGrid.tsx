import { ICoin } from "../../types";
import { formatNumber } from "../../utils/formatNumber";

const CoinStatsGrid = ({ coin }: { coin: ICoin }) => {
  const price = +coin.priceUsd;
  const formattedPrice = price < 0.01 ? `$${price.toFixed(6)}` : `$${formatNumber(price)}`;

  return (
    <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
      <p>
        <strong>Rank:</strong> {coin.rank}
      </p>
      <p>
        <strong>Price (USD):</strong> {formattedPrice}
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
};

export default CoinStatsGrid;

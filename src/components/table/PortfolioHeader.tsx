import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useGetCoinsQuery } from "../../services/coinsApi";
import { formatNumber } from "../../utils/formatNumber";
import PortfolioModal from "../modals/PortfolioModal/PortfolioModal";

const PortfolioHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const portfolio = useSelector((state: RootState) => state.portfolio.items);

  const { data: coins = [], isLoading } = useGetCoinsQuery({
    limit: 100,
    offset: 0,
  });

  const sortedTopCoins = [...coins]
    .filter((coin) => coin.rank !== undefined)
    .sort((a, b) => Number(a.rank) - Number(b.rank))
    .slice(0, 3);

  const coinMap = Object.fromEntries(coins.map((c) => [c.id, c]));

  let totalCurrent = 0;
  let totalBought = 0;

  for (const item of portfolio) {
    const latestCoin = coinMap[item.coin.id];
    const currentPrice = latestCoin ? parseFloat(latestCoin.priceUsd) : 0;

    totalCurrent += currentPrice * item.amount;
    totalBought += item.valueAtBuy;
  }

  const diff = totalCurrent - totalBought;
  const diffPercent = totalBought > 0 ? (diff / totalBought) * 100 : 0;
  const diffColor = diff >= 0 ? "text-green-600" : "text-red-600";

  if (isLoading || coins.length === 0) return null;

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-6">
        <div className="bg-blue-50 px-4 py-3 rounded-lg shadow w-full md:w-[49%]">
          <div className="text-sm text-gray-500 mb-2">Top Coins</div>
          <div className="flex flex-wrap gap-4 text-sm">
            {sortedTopCoins.map((coin) => (
              <div key={coin.id} className="flex items-center gap-2">
                <img
                  src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
                  alt={coin.symbol}
                  className="w-5 h-5"
                />
                <span className="font-medium">{coin.symbol.toUpperCase()}:</span>
                <span>${formatNumber(+coin.priceUsd)}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          data-testid="portfolio-header"
          onClick={() => setIsModalOpen(true)}
          className="flex justify-between items-center bg-blue-50 px-4 py-3 rounded-lg shadow cursor-pointer hover:bg-blue-100 transition w-full md:w-[49%]">
          <div>
            <div className="text-sm text-gray-500">Your Portfolio</div>
            <div className="text-xl font-bold">${formatNumber(totalCurrent)}</div>
          </div>

          <div className={`text-sm font-medium ${diffColor}`}>
            {diff >= 0 ? "+" : ""}
            {formatNumber(diff)} USD ({diffPercent.toFixed(2)}%)
          </div>
        </div>
      </div>

      <PortfolioModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default PortfolioHeader;

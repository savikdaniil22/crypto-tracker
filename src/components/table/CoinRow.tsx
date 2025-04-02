import { useNavigate } from "react-router-dom";
import { CoinRowProps } from "../../types";
import { formatNumber } from "../../utils/formatNumber";
import { AddButton } from "../ui/AddButton";

export const CoinRow = ({ coin, onAddClick }: CoinRowProps) => {
  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`/coin/${coin.id}`);
  };

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddClick(coin);
  };

  return (
    <tr
      key={coin.id}
      onClick={handleRowClick}
      className="bg-white hover:bg-gray-50 transition cursor-pointer rounded-lg shadow-sm border-b border-gray-200">
      <td className="px-3 py-4 font-semibold">{coin.rank}</td>
      <td className="px-3 py-4 font-semibold max-w-[350px]">
        <div className="flex items-center gap-2">
          <img
            src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
            alt={coin.symbol}
            className="w-6 h-6"
          />
          <div>
            <span className="font-semibold">{coin.name}</span>{" "}
            <span className="text-gray-400 text-sm font-normal">{coin.symbol}</span>
          </div>
        </div>
      </td>
      <td className="px-3 py-4 font-semibold">{formatNumber(+coin.priceUsd, { isPrice: true })}</td>

      <td className="px-3 py-4 font-semibold">{formatNumber(+coin.marketCapUsd)}</td>
      <td className={`px-3 py-4 font-semibold ${+coin.changePercent24Hr > 0 ? "text-green-500" : "text-red-500"}`}>
        {(+coin.changePercent24Hr).toFixed(2)}%
      </td>
      <td className="px-3 py-4 text-right">
        <AddButton onClick={handleAddClick} />
      </td>
    </tr>
  );
};

import { useDispatch } from "react-redux";
import { removeFromPortfolio } from "../../../app/portfolioSlice";
import { formatNumber } from "../../../utils/formatNumber";
import { useNavigate } from "react-router-dom";
import { PortfolioItem } from "../../../types/index";

export const PortfolioItemRow = ({ item }: { item: PortfolioItem }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { coin, amount, valueAtBuy } = item;

  const currentPrice = parseFloat(coin.priceUsd);
  const priceAtBuy = valueAtBuy / amount;

  return (
    <tr key={coin.id} className="border-b hover:bg-gray-50">
      <td className="py-2 cursor-pointer text-blue-600 hover:underline" onClick={() => navigate(`/coin/${coin.id}`)}>
        <div className="flex items-center gap-2">
          <img
            src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
            alt={coin.symbol}
            className="w-5 h-5"
          />
          <span>
            {coin.name} ({coin.symbol})
          </span>
        </div>
      </td>
      <td className="py-2">{amount}</td>
      <td className="py-2">${formatNumber(priceAtBuy)}</td>
      <td className="py-2">${formatNumber(currentPrice)}</td>
      <td className="py-2 text-right">
        <button
          onClick={() => dispatch(removeFromPortfolio(coin.id))}
          className="text-red-600 hover:text-red-800 text-xs font-medium">
          Remove
        </button>
      </td>
    </tr>
  );
};

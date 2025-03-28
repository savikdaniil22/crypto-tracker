import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { formatNumber } from "../utils/formatNumber";
import { removeFromPortfolio } from "../app/portfolioSlice";
import { useNavigate } from "react-router-dom";
import { PortfolioModalProps } from "../types";

const PortfolioModal = ({ isOpen, onClose }: PortfolioModalProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const portfolio = useSelector((state: RootState) => state.portfolio.items);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center px-4">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-4">Your Portfolio</h2>

        {portfolio.length === 0 ? (
          <p className="text-sm text-gray-500">Your portfolio is empty.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b font-medium text-left">
                <th className="py-2">Coin</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Buy Price</th>
                <th className="py-2">Current Price</th>
                <th className="py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.map((item) => {
                const { coin, amount, valueAtBuy } = item;
                const currentPrice = parseFloat(
                  +coin.priceUsd < 0.01 ? `$${(+coin.priceUsd).toFixed(6)}` : `$${formatNumber(+coin.priceUsd)}`
                );
                const priceAtBuy = valueAtBuy / amount;

                return (
                  <tr key={coin.id} className="border-b hover:bg-gray-50">
                    <td
                      className="py-2 cursor-pointer text-blue-600 hover:underline"
                      onClick={() => {
                        onClose();
                        navigate(`/coin/${coin.id}`);
                      }}>
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
              })}
            </tbody>
          </table>
        )}

        <div className="mt-6 text-right">
          <button onClick={onClose} className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioModal;

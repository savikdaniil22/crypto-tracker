import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { PortfolioItemRow } from "./PortfolioItemRow";

export const PortfolioModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const portfolio = useSelector((state: RootState) => state.portfolio.items);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center px-4">
      <div
        data-testid="portfolio-modal"
        className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 overflow-y-auto max-h-[90vh]">
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
              {portfolio.map((item) => (
                <PortfolioItemRow key={item.coin.id} item={item} />
              ))}
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

import CoinRow from "./CoinRow";
import { CoinTableProps } from "../types";

const CoinTable = ({ coins, onAddClick }: CoinTableProps) => {
  return (
    <table className="w-full text-base border-separate border-spacing-y-2">
      <thead className="sticky top-0 z-10 bg-white shadow-sm">
        <tr className="border-b border-gray-200">
          <th className="px-3 py-4 text-left font-semibold">#</th>
          <th className="px-3 py-4 text-left font-semibold">Name</th>
          <th className="px-3 py-4 text-left font-semibold">Price</th>
          <th className="px-3 py-4 text-left font-semibold">Market Cap</th>
          <th className="px-3 py-4 text-left font-semibold">24h %</th>
          <th className="px-3 py-4 text-left font-semibold"></th>
        </tr>
      </thead>
      <tbody>
        {coins.map((coin) => (
          <CoinRow key={coin.id} coin={coin} onAddClick={onAddClick} />
        ))}
      </tbody>
    </table>
  );
};

export default CoinTable;

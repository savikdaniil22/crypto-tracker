import { CoinRow } from "./CoinRow";
import { CoinTableHeader } from "../table/CoinTableHeader";
import { CoinTableProps } from "../../types";

export const CoinTable = ({ coins, onAddClick, sortField, sortOrder, onSortChange }: CoinTableProps) => {
  return (
    <table className="w-full text-base border-separate border-spacing-y-2">
      <CoinTableHeader sortField={sortField} sortOrder={sortOrder} onSortChange={onSortChange} />
      <tbody>
        {Array.isArray(coins) && coins.map((coin) => <CoinRow key={coin.id} coin={coin} onAddClick={onAddClick} />)}
      </tbody>
    </table>
  );
};

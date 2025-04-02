import React from "react";
import { CoinTableHeaderProps } from "../../types";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa6";

const SortIcon = FaSort as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const SortUpIcon = FaSortUp as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const SortDownIcon = FaSortDown as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

export const CoinTableHeader = ({ sortField, sortOrder, onSortChange }: CoinTableHeaderProps) => {
  const getSortIcon = (field: string) => {
    if (sortField !== field) return <SortIcon className="inline-block ml-1 text-gray-400" />;
    return sortOrder === "asc" ? (
      <SortUpIcon className="inline-block ml-1 text-gray-600" />
    ) : (
      <SortDownIcon className="inline-block ml-1 text-gray-600" />
    );
  };

  return (
    <thead className="sticky top-0 z-10 bg-white shadow-sm">
      <tr className="border-b border-gray-200">
        <th className="px-3 py-4 text-left font-semibold">#</th>
        <th className="px-3 py-4 text-left font-semibold">Name</th>

        <th
          className="px-3 py-4 text-left font-semibold cursor-pointer hover:text-blue-600 transition"
          onClick={() => onSortChange("priceUsd")}>
          Price {getSortIcon("priceUsd")}
        </th>

        <th
          className="px-3 py-4 text-left font-semibold cursor-pointer hover:text-blue-600 transition"
          onClick={() => onSortChange("marketCapUsd")}>
          Market Cap {getSortIcon("marketCapUsd")}
        </th>

        <th
          className="px-3 py-4 text-left font-semibold cursor-pointer hover:text-blue-600 transition"
          onClick={() => onSortChange("changePercent24Hr")}>
          24h % {getSortIcon("changePercent24Hr")}
        </th>

        <th className="px-3 py-4 text-left font-semibold"></th>
      </tr>
    </thead>
  );
};

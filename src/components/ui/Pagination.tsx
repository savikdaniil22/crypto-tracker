import { PaginationProps } from "../../types";

const rowsPerPageOptions = [20, 50, 100];

export const Pagination = ({
  page,
  perPage,
  hasNextPage,
  onNext,
  onPrev,
  onSetPerPage,
}: PaginationProps & { hasNextPage: boolean }) => {
  return (
    <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600 w-full">
      <div className="flex justify-center items-center gap-2 w-full">
        <button
          onClick={onPrev}
          disabled={page === 0}
          className="px-2 py-1 rounded border disabled:opacity-50 hover:bg-gray-200">
          &lt;
        </button>

        <button
          onClick={onNext}
          disabled={!hasNextPage}
          className="px-2 py-1 rounded border disabled:opacity-50 hover:bg-gray-200">
          &gt;
        </button>
      </div>
      <div className="flex items-center gap-2">
        <span>Show rows:</span>
        <select
          value={perPage}
          onChange={(e) => onSetPerPage(Number(e.target.value))}
          className="border px-2 py-1 rounded text-sm">
          {rowsPerPageOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

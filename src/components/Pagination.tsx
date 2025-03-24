import { PaginationProps } from "../types";

const rowsPerPageOptions = [20, 50, 100];

const Pagination = ({
  page,
  totalPages,
  totalItems,
  perPage,
  onNext,
  onPrev,
  onSetPage,
  onSetPerPage,
}: PaginationProps) => {
  const from = page * perPage + 1;
  const to = Math.min((page + 1) * perPage, totalItems);

  const renderPages = () => {
    const pages = [];
    const maxVisible = 5;

    const start = Math.max(0, Math.min(page - 2, totalPages - maxVisible));
    const end = Math.min(totalPages, start + maxVisible);

    for (let i = start; i < end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onSetPage(i)}
          className={`w-8 h-8 rounded text-sm font-medium mx-1 ${
            i === page ? "bg-blue-600 text-white" : "text-gray-800 hover:bg-gray-200"
          }`}>
          {i + 1}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-sm text-gray-600">
      <div>
        Showing <span className="font-semibold">{from}</span> - <span className="font-semibold">{to}</span> out of{" "}
        <span className="font-semibold">{totalItems}</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          disabled={page === 0}
          className="px-2 py-1 rounded border disabled:opacity-50 hover:bg-gray-200">
          &lt;
        </button>

        {renderPages()}

        <button
          onClick={onNext}
          disabled={page + 1 >= totalPages}
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

export default Pagination;

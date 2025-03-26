import { PaginationProps } from "../types";

const rowsPerPageOptions = [20, 50, 100];

const Pagination = ({
  page,
  perPage,
  hasNextPage,
  onNext,
  onPrev,
  onSetPage,
  onSetPerPage,
}: PaginationProps & { hasNextPage: boolean }) => {
  const renderPages = () => {
    const pages = [];
    const maxVisible = 3;

    const lastPage = hasNextPage ? page + 1 : page;
    const start = Math.max(0, lastPage - (maxVisible - 1));
    const end = lastPage + 1;

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
    <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600 w-full">
      {/* Центрированные кнопки пагинации */}
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

export default Pagination;

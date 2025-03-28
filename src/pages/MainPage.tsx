import { useState } from "react";
import { useGetCoinsQuery } from "../services/coinsApi";
import { ICoin, SortField, SortOrder } from "../types";
import AddCoinModal from "../components/AddCoinModal";
import Pagination from "../components/Pagination";
import CoinTable from "../components/CoinTable";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";
import PortfolioHeader from "../components/PortfolioHeader";

const MainPage = () => {
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(100);
  const [search, setSearch] = useState("");
  const [selectedCoin, setSelectedCoin] = useState<ICoin | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const offset = page * perPage;
  const sortParam = sortField ? `${sortOrder === "desc" ? "-" : ""}${sortField}` : undefined;

  const {
    data: coins = [],
    isLoading,
    isError,
  } = useGetCoinsQuery({
    limit: perPage,
    offset,
    sort: sortParam,
    search,
  });

  const { data: nextCoins = [] } = useGetCoinsQuery(
    {
      limit: perPage,
      offset: (page + 1) * perPage,
      sort: sortParam,
      search,
    },
    {
      skip: isLoading,
    }
  );

  const hasNextPage = nextCoins.length > 0;

  const handleSortChange = (field: SortField) => {
    if (sortField !== field) {
      setSortField(field);
      setSortOrder("asc");
    } else if (sortOrder === "asc") {
      setSortOrder("desc");
    } else {
      setSortField(null);
    }
    setPage(0);
  };

  const handleAddClick = (coin: ICoin) => {
    setSelectedCoin(coin);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCoin(null);
  };

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 0));

  if (isLoading) return <Loader />;
  if (isError) {
    return <ErrorMessage message="Failed to load data" onRetry={() => window.location.reload()} />;
  }

  return (
    <div className="max-w-[1920px] mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Cryptocurrencies</h1>

      <PortfolioHeader />

      <input
        type="text"
        placeholder="Search for a coin..."
        className="mb-4 px-4 py-2 border rounded-md w-full max-w-sm text-sm"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(0);
        }}
      />

      <CoinTable
        coins={coins}
        onAddClick={handleAddClick}
        sortField={sortField}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
      />

      <Pagination
        page={page}
        perPage={perPage}
        hasNextPage={hasNextPage}
        onNext={handleNextPage}
        onPrev={handlePrevPage}
        onSetPage={setPage}
        onSetPerPage={(val) => {
          setPerPage(val);
          setPage(0);
        }}
      />

      <AddCoinModal coin={selectedCoin} isOpen={isModalOpen} onClose={handleModalClose} />
    </div>
  );
};

export default MainPage;

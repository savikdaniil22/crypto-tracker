import { useState } from "react";
import { useGetCoinsQuery } from "../services/coinsApi";
import { filterCoins } from "../utils/filterCoins";
import { ICoin, SortField, SortOrder } from "../types";
import AddCoinModal from "../components/AddCoinModal";
import Pagination from "../components/Pagination";
import CoinTable from "../components/CoinTable";

const MainPage = () => {
  const [page, setPage] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(100);
  const [search, setSearch] = useState("");
  const [selectedCoin, setSelectedCoin] = useState<ICoin | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const {
    data: coins = [],
    isLoading,
    isError,
  } = useGetCoinsQuery({
    limit: 2000,
    offset: 0,
  });

  const filteredCoins = filterCoins(coins, search);

  const sortedCoins = [...filteredCoins].sort((a, b) => {
    if (!sortField) return 0;

    const aValue = parseFloat(a[sortField]);
    const bValue = parseFloat(b[sortField]);

    if (isNaN(aValue) || isNaN(bValue)) return 0;

    return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
  });

  const paginatedCoins = sortedCoins.slice(page * perPage, (page + 1) * perPage);
  const totalPages = Math.ceil(filteredCoins.length / perPage);

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

  const handleAddToPortfolio = (amount: number) => {
    console.log("Added to portfolio", selectedCoin, "amount:", amount);
    handleModalClose();
  };

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 0));

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (isError) return <div className="text-center text-red-500 mt-10">Failed to load data</div>;

  return (
    <div className="max-w-[1920px] mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Cryptocurrencies</h1>

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
        coins={paginatedCoins}
        onAddClick={handleAddClick}
        sortField={sortField}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
      />

      <Pagination
        page={page}
        totalPages={totalPages}
        totalItems={filteredCoins.length}
        perPage={perPage}
        onNext={handleNextPage}
        onPrev={handlePrevPage}
        onSetPage={setPage}
        onSetPerPage={(val) => {
          setPerPage(val);
          setPage(0);
        }}
      />

      <AddCoinModal coin={selectedCoin} isOpen={isModalOpen} onClose={handleModalClose} onAdd={handleAddToPortfolio} />
    </div>
  );
};

export default MainPage;

import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGetCoinByIdQuery, useGetCoinHistoryQuery } from "../services/coinsApi";
import { AddCoinModal } from "../components/modals/AddCoinModal/AddCoinModal";
import { CoinHeader } from "../components/coin-details/CoinHeader";
import { CoinStatsGrid } from "../components/coin-details/CoinStatsGrid";
import { CoinChart } from "../components/coin-details/CoinChart";
import { Loader } from "../components/ui/Loader";
import { ErrorMessage } from "../components/ui/ErrorMessage";
import { AddButton } from "../components/ui/AddButton";

export const CoinPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [interval, setInterval] = useState<"h1" | "h12" | "d1">("d1");

  const { data: coin, isLoading, isError } = useGetCoinByIdQuery(id || "", { skip: !id });
  const { data: history = [] } = useGetCoinHistoryQuery({ id: id || "", interval }, { skip: !id });

  const handleBack = () => navigate(-1);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  if (isLoading) return <Loader />;
  if (isError || !coin) return <ErrorMessage message="Coin not found." onBack={handleBack} />;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button onClick={handleBack} className="mb-4 text-sm text-blue-600 hover:text-blue-800 transition">
        ← Back to table
      </button>

      <CoinHeader name={coin.name} symbol={coin.symbol} />
      <CoinStatsGrid coin={coin} />
      <CoinChart history={history} interval={interval} onIntervalChange={setInterval} />

      <AddButton onClick={handleOpenModal} />
      <AddCoinModal coin={coin} isOpen={modalOpen} onClose={handleCloseModal} />
    </div>
  );
};

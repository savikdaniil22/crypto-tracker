import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGetCoinByIdQuery, useGetCoinHistoryQuery } from "../services/coinsApi";
import AddCoinModal from "../components/AddCoinModal";
import CoinHeader from "../components/coin-details/CoinHeader";
import CoinStatsGrid from "../components/coin-details/CoinStatsGrid";
import CoinChart from "../components/coin-details/CoinChart";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";

const CoinPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [interval, setInterval] = useState<"h1" | "h12" | "d1">("d1");

  const { data: coin, isLoading, isError } = useGetCoinByIdQuery(id || "", { skip: !id });
  const { data: history = [] } = useGetCoinHistoryQuery({ id: id || "", interval }, { skip: !id });

  if (isLoading) return <Loader />;
  if (isError || !coin) return <ErrorMessage message="Coin not found." onBack={() => navigate(-1)} />;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="mb-4 text-sm text-blue-600 hover:text-blue-800 transition">
        ← Back to table
      </button>

      <CoinHeader name={coin.name} symbol={coin.symbol} />
      <CoinStatsGrid coin={coin} />
      <CoinChart history={history} interval={interval} onIntervalChange={setInterval} />

      <button
        onClick={() => setModalOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-6 py-2 rounded-lg transition">
        Add
      </button>

      <AddCoinModal
        coin={coin}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={(amount) => {
          console.log("Add to portfolio:", coin, amount);
          setModalOpen(false);
        }}
      />
    </div>
  );
};

export default CoinPage;

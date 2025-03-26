/* eslint-disable no-implied-eval */

import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGetCoinByIdQuery, useGetCoinHistoryQuery } from "../services/coinsApi";
import AddCoinModal from "../components/AddCoinModal";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { format } from "date-fns";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

const CoinPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [interval, setInterval] = useState<"h1" | "h12" | "d1">("d1");

  const { data: coin, isLoading, isError } = useGetCoinByIdQuery(id || "", { skip: !id });

  const { data: history = [] } = useGetCoinHistoryQuery({ id: id || "", interval }, { skip: !id });

  const normalizedHistory = history.map((point: { time: number; priceUsd: string }) => ({
    date: format(new Date(point.time), interval === "h1" ? "HH:mm" : "MMM d"),
    priceUsd: parseFloat(point.priceUsd),
  }));

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !coin) {
    return <ErrorMessage message="Sorry, this coin does not exist or cannot be loaded." onBack={() => navigate(-1)} />;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="mb-4 text-sm text-blue-600 hover:text-blue-800 transition">
        ← Back to table
      </button>

      <div className="flex items-center gap-4 mb-6">
        <img
          src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
          alt={coin.symbol}
          className="w-10 h-10"
        />
        <h1 className="text-2xl font-bold">
          {coin.name} <span className="text-gray-500 text-lg">({coin.symbol})</span>
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
        <p>
          <strong>Rank:</strong> {coin.rank}
        </p>
        <p>
          <strong>Price (USD):</strong> ${(+coin.priceUsd).toFixed(4)}
        </p>
        <p>
          <strong>Market Cap (USD):</strong> ${(+coin.marketCapUsd).toLocaleString()}
        </p>
        <p>
          <strong>Circulating Supply:</strong> {coin.supply ? Number(coin.supply).toLocaleString() : "—"}
        </p>
        <p>
          <strong>Max Supply:</strong> {coin.maxSupply ? Number(coin.maxSupply).toLocaleString() : "—"}
        </p>
        <p>
          <strong>24h Change:</strong> {(+coin.changePercent24Hr).toFixed(2)}%
        </p>
      </div>

      <div className="mb-6">
        <div className="flex gap-2 mb-2">
          <button
            className={`px-3 py-1 rounded text-sm border ${
              interval === "h1" ? "bg-blue-600 text-white" : "border-gray-300"
            }`}
            onClick={() => setInterval("h1")}>
            1 hour
          </button>
          <button
            className={`px-3 py-1 rounded text-sm border ${
              interval === "h12" ? "bg-blue-600 text-white" : "border-gray-300"
            }`}
            onClick={() => setInterval("h12")}>
            12 hours
          </button>
          <button
            className={`px-3 py-1 rounded text-sm border ${
              interval === "d1" ? "bg-blue-600 text-white" : "border-gray-300"
            }`}
            onClick={() => setInterval("d1")}>
            1 day
          </button>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={normalizedHistory}
            margin={{ top: 10, right: 10, bottom: 10, left: 50 }} // ← фикс для оси Y с $
          >
            <XAxis dataKey="date" tick={{ fontSize: 10 }} />
            <YAxis domain={["auto", "auto"]} tickFormatter={(val) => `$${val.toFixed(0)}`} />
            <Tooltip
              formatter={(value: number) => `$${value.toFixed(2)}`}
              labelFormatter={(label) => `Time: ${label}`}
            />
            <Line type="monotone" dataKey="priceUsd" stroke="#3b82f6" dot={false} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

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

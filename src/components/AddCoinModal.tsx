import { useState, useEffect } from "react";
import { AddCoinModalProps } from "../types";
import { calculateUsdValue } from "../utils/calculateValue";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { addToPortfolio } from "../app/portfolioSlice";

const MIN_AMOUNT = 0.0001;
const MAX_AMOUNT = 1_000_000;

const AddCoinModal = ({ coin, isOpen, onClose }: AddCoinModalProps) => {
  const [amountStr, setAmountStr] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setAmountStr("");
    setError(null);
  }, [coin]);

  if (!isOpen || !coin) return null;

  const price = +coin.priceUsd;
  const amount = parseFloat(amountStr);
  const isValid = !isNaN(amount) && amount >= MIN_AMOUNT && amount <= MAX_AMOUNT;
  const totalValue = isValid ? calculateUsdValue(amount, price) : "$0.00";

  const handleInputChange = (value: string) => {
    setAmountStr(value);
    const parsed = parseFloat(value);
    if (isNaN(parsed)) {
      setError("Invalid number");
    } else if (parsed < MIN_AMOUNT) {
      setError(`Minimum amount is ${MIN_AMOUNT}`);
    } else if (parsed > MAX_AMOUNT) {
      setError(`Maximum amount is ${MAX_AMOUNT}`);
    } else {
      setError(null);
    }
  };

  const handleAdd = () => {
    if (!error && isValid) {
      dispatch(
        addToPortfolio({
          coin,
          amount,
          valueAtBuy: price * amount,
        })
      );
      setAmountStr("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg">
        <h2 className="text-lg font-semibold mb-4">
          Add {coin.name} <span className="text-gray-500">({coin.symbol})</span>
        </h2>

        <div className="flex items-center gap-3 mb-4">
          <img
            src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
            alt={coin.symbol}
            className="w-8 h-8"
          />
          <span className="text-gray-600 text-sm">{coin.name}</span>
        </div>

        <label className="block text-sm font-medium mb-1">Amount</label>
        <input
          type="text"
          inputMode="decimal"
          value={amountStr}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="e.g. 0.001"
          className="w-full border rounded px-3 py-2 mb-1 text-sm"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <div className="text-sm text-gray-500 mb-4">≈ {totalValue}</div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-1 text-sm rounded border border-gray-300 hover:bg-gray-100">
            Cancel
          </button>
          <button
            onClick={handleAdd}
            disabled={!!error || !amountStr}
            className={`px-4 py-1 text-sm rounded text-white transition ${
              !!error || !amountStr ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}>
            Add to Portfolio
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCoinModal;

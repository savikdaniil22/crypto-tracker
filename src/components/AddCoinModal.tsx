import { AddCoinModalProps } from "../types";
import { calculateUsdValue } from "../utils/calculateValue";
import { useState, useEffect } from "react";

const AddCoinModal = ({ coin, isOpen, onClose, onAdd }: AddCoinModalProps) => {
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    setAmount(0);
  }, [coin]);

  if (!isOpen || !coin) return null;

  const price = parseFloat(coin.priceUsd);
  const totalValue = calculateUsdValue(amount, price);

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
          type="number"
          step="any"
          inputMode="decimal"
          value={amount || ""}
          onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
          placeholder="e.g. 2.5"
          className="w-full border rounded px-3 py-2 mb-3 text-sm appearance-none 
                    [&::-webkit-inner-spin-button]:appearance-none 
                    [&::-webkit-outer-spin-button]:appearance-none 
                    [moz-appearance:textfield]"
        />

        <div className="text-sm text-gray-500 mb-4">≈ {totalValue}</div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-1 text-sm rounded border border-gray-300 hover:bg-gray-100">
            Cancel
          </button>
          <button
            onClick={() => {
              onAdd(amount);
              setAmount(0);
              onClose();
            }}
            className="px-4 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700">
            Add to Portfolio
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCoinModal;

import { useState, useEffect } from "react";
import { AddCoinModalProps } from "../../../types";
import { calculateUsdValue } from "../../../utils/calculateValue";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { addToPortfolio } from "../../../app/portfolioSlice";
import { CoinInfo } from "./CoinInfo";
import { AmountInput } from "./AmountInput";
import { ModalFooter } from "./ModalFooter";

const MIN_AMOUNT = 0.0001;
const MAX_AMOUNT = 1_000_000;

export const AddCoinModal = ({ coin, isOpen, onClose }: AddCoinModalProps) => {
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
    <div data-testid="add-modal" className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg">
        <h2 className="text-lg font-semibold mb-4">
          Add {coin.name} <span className="text-gray-500">({coin.symbol})</span>
        </h2>

        <CoinInfo coin={coin} />
        <AmountInput
          amountStr={amountStr}
          handleInputChange={handleInputChange}
          error={error}
          totalValue={totalValue}
        />
        <ModalFooter onClose={onClose} handleAdd={handleAdd} isValid={isValid} amountStr={amountStr} error={error} />
      </div>
    </div>
  );
};

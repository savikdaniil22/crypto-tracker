export const AmountInput = ({
  amountStr,
  handleInputChange,
  error,
  totalValue,
}: {
  amountStr: string;
  handleInputChange: (value: string) => void;
  error: string | null;
  totalValue: string;
}) => (
  <>
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
  </>
);

const ModalFooter = ({
  onClose,
  handleAdd,
  isValid,
  amountStr,
  error,
}: {
  onClose: () => void;
  handleAdd: () => void;
  isValid: boolean;
  amountStr: string;
  error: string | null;
}) => (
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
);

export default ModalFooter;

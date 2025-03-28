import { FC } from "react";
import { AddButtonProps } from "../../types";

const AddButton: FC<AddButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick} // Теперь будет работать корректно
      className="text-blue-600 border border-blue-500 rounded-full px-3 py-0.5 text-xs font-medium hover:bg-blue-50 transition">
      Add
    </button>
  );
};

export default AddButton;

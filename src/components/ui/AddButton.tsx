import { FC } from "react";
import { AddButtonProps } from "../../types";

export const AddButton: FC<AddButtonProps> = ({ onClick }) => {
  return (
    <button
      data-testid="add-button"
      onClick={onClick}
      className="text-blue-600 border border-blue-500 rounded-full px-3 py-0.5 text-xs font-medium hover:bg-blue-50 transition">
      Add
    </button>
  );
};

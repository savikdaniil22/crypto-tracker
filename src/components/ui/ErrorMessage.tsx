import { ErrorMessageProps } from "../../types/index";

const ErrorMessage = ({ message, onRetry, onBack }: ErrorMessageProps) => {
  return (
    <div className="flex flex-col justify-center items-center h-64 text-center">
      <p className="text-red-600 text-lg font-semibold mb-4">{message}</p>

      {onRetry && (
        <button onClick={onRetry} className="mb-2 text-sm text-blue-600 hover:text-blue-800 transition">
          Try again
        </button>
      )}

      {onBack && (
        <button onClick={onBack} className="text-sm text-gray-600 hover:text-gray-800 transition">
          ← Back
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;

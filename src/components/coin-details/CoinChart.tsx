import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { format } from "date-fns";
import { CoinChartProps } from "../../types";

const CoinChart = ({ history, interval, onIntervalChange }: CoinChartProps) => {
  const normalizedHistory = history.map((point) => ({
    date: format(new Date(point.time), interval === "h1" ? "HH:mm" : "MMM d"),
    priceUsd: parseFloat(point.priceUsd),
  }));

  return (
    <div className="mb-6">
      <div className="flex gap-2 mb-2">
        {["h1", "h12", "d1"].map((int) => (
          <button
            key={int}
            onClick={() => onIntervalChange(int as "h1" | "h12" | "d1")}
            className={`px-3 py-1 rounded text-sm border ${
              interval === int ? "bg-blue-600 text-white" : "border-gray-300"
            }`}>
            {int === "h1" ? "1 hour" : int === "h12" ? "12 hours" : "1 day"}
          </button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={normalizedHistory} margin={{ top: 10, right: 10, bottom: 10, left: 50 }}>
          <XAxis dataKey="date" tick={{ fontSize: 10 }} />
          <YAxis domain={["auto", "auto"]} tickFormatter={(val) => `$${val.toFixed(0)}`} />
          <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} labelFormatter={(label) => `Time: ${label}`} />
          <Line type="monotone" dataKey="priceUsd" stroke="#3b82f6" dot={false} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CoinChart;

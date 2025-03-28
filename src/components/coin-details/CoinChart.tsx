import { CoinChartProps } from "../../types";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import Loader from "../ui/Loader";

const CoinChart = ({ history, interval, onIntervalChange }: CoinChartProps) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current || history.length === 0) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const labels = history.map((point) => new Date(point.time).toLocaleDateString());
    const data = history.map((point) => parseFloat(point.priceUsd));

    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Price (USD)",
            data,
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            fill: true,
            tension: 0.3,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10,
            },
          },
          y: {
            ticks: {
              callback: (value: string | number) => `$${value}`,
            },
          },
        },
      },
    });
  }, [history]);

  return (
    <div className="mt-6">
      <div className="mb-4">
        <label className="text-sm font-medium mr-2">Interval:</label>
        <select
          value={interval}
          onChange={(e) => onIntervalChange(e.target.value as CoinChartProps["interval"])}
          className="text-sm border px-2 py-1 rounded">
          <option value="h1">1 Hour</option>
          <option value="h12">12 Hours</option>
          <option value="d1">1 Day</option>
        </select>
      </div>

      <div className="relative h-[300px]">
        {history.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white rounded shadow">
            <Loader />
          </div>
        ) : (
          <canvas ref={chartRef} />
        )}
      </div>
    </div>
  );
};

export default CoinChart;

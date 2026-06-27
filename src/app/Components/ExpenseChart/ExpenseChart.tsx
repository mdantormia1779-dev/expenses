"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  TooltipProps,
} from "recharts";

import type {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";

// ================= TYPES =================
interface Expense {
  _id: string;
  title: string;
  amount: number | string;
  category?: string;
  date: string;
}

interface ChartItem {
  name: string;
  value: number;
}

// ================= CONSTANTS =================
const COLORS = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444"];

// ================= TOOLTIP FORMATTER =================
const tooltipFormatter: TooltipProps<ValueType, NameType>["formatter"] = (
  value
) => {
  if (value == null) return "";

  if (Array.isArray(value)) return value.join(", ");

  if (typeof value === "number") {
    return `$${value.toFixed(2)}`;
  }

  return String(value);
};

// ================= COMPONENT =================
const ExpenseChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // ================= FETCH DATA =================
  const fetchChartData = useCallback(async () => {
    if (!API_URL) return;

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_URL}/expenses`);

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const expenses: Expense[] = await res.json();

      // Group by category
      const grouped = expenses.reduce<Record<string, number>>(
        (acc, item) => {
          const category = item.category || "Others";

          const amount =
            typeof item.amount === "string"
              ? parseFloat(item.amount)
              : item.amount;

          if (!isNaN(amount)) {
            acc[category] = (acc[category] || 0) + amount;
          }

          return acc;
        },
        {}
      );

      // Convert to chart format
      const formatted: ChartItem[] = Object.entries(grouped).map(
        ([key, value]) => ({
          name: key,
          value,
        })
      );

      setChartData(formatted);
    } catch (err) {
      console.error(err);
      setError("Failed to load chart data");
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  // ================= EFFECT =================
  useEffect(() => {
    const load = async () => {
      await fetchChartData();
    };

    load();

    const handler = () => load();

    window.addEventListener("expenseAdded", handler);
    window.addEventListener("expenseUpdated", handler);

    return () => {
      window.removeEventListener("expenseAdded", handler);
      window.removeEventListener("expenseUpdated", handler);
    };
  }, [fetchChartData]);

  // ================= UI STATES =================
  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading chart...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">{error}</div>
    );
  }

  if (chartData.length === 0) {
    return (
      <div className="p-6 text-center text-gray-400">
        No expense data available
      </div>
    );
  }

  // ================= MAIN UI =================
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border w-full h-80">
      <h2 className="text-lg font-semibold mb-4 text-center">
        Expenses by Category
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
            dataKey="value"
          >
            {chartData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip formatter={tooltipFormatter} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseChart;
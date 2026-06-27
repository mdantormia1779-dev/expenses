"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// Expense interface wahi hai jo aapne table mein use kiya tha
interface Expense {
  _id: string;
  title: string;
  amount: number | string;
  category: string;
  date: string;
}

const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#6b7280'];

const ExpenseChart: React.FC = () => {
  const [chartData, setChartData] = useState<{ name: string; value: number }[]>([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchChartData = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/expenses`);
      const expenses: Expense[] = await res.json(); // Type specify kar diya

      // Data aggregation logic (Record type use kiya any ki jagah)
      const groups = expenses.reduce((acc: Record<string, number>, item: Expense) => {
        const category = item.category || "Others";
        const amount = typeof item.amount === 'string' ? parseFloat(item.amount) : item.amount;
        acc[category] = (acc[category] || 0) + amount;
        return acc;
      }, {});

      const formattedData = Object.keys(groups).map((key) => ({
        name: key,
        value: groups[key]
      }));

      setChartData(formattedData);
    } catch (error) {
      console.error("Chart data fetch error:", error);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchChartData();
    window.addEventListener('expenseAdded', fetchChartData);
    window.addEventListener('expenseUpdated', fetchChartData);
    return () => {
      window.removeEventListener('expenseAdded', fetchChartData);
      window.removeEventListener('expenseUpdated', fetchChartData);
    };
  }, [fetchChartData]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full h-80">
      <h2 className="text-lg font-semibold mb-4 text-center">Expenses by Category</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {chartData.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseChart;
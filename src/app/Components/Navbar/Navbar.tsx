"use client";
import React, { useState, useEffect, useCallback } from 'react';

const Navbar: React.FC = () => {
  const [total, setTotal] = useState<number>(0);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // useCallback ka use kiya taaki function stable rahe
  const fetchTotal = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/expenses`);
      const data = await res.json();
      const totalAmount = data.reduce((sum: number, item: any) => sum + parseFloat(item.amount || 0), 0);
      setTotal(totalAmount);
    } catch (error) {
      console.error("Navbar total fetch error:", error);
    }
  }, [API_URL]);

  useEffect(() => {
    // 1. Async function define karein
    const init = async () => {
      await fetchTotal();
    };

    // 2. Call karein
    init();

    // 3. Event listeners
    const handleRefresh = () => fetchTotal();
    window.addEventListener('expenseAdded', handleRefresh);
    window.addEventListener('expenseUpdated', handleRefresh);

    return () => {
      window.removeEventListener('expenseAdded', handleRefresh);
      window.removeEventListener('expenseUpdated', handleRefresh);
    };
  }, [fetchTotal]); // fetchTotal stable hai kyunki useCallback use kiya hai

  return (
    <nav className="bg-linear-to-r from-slate-700 to-teal-700 p-6 md:p-8 rounded-lg shadow-md text-white">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-xs md:text-sm font-medium opacity-90">XPence Tracker</span>
          <span className="text-lg md:text-2xl font-bold">Dashboard</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs md:text-sm font-medium opacity-90">Total Expenses</span>
          <span className="text-lg md:text-2xl font-bold">${total.toFixed(2)}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
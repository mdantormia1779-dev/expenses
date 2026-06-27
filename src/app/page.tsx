"use client";
import { useState } from "react";
import ExpenseChart from "./Components/ExpenseChart/ExpenseChart";
import ExpenseForm from "./Components/ExpenseForm/ExpenseForm";
import ExpenseTable from "./Components/ExpenseTable/ExpenseTable";
import Navbar from "./Components/Navbar/Navbar";

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => setRefreshKey((prev) => prev + 1);

  return (
    <div className="bg-gray-50 min-h-screen md:p-5">
      <Navbar />
      <div className="flex mt-6 flex-col md:flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
        
        {/* Left Side: Form */}
        <div className="w-full md:w-80 shrink-0">
          <ExpenseForm onAddSuccess={handleRefresh} />
        </div>

        {/* Right Side: Table & Chart */}
        <div className="flex flex-col gap-6 w-full">
          <div className="overflow-x-auto">
             {/* Key change hote hi Table aur Chart dono re-render honge */}
             <ExpenseTable key={refreshKey} />
          </div>
          <ExpenseChart key={refreshKey} />
        </div>
        
      </div>
    </div>
  );
}
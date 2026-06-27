"use client";
import React, { useState, useEffect } from "react";
import EditModal from "../EditModal/EditModal";

interface Expense {
  _id: string;
  title: string;
  amount: number | string;
  category: string;
  date: string;
}

const ExpenseTable: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editingItem, setEditingItem] = useState<Expense | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Category styling function
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Food":
        return "bg-emerald-500";
      case "Transport":
        return "bg-blue-500";
      case "Shopping":
        return "bg-purple-500";
      case "Others":
        return "bg-gray-500";
      default:
        return "bg-gray-400";
    }
  };

  useEffect(() => {
    let isMounted = true;
    const fetchExpenses = async () => {
      try {
        const res = await fetch(`${API_URL}/expenses`);
        const data: Expense[] = await res.json();
        if (isMounted) setExpenses(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchExpenses();
    return () => {
      isMounted = false;
    };
  }, [API_URL]);

  // DELETE function
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure?")) {
      await fetch(`${API_URL}/expenses/${id}`, { method: "DELETE" });
      setExpenses(expenses.filter((item) => item._id !== id));

      // Event fire karein taaki Navbar update ho
      window.dispatchEvent(new Event("expenseUpdated"));
    }
  };

  // UPDATE function
  const handleUpdate = async (updatedData: Expense) => {
    await fetch(`${API_URL}/expenses/${updatedData._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    setExpenses(
      expenses.map((item) =>
        item._id === updatedData._id ? updatedData : item,
      ),
    );
    setEditingItem(null);

    // Event fire karein taaki Navbar update ho
    window.dispatchEvent(new Event("expenseUpdated"));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex-1">
      <h2 className="text-lg font-semibold mb-4">Expense List View</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-125">
          <thead>
            <tr className="border-b text-sm text-gray-500">
              <th>Title</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((item) => (
              <tr key={item._id} className="border-b">
                <td className="py-3">{item.title}</td>
                <td className="py-3">${item.amount}</td>
                <td className="py-3">
                  {/* Yahan hum dynamic color apply kar rahe hain */}
                  <span
                    className={`${getCategoryColor(item.category)} text-white px-2 py-1 rounded text-xs whitespace-nowrap`}
                  >
                    {item.category}
                  </span>
                </td>
                <td className="py-3">{item.date}</td>
                <td className="py-3 space-x-2">
                  <button
                    onClick={() => setEditingItem(item)}
                    className="text-emerald-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingItem && (
        <EditModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};
export default ExpenseTable;

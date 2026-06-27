"use client";
import React, { useState } from "react";

// Props interface
interface ExpenseFormProps {
  onAddSuccess: () => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "Food",
    date: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      amount: parseFloat(formData.amount),
    };

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    try {
      const response = await fetch(`${API_URL}/expenses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.insertedId) {
        setFormData({ title: "", amount: "", category: "Food", date: "" });
        onAddSuccess();
      }

      // Inside handleSubmit of ExpenseForm.tsx
      if (data.insertedId) {
        setFormData({ title: "", amount: "", category: "Food", date: "" });
        onAddSuccess();

        // Navbar ko batane ke liye event fire karein
        window.dispatchEvent(new Event("expenseAdded"));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full">
      <h2 className="text-lg font-semibold mb-4">Add Expense Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            required
            name="title"
            value={formData.title}
            onChange={handleChange}
            type="text"
            className="w-full border rounded p-2 mt-1"
            placeholder="Groceries"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            required
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            type="number"
            step="0.01"
            className="w-full border rounded p-2 mt-1"
            placeholder="85.50"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded p-2 mt-1"
          >
            <option>Food</option>
            <option>Transport</option>
            <option>Shopping</option>
            <option>Others</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            required
            name="date"
            value={formData.date}
            onChange={handleChange}
            type="date"
            className="w-full border rounded p-2 mt-1"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-2 rounded font-medium hover:bg-emerald-700 transition"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;

"use client";
import React, { useState } from 'react';

interface Expense {
  _id: string;
  title: string;
  amount: number | string;
  category: string;
  date: string;
}

interface EditModalProps {
  item: Expense;
  onClose: () => void;
  onUpdate: (updatedData: Expense) => void;
}

const EditModal: React.FC<EditModalProps> = ({ item, onClose, onUpdate }) => {
  const [formData, setFormData] = useState<Expense>(item);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save karte waqt ensure karein ki amount number ho
    onUpdate({ ...formData, amount: parseFloat(formData.amount as string) });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Edit Expense</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            required
            className="w-full border p-2 rounded" 
            value={formData.title} 
            onChange={(e) => setFormData({...formData, title: e.target.value})} 
            placeholder="Title" 
          />
          {/* Amount field updated */}
          <input 
            required
            type="number"
            step="0.01"
            className="w-full border p-2 rounded" 
            value={formData.amount} 
            onChange={(e) => setFormData({...formData, amount: e.target.value})} 
            placeholder="Amount" 
          />
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
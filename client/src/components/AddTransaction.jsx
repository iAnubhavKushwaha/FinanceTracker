// client/src/components/AddTransaction.jsx

import { useState } from "react";
import axios from "axios";

const AddTransaction = ({ transactionType, categories, onAdded }) => {
  const [form, setForm] = useState({
    type: transactionType,
    category: '',
    amount: '',
    date: '',
    notes: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      await axios.post("http://localhost:5000/api/transactions", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      onAdded(); // callback
      setForm({ type: transactionType, category: '', amount: '', date: '', notes: '' });
    } catch (error) {
      console.error("Add Transaction Error:", error);
      alert(error.response?.data?.message || "Failed to add transaction");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <textarea
        name="notes"
        placeholder="Notes"
        value={form.notes}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full">
        Add {transactionType === "income" ? "Income" : "Expense"}
      </button>
    </form>
  );
};

export default AddTransaction;

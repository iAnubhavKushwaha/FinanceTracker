import { useEffect, useState } from "react";
import axios from "axios";
import TransactionList from "../components/TransactionList";
import AddTransaction from "../components/AddTransaction";

const ExpensePage = () => {
  const [transactions, setTransactions] = useState([]);

  const fetchExpenses = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;
      const res = await axios.get("http://localhost:5000/api/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const expensesOnly = res.data.filter((t) => t.type === "expense");
      setTransactions(expensesOnly);
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;
      await axios.delete(`https://financetracker-rmg9.onrender.com/api/transactions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchExpenses();
    } catch (error) {
      console.error("Failed to delete expense", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const expenseCategories = [
    "Food",
    "Rent",
    "Travel",
    "Utilities",
    "Health",
    "Others",
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-blue-600">
          Add new Expenses
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
              Add Expense
            </h3>
            <AddTransaction
              transactionType="expense"
              categories={expenseCategories}
              onAdded={fetchExpenses}
            />
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg max-h-[500px] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
              Your Expenses
            </h3>
            <TransactionList
              transactions={transactions}
              onDelete={handleDelete}
              showTypeFilter={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpensePage;

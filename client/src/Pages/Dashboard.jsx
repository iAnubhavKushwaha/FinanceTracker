import { Link } from "react-router-dom";
import TransactionList from "../components/TransactionList";
import IncomeChart from "../components/IncomeChart";
import ExpenseChart from "../components/ExpenseChart";
import StatsCard from "../components/StatsCard";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const username = storedUser?.username;

  const fetchTransactions = useCallback(async () => {
    try {
      const token = storedUser?.token;
      const res = await axios.get("https://financetracker-rmg9.onrender.com/api/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(res.data);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  }, [storedUser?.token]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleDelete = async (id) => {
    try {
      const token = storedUser?.token;
      await axios.delete(`https://financetracker-rmg9.onrender.com/api/transactions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTransactions();
    } catch (error) {
      console.error("Failed to delete transaction", error);
    }
  };

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + Number(t.amount), 0);
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + Number(t.amount), 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="min-h-screen bg-blue-50 p-4 sm:p-6 overflow-x-hidden">
      <div className="max-w-screen-xl mx-auto w-full">
        {/* Welcome Message */}
        <section className="bg-white shadow-md rounded-xl px-6 py-5 mb-6">
          <h1 className="text-2xl font-semibold text-blue-700">
            Welcome back{username ? `, ${username}` : ""}! 🎉
          </h1>
          <p className="text-gray-600 mt-1">
            Hope you're having a productive day!
          </p>
        </section>

        {/* Stats and Recent Transactions container */}
        <section className="flex flex-col md:flex-row gap-6 mb-10">
          {/* Stats Cards Box */}
          <div className="bg-white shadow-md rounded-xl p-6 flex-1 flex flex-col gap-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 mt-2 border-b pb-4">Summary</h2>
            <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-10 mb-10">
              <StatsCard
                label="Total Income"
                value={totalIncome}
                color="bg-gradient-to-r from-green-400 to-green-600"
                className="w-full"
              />
              <StatsCard
                label="Total Expense"
                value={totalExpense}
                color="bg-gradient-to-r from-red-400 to-red-600"
                className="w-full"
              />
              <StatsCard
                label="Balance"
                value={balance}
                color="bg-gradient-to-r from-blue-400 to-blue-600"
                className="w-full"
              />
            </div>
          </div>

          {/* Transactions Box */}
          <div className="bg-white shadow-md rounded-xl p-6 flex-1 flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-4 mb-4 gap-2">
              <h3 className="text-xl font-semibold text-gray-800">
                Transactions
              </h3>
              <div className="flex gap-2">
                <Link
                  to="/income"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Income
                </Link>
                <Link
                  to="/expenses"
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Expenses
                </Link>
              </div>
            </div>
            <TransactionList
              transactions={[...transactions].reverse()} // newest first
              onDelete={handleDelete}
              itemsPerPage={4}
            />
          </div>
        </section>

        {/* Charts Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Expense Chart */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <ExpenseChart transactions={transactions} />
          </div>

          {/* Income Chart */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <IncomeChart transactions={transactions} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;

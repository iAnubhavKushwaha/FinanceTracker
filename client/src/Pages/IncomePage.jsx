import { useEffect, useState } from "react";
import axios from "axios";
import TransactionList from "../components/TransactionList";
import AddTransaction from "../components/AddTransaction";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const IncomePage = () => {
  const [transactions, setTransactions] = useState([]);

  const fetchIncomes = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;
      const res = await axios.get("http://localhost:5000/api/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const incomeOnly = res.data.filter((t) => t.type === "income");
      setTransactions(incomeOnly);
    } catch (error) {
      console.error("Failed to fetch incomes:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;
      await axios.delete(`http://localhost:5000/api/transactions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchIncomes();
    } catch (error) {
      console.error("Failed to delete income", error);
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  const incomeCategories = ["Salary", "Freelance", "Bonus", "Investment", "Gift"];

  const getIncomeOverTime = (transactions) => {
    const dateMap = {};
    transactions.forEach((t) => {
      const date = new Date(t.date).toISOString().split("T")[0];
      if (dateMap[date]) {
        dateMap[date] += t.amount;
      } else {
        dateMap[date] = t.amount;
      }
    });
    return Object.entries(dateMap).map(([date, amount]) => ({ date, amount }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-10">
        <h2 className="text-3xl font-bold text-blue-600">
          Add new Income
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add Income Form */}
          <div className="bg-white p-6 rounded-2xl shadow-md border">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              Add New Income
            </h3>
            <AddTransaction
              transactionType="income"
              categories={incomeCategories}
              onAdded={fetchIncomes}
            />
          </div>

          {/* Income List */}
          <div className="bg-white p-6 rounded-2xl shadow-md border overflow-y-auto max-h-[500px]">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              Your Income History
            </h3>
            <TransactionList
              transactions={transactions}
              onDelete={handleDelete}
              showTypeFilter={false} // Filter removed
            />
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white p-6 rounded-2xl shadow-md border">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Income Over Time
          </h3>
          {transactions.length === 0 ? (
            <p className="text-gray-500">No income data to display.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={getIncomeOverTime(transactions)}>
                <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default IncomePage;

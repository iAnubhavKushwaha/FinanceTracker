import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const IncomeChart = ({ transactions }) => {
  const monthlyData = transactions.reduce((acc, t) => {
    const dateObj = new Date(t.date);
    const month = dateObj.toLocaleString("default", { month: "short" });

    let record = acc.find((item) => item.month === month);
    if (!record) {
      record = { month, income: 0, expense: 0 };
      acc.push(record);
    }

    if (t.type === "income") {
      record.income += Number(t.amount);
    } else if (t.type === "expense") {
      record.expense += Number(t.amount);
    }

    return acc;
  }, []);

  // Optional: Sort months if not in order
  const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  monthlyData.sort((a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month));

  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-4 text-center">
        Monthly Income vs Expenses
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={monthlyData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#22c55e"
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Income"
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#ef4444"
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Expense"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeChart;

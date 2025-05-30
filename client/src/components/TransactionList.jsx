import { useState, useMemo } from "react";

const TransactionList = ({
  transactions,
  onDelete,
  showTypeFilter = true,
  itemsPerPage = 5,
}) => {
  const [filters, setFilters] = useState({
    type: "",
    category: "",
    date: "",
  });

  const [currentPage, setCurrentPage] = useState(1);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en-GB").format(new Date(date));

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchesType = showTypeFilter
        ? filters.type
          ? t.type === filters.type
          : true
        : true;

      const matchesCategory = filters.category
        ? t.category.toLowerCase().includes(filters.category.toLowerCase())
        : true;

      const matchesDate = filters.date ? t.date.startsWith(filters.date) : true;

      return matchesType && matchesCategory && matchesDate;
    });
  }, [transactions, filters, showTypeFilter]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  return (
    <div className="max-w-2xl mx-auto mt-6">
      {/* Filter Controls */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {showTypeFilter && (
          <select
            value={filters.type}
            onChange={(e) => {
              setFilters({ ...filters, type: e.target.value });
              setCurrentPage(1); // reset page on filter change
            }}
            className="p-2 border border-blue-300 rounded text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        )}

        <input
          type="text"
          placeholder="Search by Category"
          value={filters.category}
          onChange={(e) => {
            setFilters({ ...filters, category: e.target.value });
            setCurrentPage(1);
          }}
          className="p-2 border border-blue-300 rounded text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="date"
          value={filters.date}
          onChange={(e) => {
            setFilters({ ...filters, date: e.target.value });
            setCurrentPage(1);
          }}
          className="p-2 border border-blue-300 rounded text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Transaction List */}
      {paginatedTransactions.length > 0 ? (
        paginatedTransactions.map((t) => (
          <div
            key={t._id}
            className="p-4 mb-3 border border-blue-100 rounded-lg bg-blue-50 hover:bg-blue-100 transition flex justify-between items-center shadow-sm"
          >
            <div>
              <span className="inline-block bg-blue-200 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                {t.category}
              </span>
              <div className="text-blue-700 font-semibold text-lg mt-1">
                {formatCurrency(t.amount)}
              </div>
              <div className="text-gray-600 text-sm">{formatDate(t.date)}</div>
              {t.notes && (
                <div className="text-gray-700 italic mt-1 max-w-xs truncate">
                  {t.notes}
                </div>
              )}
            </div>

            <button
              onClick={() => onDelete(t._id)}
              className="ml-4 text-red-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 rounded p-2 cursor-pointer"
              aria-label="Delete transaction"
              title="Delete transaction"
            >
              🗑️
            </button>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 mt-4">
          No transactions match your filters.
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-blue-500 text-white disabled:bg-gray-300"
          >
            Prev
          </button>
          {[...Array(totalPages).keys()].map((num) => {
            const pageNum = num + 1;
            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-3 py-1 rounded ${
                  currentPage === pageNum
                    ? "bg-blue-700 text-white"
                    : "bg-blue-300 text-blue-900"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-blue-500 text-white disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionList;

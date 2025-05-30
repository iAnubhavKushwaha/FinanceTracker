import Transaction from "../Models/Transaction.js";

//ADD Transaction;

export const addTransaction = async (req, res) => {
  try {
    const { type, category, amount, date, notes } = req.body;

    console.log('Request body:', req.body);
    console.log('Authenticated user:', req.user);

    if (!type || !category || !amount || !date) {
      return res
        .status(400)
        .json({ message: "Please provide all the fields required" });
    }
    const transaction = new Transaction({
      user: req.user._id, // from auth middleware
      type,
      category,
      amount: Number(amount),
      date,
      notes,
    });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET transaction by user

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id }).sort({
      date: -1});
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE transaction by Id

export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction)
      return res.status(404).json({ message: "Transaction not found" });

    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Transaction.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Transaction deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

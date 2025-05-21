import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  getAccounts,
  deposit,
  withdraw,
  getAccountTransactions,
} from "../services/api";

export default function CustomerPanel() {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState(null); // For form actions
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [action, setAction] = useState("deposit");
  const [transactions, setTransactions] = useState([]);
  const [msg, setMsg] = useState("");

  // Fetch accounts and transactions on mount
  useEffect(() => {
    getAccounts().then((res) => {
      const accountsData = res.data;
      setAccounts(accountsData);
      // Set default account for form actions (first account)
      if (accountsData.length > 0) {
        setSelectedAccountId(accountsData[0].id);
        // Fetch transactions for all accounts
        Promise.all(
          accountsData.map((acc) => getAccountTransactions(acc.id))
        ).then((results) => {
          const allTransactions = results
            .flatMap((res, index) =>
              res.data.map((tx) => ({
                ...tx,
                account_number: accountsData[index].account_number,
                balance: accountsData[index].balance, // Add balance for display
              }))
            )
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Sort by date, newest first
          setTransactions(allTransactions);
        });
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAccountId) return;
    try {
      const fn = action === "deposit" ? deposit : withdraw;
      const res = await fn(selectedAccountId, { amount, description: desc });
      setMsg(res.data.message);

      // Refresh accounts and transactions
      getAccounts().then((res) => {
        const accountsData = res.data;
        setAccounts(accountsData);
        Promise.all(
          accountsData.map((acc) => getAccountTransactions(acc.id))
        ).then((results) => {
          const allTransactions = results
            .flatMap((res, index) =>
              res.data.map((tx) => ({
                ...tx,
                account_number: accountsData[index].account_number,
                balance: accountsData[index].balance,
              }))
            )
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          setTransactions(allTransactions);
        });
      });
      setAmount("");
      setDesc("");
    } catch (err) {
      setMsg(err.response?.data?.message || "Operation failed");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-800 to-indigo-900 p-6 flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30v4h2v-4h4v-2h-4V0h-2v2h-4v2h4zM6 34v4h4v-4h2v-4h-2v-4H6v4H2v2h4zm0-30v4h-4v2h4v4h2V6h4V4H6V0H4v4H0v2h4z' fill='%23ffffff' fill-opacity='0.05'/%3E%3C/g%3E%3C/svg%3E")`,
      }}
    >
      <motion.div
        className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 relative z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center tracking-tight">
          Dashboard
        </h2>

        {accounts.length === 0 ? (
          <p className="text-gray-500 text-sm text-center mb-6">No accounts found.</p>
        ) : (
          <motion.div
            className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {accounts.map((acc) => (
              <motion.div
                key={acc.id}
                className="p-4 rounded-xl bg-gray-100 border border-gray-200 hover:bg-blue-50 transition-all duration-200"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <div className="font-mono text-sm text-gray-600">
                  Current Balance
                </div>
                <div className="text-2xl font-bold text-gray-900 mt-1">
                  ₹{acc.balance.toLocaleString()}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
          Manage Your Accounts
        </h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Action
            </label>
            <select
              value={action}
              onChange={(e) => setAction(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
            >
              <option value="deposit">Deposit</option>
              <option value="withdraw">Withdraw</option>
            </select>
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              required
            />
          </div>
          <div className="col-span-1 sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Add a description (optional)"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
            />
          </div>
          <div className="col-span-1 sm:col-span-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md"
              disabled={!selectedAccountId}
            >
              {action === "deposit" ? "Deposit Funds" : "Withdraw Funds"}
            </motion.button>
          </div>
        </form>

        {msg && (
          <motion.div
            className={`p-3 rounded-lg text-sm font-medium ${
              msg.includes("failed") ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
            } mb-8`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {msg}
          </motion.div>
        )}

        <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
          Recent Transactions
        </h3>
        <div className="max-h-80 overflow-y-auto bg-gray-100 rounded-xl p-4 border border-gray-200">
          {transactions.length === 0 ? (
            <p className="text-gray-500 text-sm text-center">No transactions yet.</p>
          ) : (
            <motion.ul
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {transactions.map((tx) => (
                <motion.li
                  key={tx.id}
                  className="border-b border-gray-200 pb-4 last:border-b-0"
                  variants={itemVariants}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span
                        className={`font-semibold capitalize ${
                          tx.type === "deposit" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {tx.type}
                      </span>
                      <p className="text-gray-600 text-sm mt-1">
                        {tx.description || "No description"}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-900 font-semibold">
                        ₹{tx.amount.toLocaleString()}
                      </span>
                      <p className="text-gray-500 text-xs mt-1">
                        Balance: ₹{tx.balance.toLocaleString()}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {new Date(tx.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </div>
      </motion.div>
    </div>
  );
}
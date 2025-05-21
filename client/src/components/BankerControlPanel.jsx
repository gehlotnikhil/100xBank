import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getAllAccounts,
  getBankerAccountTransactions,
} from "../services/api";

export default function BankerControlPanel() {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isTransactionHistoryOpen, setIsTransactionHistoryOpen] = useState(true);

  useEffect(() => {
    getAllAccounts().then((res) => {
      const accountsData = res.data;
      setAccounts(accountsData);
      if (accountsData.length > 0) {
        setSelectedAccountId(accountsData[0].id);
        getBankerAccountTransactions(accountsData[0].id).then((res) =>
          setTransactions(res.data)
        );
      }
    });
  }, []);

  // Handle account selection
  const handleSelect = (accountId) => {
    setSelectedAccountId(accountId);
    getBankerAccountTransactions(accountId).then((res) =>
      setTransactions(res.data)
    );
  };

  // Filter accounts based on search query
  const filteredAccounts = accounts.filter(
    (acc) =>
      acc.account_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-900 to-teal-900 p-6 flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30v4h2v-4h4v-2h-4V0h-2v2h-4v2h4zM6 34v4h4v-4h2v-4h-2v-4H6v4H2v2h4zm0-30v4h-4v2h4v4h2V6h4V4H6V0H4v4H0v2h4z' fill='%23ffffff' fill-opacity='0.05'/%3E%3C/g%3E%3C/svg%3E")`,
      }}
    >
      <motion.div
        className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl p-8 relative z-10"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center tracking-tight">
          Banker Control Panel
        </h2>

        <div className="relative mb-8">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search accounts by number, name, or username..."
            className="w-full px-5 py-4 rounded-lg bg-gray-100 border border-gray-200 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-300 pl-12"
          />
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
            Accounts Overview
          </h3>
          {filteredAccounts.length === 0 ? (
            <p className="text-gray-500 text-sm text-center">No accounts match your search.</p>
          ) : (
            <div className="flex flex-wrap gap-2 justify-center">
              {filteredAccounts.map((acc) => (
                <motion.button
                  key={acc.id}
                  onClick={() => handleSelect(acc.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition duration-200 ${
                    selectedAccountId === acc.id
                      ? "bg-teal-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-teal-100"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  #{acc.account_number} - {acc.full_name}
                </motion.button>
              ))}
            </div>
          )}
        </div>

        {selectedAccountId && (
          <>
            {(() => {
              const selectedAccount = accounts.find((acc) => acc.id === selectedAccountId);
              return selectedAccount ? (
                <motion.div
                  className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-6 mb-8 border border-gray-100"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-lg font-semibold text-gray-900">
                        {selectedAccount.full_name}
                      </p>
                      <p className="text-sm text-gray-600">@{selectedAccount.username}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Account #{selectedAccount.account_number}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">
                        ₹{selectedAccount.balance.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">Current Balance</p>
                    </div>
                  </div>
                </motion.div>
              ) : null;
            })()}

            <div>
              <motion.div
                className="flex justify-between items-center mb-4"
                whileHover={{ scale: 1.01 }}
              >
                <h3 className="text-xl font-semibold text-gray-900">
                  Transaction History
                </h3>
                <motion.button
                  onClick={() => setIsTransactionHistoryOpen(!isTransactionHistoryOpen)}
                  className="text-teal-600 hover:text-teal-700 text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isTransactionHistoryOpen ? "Hide" : "Show"}
                </motion.button>
              </motion.div>
              <AnimatePresence>
                {isTransactionHistoryOpen && (
                  <motion.div
                    className="max-h-96 overflow-y-auto bg-gray-100 rounded-xl p-4 border border-gray-200"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
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
                                  Balance: ₹{tx.balance_after.toLocaleString()}
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
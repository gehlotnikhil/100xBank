const Account = require('../models/account');
const Transaction = require('../models/transaction');
const User = require('../models/user');

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await User.getAllCustomers();
    res.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ message: 'Server error fetching customers' });
  }
};

exports.getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.getAllWithUserInfo();
    res.json(accounts);
  } catch (error) {
    console.error('Error fetching accounts:', error);
    res.status(500).json({ message: 'Server error fetching accounts' });
  }
};

exports.getCustomerTransactions = async (req, res) => {
  try {
    const { accountId } = req.params;
    const transactions = await Transaction.findByAccountId(accountId);
    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Server error fetching transactions' });
  }
};
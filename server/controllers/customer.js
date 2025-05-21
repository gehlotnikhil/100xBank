const Account = require('../models/account');
const Transaction = require('../models/transaction');

exports.getAccounts = async (req, res) => {
  try {
    const accounts = await Account.findByUserId(req.user.id);
    res.json(accounts);
  } catch (error) {
    console.error('Error fetching accounts:', error);
    res.status(500).json({ message: 'Server error fetching accounts' });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const { accountId } = req.params;
    
    // Verify account belongs to user
    const accounts = await Account.findByUserId(req.user.id);
    const userAccount = accounts.find(account => account.id == accountId);
    
    if (!userAccount) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const transactions = await Transaction.findByAccountId(accountId);
    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Server error fetching transactions' });
  }
};

exports.deposit = async (req, res) => {
  try {
    const { accountId } = req.params;
    const { amount, description } = req.body;
    
    if (amount <= 0) {
      return res.status(400).json({ message: 'Amount must be positive' });
    }

    // Verify account belongs to user
    const accounts = await Account.findByUserId(req.user.id);
    const userAccount = accounts.find(account => account.id == accountId);
    
    if (!userAccount) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Get current balance
    const currentBalance = await Account.getBalance(accountId);
    const newBalance = parseFloat(currentBalance) + parseFloat(amount);

    // Update balance
    await Account.updateBalance(accountId, newBalance);

    // Record transaction
    await Transaction.create({
      account_id: accountId,
      type: 'deposit',
      amount,
      balance_after: newBalance,
      description: description || 'Deposit'
    });

    res.json({ message: 'Deposit successful', balance: newBalance });
  } catch (error) {
    console.error('Error processing deposit:', error);
    res.status(500).json({ message: 'Server error processing deposit' });
  }
};

exports.withdraw = async (req, res) => {
  try {
    const { accountId } = req.params;
    const { amount, description } = req.body;
    
    if (amount <= 0) {
      return res.status(400).json({ message: 'Amount must be positive' });
    }

    // Verify account belongs to user
    const accounts = await Account.findByUserId(req.user.id);
    const userAccount = accounts.find(account => account.id == accountId);
    
    if (!userAccount) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Get current balance
    const currentBalance = await Account.getBalance(accountId);
    
    // Check if sufficient funds
    if (parseFloat(currentBalance) < parseFloat(amount)) {
      return res.status(400).json({ message: 'Insufficient funds' });
    }
    
    const newBalance = parseFloat(currentBalance) - parseFloat(amount);

    // Update balance
    await Account.updateBalance(accountId, newBalance);

    // Record transaction
    await Transaction.create({
      account_id: accountId,
      type: 'withdrawal',
      amount,
      balance_after: newBalance,
      description: description || 'Withdrawal'
    });

    res.json({ message: 'Withdrawal successful', balance: newBalance });
  } catch (error) {
    console.error('Error processing withdrawal:', error);
    res.status(500).json({ message: 'Server error processing withdrawal' });
  }
};
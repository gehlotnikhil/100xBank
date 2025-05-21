const db = require('../config/db');

class Transaction {
  static async create(data) {
    const { account_id, type, amount, balance_after, description } = data;

    const [result] = await db.query(
      'INSERT INTO Transactions (account_id, type, amount, balance_after, description) VALUES (?, ?, ?, ?, ?)',
      [account_id, type, amount, balance_after, description]
    );

    return result.insertId;
  }

  static async findByAccountId(accountId) {
    const [rows] = await db.query(
      'SELECT * FROM Transactions WHERE account_id = ? ORDER BY created_at DESC',
      [accountId]
    );
    return rows;
  }
}

module.exports = Transaction;
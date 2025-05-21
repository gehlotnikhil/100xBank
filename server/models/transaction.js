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
  static async findByDateRange(accountId, startDate, endDate) {
    const [rows] = await db.query(
      'SELECT * FROM Transactions WHERE account_id = ? AND created_at BETWEEN ? AND ? ORDER BY created_at DESC',
      [accountId, startDate, endDate]
    );
    return rows;
  }

  static async getTotalByAccountId(accountId) {
    const [rows] = await db.query(
      `SELECT 
         SUM(CASE WHEN type = 'deposit' THEN amount ELSE 0 END) AS total_deposit,
         SUM(CASE WHEN type = 'withdrawal' THEN amount ELSE 0 END) AS total_withdrawal
       FROM Transactions
       WHERE account_id = ?`,
      [accountId]
    );
    return rows[0];
  }
  static async findByAccountId(accountId) {
    const [rows] = await db.query(
      'SELECT * FROM Transactions WHERE account_id = ? ORDER BY created_at DESC',
      [accountId]
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query(
      'SELECT * FROM Transactions WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  static async deleteById(id) {
    const [result] = await db.query(
      'DELETE FROM Transactions WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }

  static async findByType(accountId, type) {
    const [rows] = await db.query(
      'SELECT * FROM Transactions WHERE account_id = ? AND type = ? ORDER BY created_at DESC',
      [accountId, type]
    );
    return rows;
  }


}

module.exports = Transaction;

const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

class Account {
  static async create(userId) {
    const accountNumber = `ACCT-${Date.now().toString().slice(-10)}`;

    const [result] = await db.query(
      "INSERT INTO Accounts (user_id, account_number) VALUES (?, ?)",
      [userId, accountNumber]
    );

    return result.insertId;
  }
  static async accountExists(userId) {
    const [rows] = await db.query(
      "SELECT COUNT(*) as count FROM Accounts WHERE user_id = ?",
      [userId]
    );
    return rows[0].count > 0;
  }

  static async updateAccountNumber(id, newNumber) {
    await db.query("UPDATE Accounts SET account_number = ? WHERE id = ?", [
      newNumber,
      id,
    ]);
    return true;
  }

  static async getTotalAccounts() {
    const [rows] = await db.query("SELECT COUNT(*) as total FROM Accounts");
    return rows[0].total;
  }

  static async getAccountsByBalanceRange(min, max) {
    const [rows] = await db.query(
      "SELECT * FROM Accounts WHERE balance BETWEEN ? AND ?",
      [min, max]
    );
    return rows;
  }
  static async findByUserId(userId) {
    const [rows] = await db.query("SELECT * FROM Accounts WHERE user_id = ?", [
      userId,
    ]);
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query("SELECT * FROM Accounts WHERE id = ?", [id]);
    return rows.length ? rows[0] : null;
  }

  static async getBalance(accountId) {
    const [rows] = await db.query("SELECT balance FROM Accounts WHERE id = ?", [
      accountId,
    ]);
    return rows.length ? rows[0].balance : 0;
  }

  static async updateBalance(accountId, newBalance) {
    await db.query("UPDATE Accounts SET balance = ? WHERE id = ?", [
      newBalance,
      accountId,
    ]);
    return true;
  }

  static async getAllWithUserInfo() {
    const [rows] = await db.query(`
      SELECT a.*, u.username, u.full_name, u.email
      FROM Accounts a
      JOIN Users u ON a.user_id = u.id
      WHERE u.role = 'customer'
    `);
    return rows;
  }

  static async deleteById(id) {
    const [result] = await db.query("DELETE FROM Accounts WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }

  static async findByAccountNumber(accountNumber) {
    const [rows] = await db.query(
      "SELECT * FROM Accounts WHERE account_number = ?",
      [accountNumber]
    );
    return rows.length ? rows[0] : null;
  }
}

module.exports = Account;

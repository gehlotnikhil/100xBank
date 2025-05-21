const db = require('../config/db');
const bcrypt = require('bcrypt');

class User {
  static async findByUsername(username) {
    const [rows] = await db.query('SELECT * FROM Users WHERE username = ?', [username]);
    return rows.length ? rows[0] : null;
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM Users WHERE id = ?', [id]);
    return rows.length ? rows[0] : null;
  }

  static async create(userData) {
    const { username, email, password, full_name, role } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      'INSERT INTO Users (username, email, password, full_name, role) VALUES (?, ?, ?, ?, ?)',
      [username, email, hashedPassword, full_name, role]
    );

    return result.insertId;
  }

  static async getAllCustomers() {
    const [rows] = await db.query('SELECT id, username, email, full_name, created_at FROM Users WHERE role = "customer"');
    return rows;
  }
}

module.exports = User;
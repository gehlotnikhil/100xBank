const db = require('../config/db');
const bcrypt = require('bcrypt');

class User {
  static async findByUsername(username) {
    const [rows] = await db.query('SELECT * FROM Users WHERE username = ?', [username]);
    return rows.length ? rows[0] : null;
  }
  static async getAll() {
    const [rows] = await db.query('SELECT id, username, email, full_name, role, created_at FROM Users');
    return rows;
  }

  static async searchByNameOrEmail(query) {
    const likeQuery = `%${query}%`;
    const [rows] = await db.query(
      'SELECT id, username, email, full_name FROM Users WHERE full_name LIKE ? OR email LIKE ?',
      [likeQuery, likeQuery]
    );
    return rows;
  }

  static async getUserCountByRole() {
    const [rows] = await db.query(
      'SELECT role, COUNT(*) AS count FROM Users GROUP BY role'
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM Users WHERE id = ?', [id]);
    return rows.length ? rows[0] : null;
  }

  static async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM Users WHERE email = ?', [email]);
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

  static async updateUser(id, updatedData) {
    const fields = [];
    const values = [];

    for (const key in updatedData) {
      fields.push(`${key} = ?`);
      values.push(updatedData[key]);
    }

    values.push(id);

    await db.query(`UPDATE Users SET ${fields.join(', ')} WHERE id = ?`, values);
    return true;
  }

  static async deleteById(id) {
    const [result] = await db.query('DELETE FROM Users WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  static async changePassword(id, newPassword) {
    const hashed = await bcrypt.hash(newPassword, 10);
    await db.query('UPDATE Users SET password = ? WHERE id = ?', [hashed, id]);
    return true;
  }

  static async getAllCustomers() {
    const [rows] = await db.query('SELECT id, username, email, full_name, created_at FROM Users WHERE role = "customer"');
    return rows;
  }

}

module.exports = User;

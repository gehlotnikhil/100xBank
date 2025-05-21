const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

class Token {
  static async create(userId) {
    try {
      console.log(`Creating token for userId: ${userId}`);
      
      if (!userId) {
        console.error('Invalid userId provided for token creation');
        throw new Error('User ID is required to create a token');
      }

      const token = uuidv4();
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 1); // 1-day expiration

      console.log(`Generated token: ${token}, expires at: ${expiresAt}`);

      const [result] = await db.query(
        'INSERT INTO Authenticationkey (user_id, token, expires_at) VALUES (?, ?, ?)',
        [userId, token, expiresAt]
      );

      if (!result.affectedRows) {
        console.error('Failed to insert token into database');
        throw new Error('Failed to create token in database');
      }

      console.log('Token created successfully');
      return token;
    } catch (error) {
      console.error('Error creating token:', {
        error: error.message,
        stack: error.stack,
        userId
      });
      throw error;
    }
  }

  static async verify(token) {
    try {
      console.log(`Verifying token: ${token}`);

      if (!token) {
        console.error('No token provided for verification');
        throw new Error('Token is required for verification');
      }

      const [rows] = await db.query(
        'SELECT * FROM Authenticationkey WHERE token = ? AND expires_at > NOW()',
        [token]
      );

      console.log(`Verification result - rows found: ${rows.length}`);
      if (!rows.length) {
        console.log('Token not found or expired');
        return null;
      }

      return rows[0];
    } catch (error) {
      console.error('Error verifying token:', {
        error: error.message,
        stack: error.stack,
        token
      });
      throw error;
    }
  }

  static async getUserByToken(token) {
    try {
      console.log(`Fetching user by token: ${token}`);

      if (!token) {
        console.error('No token provided for user lookup');
        throw new Error('Token is required to fetch user');
      }

      const [rows] = await db.query(
        `SELECT u.* FROM Users u
         JOIN Authenticationkey t ON u.id = t.user_id
         WHERE t.token = ? AND t.expires_at > NOW()`,
        [token]
      );

      console.log(`User lookup result - rows found: ${rows.length}`);
      if (!rows.length) {
        console.log('No user found for token or token expired');
        return null;
      }

      return rows[0];
    } catch (error) {
      console.error('Error getting user by token:', {
        error: error.message,
        stack: error.stack,
        token
      });
      throw error;
    }
  }

  static async delete(token) {
    try {
      console.log(`Deleting token: ${token}`);

      if (!token) {
        console.error('No token provided for deletion');
        throw new Error('Token is required for deletion');
      }

      const [result] = await db.query(
        'DELETE FROM Authenticationkey WHERE token = ?',
        [token]
      );

      console.log(`Deletion result - affected rows: ${result.affectedRows}`);
      if (!result.affectedRows) {
        console.log('Token not found for deletion');
        return false;
      }

      console.log('Token deleted successfully');
      return true;
    } catch (error) {
      console.error('Error deleting token:', {
        error: error.message,
        stack: error.stack,
        token
      });
      throw error;
    }
  }

  static async deleteByUserId(userId) {
    try {
      console.log(`Deleting all tokens for userId: ${userId}`);

      if (!userId) {
        console.error('No userId provided for token deletion');
        throw new Error('User ID is required to delete tokens');
      }

      const [result] = await db.query(
        'DELETE FROM Authenticationkey WHERE user_id = ?',
        [userId]
      );

      console.log(`Deleted tokens for userId ${userId} - affected rows: ${result.affectedRows}`);
      return result.affectedRows;
    } catch (error) {
      console.error('Error deleting tokens by userId:', {
        error: error.message,
        stack: error.stack,
        userId
      });
      throw error;
    }
  }

  static async getAllTokensByUserId(userId) {
    try {
      console.log(`Fetching all tokens for userId: ${userId}`);

      if (!userId) {
        console.error('No userId provided for token retrieval');
        throw new Error('User ID is required to fetch tokens');
      }

      const [rows] = await db.query(
        'SELECT * FROM Authenticationkey WHERE user_id = ?',
        [userId]
      );

      console.log(`Found ${rows.length} tokens for userId ${userId}`);
      return rows;
    } catch (error) {
      console.error('Error fetching tokens by userId:', {
        error: error.message,
        stack: error.stack,
        userId
      });
      throw error;
    }
  }

  static async cleanupExpiredTokens() {
    try {
      console.log('Starting cleanup of expired tokens');

      const [result] = await db.query(
        'DELETE FROM Authenticationkey WHERE expires_at <= NOW()'
      );

      console.log(`Cleanup completed - deleted ${result.affectedRows} expired tokens`);
      return result.affectedRows;
    } catch (error) {
      console.error('Error cleaning up expired tokens:', {
        error: error.message,
        stack: error.stack
      });
      throw error;
    }
  }

  static async extendTokenExpiration(token, days = 1) {
    try {
      console.log(`Extending expiration for token: ${token}`);

      if (!token) {
        console.error('No token provided for expiration extension');
        throw new Error('Token is required to extend expiration');
      }

      const newExpiresAt = new Date();
      newExpiresAt.setDate(newExpiresAt.getDate() + days);

      const [result] = await db.query(
        'UPDATE Authenticationkey SET expires_at = ? WHERE token = ? AND expires_at > NOW()',
        [newExpiresAt, token]
      );

      console.log(`Extension result - affected rows: ${result.affectedRows}`);
      if (!result.affectedRows) {
        console.log('Token not found or already expired');
        return false;
      }

      console.log(`Token expiration extended to: ${newExpiresAt}`);
      return true;
    } catch (error) {
      console.error('Error extending token expiration:', {
        error: error.message,
        stack: error.stack,
        token
      });
      throw error;
    }
  }
}

module.exports = Token;
CREATE DATABASE IF NOT EXISTS Bank;
USE Bank;

CREATE TABLE IF NOT EXISTS Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(100),
  role ENUM('customer','banker') DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Accounts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  account_number VARCHAR(50) NOT NULL UNIQUE,
  balance DECIMAL(15, 2) DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS Transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type ENUM('deposit', 'withdrawal') NOT NULL,
  balance_after DECIMAL(15, 2) NOT NULL,
  description VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  amount DECIMAL(15, 2) NOT NULL,
  account_id INT NOT NULL,
  FOREIGN KEY (account_id) REFERENCES Accounts(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Authenticationkey (
  id INT AUTO_INCREMENT PRIMARY KEY,
  token VARCHAR(255) NOT NULL UNIQUE,
  expires_at DATETIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);
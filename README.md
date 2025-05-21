# 💳 100xBank – Modern Banking System

[🌐 Live Demo](https://bank.100xstack.me) • [📁 GitHub Repository](https://github.com/gehlotnikhil/100xBank)

---

## 📌 Overview

**100xBank** is a full-stack banking system that supports:

- ✅ User authentication (JWT-based)
- 🔐 Role-based access (`customer` and `banker`)
- 🏦 Account creation and management
- 💸 Deposit and withdrawal transactions
- 📊 Real-time balance tracking

---



## 🛠 Tech Stack

| Tech        | Description                          |
|-------------|--------------------------------------|
| React       | Frontend library for UI              |
| Node.js     | Runtime environment for backend      |
| Express.js  | Backend web application framework    |
| MySQL       | Relational database                  |
| TailwindCSS | Utility-first CSS framework          |
| Vercel      | Hosting platform for frontend  and backend      |
---

## 🗃️ Database Schema

The system uses a MySQL-compatible relational database with the following schema:

### `Users` Table

| Column Name | Data Type     | Constraints                        | Description                         |
|-------------|---------------|------------------------------------|-------------------------------------|
| id          | INT           | PRIMARY KEY, AUTO_INCREMENT        | Unique user ID                      |
| username    | VARCHAR(50)   | NOT NULL, UNIQUE                   | Unique username                     |
| email       | VARCHAR(100)  | NOT NULL, UNIQUE                   | Unique email address                |
| password    | VARCHAR(255)  | NOT NULL                           | Hashed password                     |
| full_name   | VARCHAR(100)  |                                    | Full name of the user               |
| role        | ENUM          | DEFAULT 'customer'                 | Role: 'customer' or 'banker'        |
| created_at  | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP          | Account creation timestamp          |


### `Accounts` Table
| Column Name     | Data Type     | Constraints                     | Description                     |
|------------------|---------------|----------------------------------|---------------------------------|
| id               | INT           | PRIMARY KEY, AUTO_INCREMENT      | Unique account ID               |
| account_number   | VARCHAR(50)   | NOT NULL, UNIQUE                 | Unique account number           |
| balance          | DECIMAL(15,2) | DEFAULT 0.00                     | Account balance                 |
| created_at       | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP        | Account creation timestamp      |
| user_id          | INT           | NOT NULL, FOREIGN KEY → Users(id) | Associated user ID (owner)     |

### `Transactions` Table
| Column Name   | Data Type     | Constraints                          | Description                              |
|----------------|---------------|--------------------------------------|------------------------------------------|
| id             | INT           | PRIMARY KEY, AUTO_INCREMENT          | Unique transaction ID                    |
| type           | ENUM          | NOT NULL                             | 'deposit' or 'withdrawal'                |
| balance_after  | DECIMAL(15,2) | NOT NULL                             | Account balance after transaction        |
| description    | VARCHAR(255)  |                                      | Optional transaction description         |
| created_at     | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP            | Timestamp of the transaction             |
| amount         | DECIMAL(15,2) | NOT NULL                             | Transaction amount                       |
| account_id     | INT           | NOT NULL, FOREIGN KEY → Accounts(id) | Associated account ID                    |

### `Authenticationkey` Table
| Column Name | Data Type     | Constraints                            | Description                          |
|--------------|---------------|----------------------------------------|--------------------------------------|
| id           | INT           | PRIMARY KEY, AUTO_INCREMENT            | Unique token ID                      |
| token        | VARCHAR(255)  | NOT NULL, UNIQUE                       | Authentication token                 |
| expires_at   | DATETIME      | NOT NULL                               | Token expiration datetime            |
| created_at   | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP              | Token creation timestamp             |
| user_id      | INT           | NOT NULL, FOREIGN KEY → Users(id)      | User ID to whom token is assigned    |


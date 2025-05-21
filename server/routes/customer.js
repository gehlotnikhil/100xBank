const express = require('express');
const customerController = require('../controllers/customer');
const authMiddleware = require('../middleware/auth');
const router = express.Router();
// Apply authentication middleware to all customer routes
router.use(authMiddleware.validating);
router.use(authMiddleware.checking('customer'));

router.get('/accounts', customerController.getAccounts);
router.get('/accounts/:accountId/transactions', customerController.getTransactions);
router.post('/accounts/:accountId/deposit', customerController.deposit);
router.post('/accounts/:accountId/withdraw', customerController.withdraw);

module.exports = router;
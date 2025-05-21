const express = require('express');
const bankerController = require('../controllers/banker');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Apply authentication middleware to all banker routes
router.use(authMiddleware.validating);
router.use(authMiddleware.checking('banker'));

router.get('/customers', bankerController.getAllCustomers);
router.get('/accounts', bankerController.getAllAccounts);
router.get('/accounts/:accountId/transactions', bankerController.getCustomerTransactions);

module.exports = router;

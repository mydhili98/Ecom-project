const express = require('express');
const router = express.Router();
const orderController = require('../Controllers/orderController');

router.get('/', orderController.getOrderList);
router.get('/user/:userId', orderController.getUserOrders);
router.post('/', orderController.createOrder);
router.delete('/:orderId', orderController.deleteOrder);
router.patch('/:orderId', orderController.updateOrderStatus);

module.exports = router;

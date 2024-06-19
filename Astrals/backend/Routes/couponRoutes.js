const express = require('express');
const router = express.Router();
const couponController = require('../Controllers/couponController');


router.get('/', couponController.getCoupons);
router.post('/', couponController.createCoupon);
router.delete('/:couponId', couponController.deleteCoupon);

module.exports = router;

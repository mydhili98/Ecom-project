const Coupon = require('../Models/coupon');

const getCoupons = async (req, res, next) => {
  try {
    const coupons = await Coupon.find()
    res.status(200).json(coupons);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error Occurred');
  }
};


const createCoupon = async (req, res, next) => {
  try {
    const newCoupon = new Coupon(req.body);
    await newCoupon.save();
    res.status(201).json(newCoupon);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error Occurred');
  }
};

const deleteCoupon = async (req, res, next) => {
  try {
    const couponId = req.params.couponId;
    const coupon = await Coupon.findByIdAndDelete(couponId);
    res.status(200).json({ message: 'Deleted', deletedCoupon: coupon });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error Occurred');
  }
};

module.exports = {
  getCoupons,
  createCoupon,
  deleteCoupon,
};
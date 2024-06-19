const Order = require('../Models/orders');

const getOrderList = async (req, res, next) => {
  try {
    const orders = await Order.find({}).populate('user').populate('products')
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error Occurred');
  }
};

const getUserOrders = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ user: userId }).populate('products');
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error Occurred');
  }
};

const createOrder = async (req, res, next) => {
  try {
    const { products, user, shippingAddress } = req.body;
    const newOrder = new Order({
      products,
      shippingAddress,
      user,
    });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error Occurred');
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findByIdAndDelete(orderId);
    res.status(200).json({ message: 'Deleted', deletedOrder: order });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error Occurred');
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const { orderStatus } = req.body;
    const orderId = req.params.orderId;

    const validStatusValues = ['pending', 'Shipped', 'Out for delivery', 'Delivered'];
    if (!validStatusValues.includes(orderStatus)) {
      return res.status(400).json({ message: 'Invalid order status value' });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true } 
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error Occurred');
  }
};

module.exports = {
  getOrderList,
  getUserOrders,
  createOrder,
  deleteOrder,
  updateOrderStatus,
};
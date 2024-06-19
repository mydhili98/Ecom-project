const stripe = require('stripe')(process.env.STRIPE_KEY);

const createCheckoutSession = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: req.body.items.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
          },
          unit_amount: item.mrp * 100,
        },
        quantity: item.quantity,
      })),
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/cancel',
      // customer_email: req.body.customerDetails.email,
      // billing_address: {
      //   details: req.body.customerDetails.details.address.details,
      //   pin: req.body.customerDetails.address.pin,
      //   phone: req.body.customerDetails.address.phone,
      // },
    });

    res.send(JSON.stringify({ url: session.url }));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCheckoutSession,
};
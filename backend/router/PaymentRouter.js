const express = require('express');
const router = express.Router();
const razorpay = require('../utils/razorpay');
const crypto = require('crypto');

router.post('/create-order', async (req, res) => {
  const { amount, currency, receipt } = req.body;
  console.log(" Create Order Request:", req.body);

  try {
    const options = {
      amount: amount * 100,
      currency: currency || 'INR',
      receipt: receipt || 'receipt_' + Date.now(),
    };

    console.log(' Razorpay options:', options);

    const order = await razorpay.orders.create(options);
    console.log(' Razorpay order created:', order);

    res.status(201).json({ success: true, order });
  } catch (err) {
    console.error('Razorpay order error:', err);
    res.status(500).json({ success: false, message: 'Order creation failed', error: err.message });
  }
});

router.post('/verify-signature', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex');

  if (generatedSignature === razorpay_signature) {
    res.status(200).json({ success: true, message: 'Payment verified' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid signature' });
  }
});

module.exports = router; 

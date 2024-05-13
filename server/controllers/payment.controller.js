const paymentConfig = require('../configs/payment.config.js') ;

const Razorpay = require('razorpay');
const crypto =require('crypto'); 
const  Payment = require("../models/payment.model.js");
const { sendMail } = require('../helpers/sendMail.js');

exports.checkout = async (req, res) => {
  const instance = new Razorpay({
    key_id: paymentConfig.RAZORPAY_KEY_ID,
    key_secret: paymentConfig.RAZORPAY_SECRET,
  });
  
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };
  const order = await instance.orders.create(options);

  res.status(200).json({
    success: true,
    order,
  });
};

exports.paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", paymentConfig.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
sendMail("This is a Test mail", `The payment has been received and booking has been made`)
    res.redirect(
      `http://localhost:5173/paymentSuccess?reference=${razorpay_payment_id}`
    );
  } else {
    res.status(400).json({
      success: false,
    });
  }
};
const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Order = require("../model/order");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

router.post(
  "/stripe",
  express.raw({ type: "application/json" }),
  catchAsyncErrors(async (req, res, next) => {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error(`Webhook Error: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;
      
      const orders = await Order.find({ stripePaymentIntentId: paymentIntent.id });
      
      for (const order of orders) {
        order.paymentStatus = "PAID";
        order.status = "Processing";
        order.paymentInfo = {
          id: paymentIntent.id,
          status: "succeeded",
          type: "Stripe",
        };
        order.paidAt = Date.now();
        await order.save();
      }
    } else if (event.type === "payment_intent.payment_failed") {
      const paymentIntent = event.data.object;
      
      const orders = await Order.find({ stripePaymentIntentId: paymentIntent.id });
      for (const order of orders) {
        order.paymentStatus = "FAILED";
        await order.save();
      }
    }

    res.json({ received: true });
  })
);

module.exports = router;

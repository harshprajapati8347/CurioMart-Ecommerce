const express = require("express");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isAuthenticated, isSeller, isAdmin } = require("../middleware/auth");
const Order = require("../model/order");
const Shop = require("../model/shop");
const Product = require("../model/product");
const CoupounCode = require("../model/coupounCode");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { z } = require("zod");

const orderSchema = z.object({
  cart: z.array(
    z.object({
      _id: z.string(),
      qty: z.number().min(1),
      shopId: z.string()
    })
  ).min(1),
  shippingAddress: z.object({
    address1: z.string().min(1),
    address2: z.string().optional(),
    zipCode: z.number().or(z.string()),
    country: z.string().min(1),
    city: z.string().min(1)
  }),
  user: z.object({
    _id: z.string().optional(),
    name: z.string().optional(),
    email: z.string().email().optional(),
    phoneNumber: z.number().or(z.string()).optional()
  }).passthrough(),
  couponCode: z.string().optional()
});

// create new order
router.post(
  "/create-order",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const validatedData = orderSchema.parse(req.body);
      const { cart, shippingAddress, user, couponCode } = validatedData;

      const shopItemsMap = new Map();

      for (const item of cart) {
        const shopId = item.shopId;
        if (!shopItemsMap.has(shopId)) {
          shopItemsMap.set(shopId, []);
        }
        shopItemsMap.get(shopId).push(item);
      }

      const ordersToCreate = [];
      let totalAmountDue = 0;

      for (const [shopId, items] of shopItemsMap) {
        let shopSubTotal = 0;
        let finalCartItems = [];

        for (const item of items) {
          const product = await Product.findById(item._id);
          if (!product) {
            return next(new ErrorHandler("Product not found", 404));
          }
          if (product.stock < item.qty) {
            return next(new ErrorHandler(`Insufficient stock for ${product.name}`, 400));
          }
          const itemTotal = product.discountPrice * item.qty;
          shopSubTotal += itemTotal;
          finalCartItems.push({
            ...product.toObject(),
            qty: item.qty,
            discountPrice: product.discountPrice
          });
        }

        const shipping = shopSubTotal * 0.10;
        let discountPrice = 0;

        if (couponCode) {
          const validCoupon = await CoupounCode.findOne({ name: couponCode, shopId });
          if (validCoupon) {
            discountPrice = (shopSubTotal * validCoupon.value) / 100;
          }
        }

        const shopTotalPrice = shopSubTotal + shipping - discountPrice;
        totalAmountDue += shopTotalPrice;

        ordersToCreate.push({
          shopId,
          cart: finalCartItems,
          shippingAddress,
          user,
          totalPrice: parseFloat(shopTotalPrice.toFixed(2)),
          status: "Pending",
          paymentStatus: "INITIATED"
        });
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(totalAmountDue * 100),
        currency: "inr",
        description: "Payment for CurioMart orders",
        metadata: {
          company: "CurioMart",
        },
      });

      const createdOrders = [];
      for (const orderData of ordersToCreate) {
        const order = await Order.create({
          ...orderData,
          stripePaymentIntentId: paymentIntent.id
        });
        createdOrders.push(order);
      }

      res.status(201).json({
        success: true,
        client_secret: paymentIntent.client_secret,
        orders: createdOrders,
      });

    } catch (error) {
      if (error instanceof z.ZodError) {
        return next(new ErrorHandler(error.errors.map(e => e.message).join(", "), 400));
      }
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all orders of user
router.get(
  "/get-all-orders/:userId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find({ "user._id": req.params.userId }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all orders of seller
router.get(
  "/get-seller-all-orders/:shopId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find({
        "cart.shopId": req.params.shopId,
      }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update order status for seller
router.put(
  "/update-order-status/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }
      if (req.body.status === "Transferred to delivery partner") {
        order.cart.forEach(async (o) => {
          await updateOrder(o._id, o.qty);
        });
      }

      order.status = req.body.status;

      if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
        order.paymentInfo.status = "Succeeded";
        const serviceCharge = order.totalPrice * .10;
        await updateSellerInfo(order.totalPrice - serviceCharge);
      }

      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        order,
      });

      async function updateOrder(id, qty) {
        const product = await Product.findById(id);

        product.stock -= qty;
        product.sold_out += qty;

        await product.save({ validateBeforeSave: false });
      }

      async function updateSellerInfo(amount) {
        const seller = await Shop.findById(req.seller.id);
        
        seller.availableBalance = amount;

        await seller.save();
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// give a refund ----- user
router.put(
  "/order-refund/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }

      order.status = req.body.status;

      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        order,
        message: "Order Refund Request successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// accept the refund ---- seller
router.put(
  "/order-refund-success/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }

      order.status = req.body.status;

      await order.save();

      res.status(200).json({
        success: true,
        message: "Order Refund successfull!",
      });

      if (req.body.status === "Refund Success") {
        order.cart.forEach(async (o) => {
          await updateOrder(o._id, o.qty);
        });
      }

      async function updateOrder(id, qty) {
        const product = await Product.findById(id);

        product.stock += qty;
        product.sold_out -= qty;

        await product.save({ validateBeforeSave: false });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// all orders --- for admin
router.get(
  "/admin-all-orders",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find().sort({
        deliveredAt: -1,
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;

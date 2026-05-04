import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import Lottie from "lottie-react";
import animationData from "../Assests/animations/107043-success.json";
import { FiCheckCircle, FiPackage, FiTruck, FiHome } from "react-icons/fi";
import { server } from "../server";

const OrderSuccessPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const paymentIntentId = searchParams.get("payment_intent");
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    // If user object is still loading, wait
    if (user === undefined) return;

    // If no paymentIntentId, direct access is not allowed
    if (!paymentIntentId || !user) {
      navigate("/");
      return;
    }

    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(
          `${server}/order/get-all-orders/${user._id}`,
        );
        // A single checkout can split into multiple shop orders sharing the same paymentIntentId
        const currentOrders = data.orders.filter(
          (o) => o.stripePaymentIntentId === paymentIntentId,
        );

        if (currentOrders.length > 0) {
          setOrders(currentOrders);
          localStorage.setItem("cartItems", JSON.stringify([])); // Clear cart on success
          // Ideally we would dispatch a Redux action to clear cart here too, but localstorage handles initial state
          setTimeout(() => {
            window.dispatchEvent(new Event("storage"));
          }, 100);
        } else {
          setError(true);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(true);
        setLoading(false);
      }
    };
    fetchOrders();
  }, [paymentIntentId, user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f9fc] flex flex-col">
        <Navbar />
        <div className="flex-1 flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#f63b60]"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || orders.length === 0) {
    return (
      <div className="min-h-screen bg-[#f6f9fc] flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col justify-center items-center p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Oops! Order not found.
          </h2>
          <p className="text-gray-600 mb-8 max-w-md">
            We couldn't retrieve your order details right now. If your payment
            was successful, your order is secure. Please check your email for
            confirmation.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-[#f63b60] text-white rounded-lg font-semibold hover:bg-[#d42d4a] transition-colors mb-4"
          >
            Retry
          </button>
          <Link to="/" className="text-[#f63b60] font-medium hover:underline">
            Return to Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const primaryOrder = orders[0];
  const orderNumber = primaryOrder._id.slice(-8).toUpperCase();
  const allItems = orders.flatMap((o) => o.cart);

  const grandTotal = orders.reduce((acc, o) => acc + o.totalPrice, 0);
  const subtotal = orders.reduce((acc, order) => {
    return (
      acc +
      order.cart.reduce((sum, item) => sum + item.discountPrice * item.qty, 0)
    );
  }, 0);
  const shipping = subtotal * 0.1;
  const computedTotal = subtotal + shipping;
  const discount =
    computedTotal - grandTotal > 0 ? computedTotal - grandTotal : 0;

  const orderDate = new Date(primaryOrder.createdAt);
  const deliveryStart = new Date(orderDate);
  deliveryStart.setDate(orderDate.getDate() + 5);
  const deliveryEnd = new Date(orderDate);
  deliveryEnd.setDate(orderDate.getDate() + 7);

  const format = (date) =>
    date.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const deliveryRange = `${format(deliveryStart)} – ${format(deliveryEnd)}`;

  const lottieOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="min-h-screen bg-[#f6f9fc] flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {/* 1. Success Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center mb-8 animate-fade-in relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-[#f63b60]"></div>
          <div className="w-48 h-48 mx-auto -mt-4 mb-2">
            <Lottie options={lottieOptions} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-500 mb-6 text-lg">
            Thank you for your order. A confirmation has been sent to your
            email.
          </p>
          <div className="inline-block bg-gray-50 border border-gray-200 rounded-lg px-6 py-3 font-mono text-xl font-bold text-gray-800 tracking-wider">
            Order #{orderNumber}
          </div>
        </div>

        {/* 2. Delivery Estimate Banner */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-8 flex items-center gap-4 text-green-800 shadow-sm animate-fade-in">
          <FiTruck className="w-8 h-8 text-green-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-lg">Estimated Delivery</h3>
            <p className="text-green-700">{deliveryRange}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* 3. Order Items List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-800">Order Items</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {allItems.map((item, index) => (
                  <div
                    key={index}
                    className="p-6 flex flex-col sm:flex-row gap-4 items-center sm:items-start"
                  >
                    <img
                      src={`${import.meta.env.VITE_APP_BACKEND_URL}/${item.images && item.images[0]}`}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                    />
                    <div className="flex-1 text-center sm:text-left">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-500 mb-2">
                        Quantity: {item.qty}
                      </p>
                    </div>
                    <div className="text-right font-semibold text-lg text-gray-900">
                      ₹{(item.discountPrice * item.qty).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 7. Timeline */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8 animate-fade-in">
              <h2 className="text-lg font-bold text-gray-800 mb-6">
                Order Timeline
              </h2>
              <div className="relative pl-4 space-y-8">
                <div className="absolute left-6 top-2 bottom-6 w-0.5 bg-gray-200"></div>

                <div className="relative flex gap-4 items-start">
                  <div className="w-5 h-5 rounded-full bg-green-500 z-10 ring-4 ring-white flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Order Confirmed
                    </h4>
                    <p className="text-sm text-gray-500">{format(orderDate)}</p>
                  </div>
                </div>

                <div className="relative flex gap-4 items-start opacity-60">
                  <div className="w-5 h-5 rounded-full bg-white border-2 border-gray-300 z-10 ring-4 ring-white flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Processing & Packing
                    </h4>
                    <p className="text-sm text-gray-500">
                      Preparing your order
                    </p>
                  </div>
                </div>

                <div className="relative flex gap-4 items-start opacity-60">
                  <div className="w-5 h-5 rounded-full bg-white border-2 border-gray-300 z-10 ring-4 ring-white flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Shipped & In Transit
                    </h4>
                    <p className="text-sm text-gray-500">On the way to you</p>
                  </div>
                </div>

                <div className="relative flex gap-4 items-start opacity-60">
                  <div className="w-5 h-5 rounded-full bg-white border-2 border-gray-300 z-10 ring-4 ring-white flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Delivered</h4>
                    <p className="text-sm text-gray-500">
                      Estimated: {deliveryRange}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* 4. Price Breakdown */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-fade-in">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Payment Summary
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium">₹{shipping.toFixed(2)}</span>
                </div>
                {discount > 0.01 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-medium">-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-gray-100 pt-3 mt-3 flex justify-between items-center">
                  <span className="font-bold text-gray-900 text-lg">
                    Order Total
                  </span>
                  <span className="font-bold text-gray-900 text-xl">
                    ₹{grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* 5. Shipping Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-fade-in">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FiHome className="text-gray-400" /> Shipping Details
              </h2>
              <div className="text-gray-600 text-sm space-y-1">
                <p className="font-semibold text-gray-800 mb-1">
                  {primaryOrder.shippingAddress.name || user?.name}
                </p>
                <p>{primaryOrder.shippingAddress.address1}</p>
                {primaryOrder.shippingAddress.address2 && (
                  <p>{primaryOrder.shippingAddress.address2}</p>
                )}
                <p>
                  {primaryOrder.shippingAddress.city},{" "}
                  {primaryOrder.shippingAddress.state}{" "}
                  {primaryOrder.shippingAddress.zipCode}
                </p>
                <p>{primaryOrder.shippingAddress.country}</p>
                <p className="mt-2 pt-2 border-t border-gray-50">
                  {primaryOrder.user?.phoneNumber || "No phone provided"}
                </p>
              </div>
            </div>

            {/* 6. Payment Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-fade-in">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FiCheckCircle className="text-green-500" /> Payment Info
              </h2>
              <div className="text-gray-600 text-sm space-y-2">
                <div className="flex justify-between">
                  <span>Method</span>
                  <span className="font-medium text-gray-800">
                    Paid via Card
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Status</span>
                  <span className="font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded">
                    Successful
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Transaction ID</span>
                  <span className="font-mono text-xs bg-gray-50 px-1 py-0.5 rounded border">
                    {paymentIntentId.substring(0, 10)}...
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 8. Action Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-in">
          <Link
            to="/products"
            className="px-8 py-3 w-full sm:w-auto bg-gray-900 text-white text-center rounded-lg font-semibold hover:bg-gray-800 transition-colors shadow-md hover:shadow-lg"
          >
            Continue Shopping
          </Link>
          <Link
            to="/profile"
            className="px-8 py-3 w-full sm:w-auto bg-white text-gray-800 border border-gray-200 text-center rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-sm hover:shadow"
          >
            View All Orders
          </Link>
        </div>
        <div className="text-center mt-6 mb-8 animate-fade-in">
          <Link
            to="/faq"
            className="text-gray-500 hover:text-[#f63b60] text-sm font-medium transition-colors"
          >
            Need help? Contact Support
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderSuccessPage;

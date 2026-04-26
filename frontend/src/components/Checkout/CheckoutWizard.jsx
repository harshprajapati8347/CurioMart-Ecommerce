import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Country, State } from "country-state-city";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { toast } from "react-toastify";
import { usePaymentIntent } from "../../hooks/usePaymentIntent";
import { FiCheck, FiChevronDown, FiChevronUp, FiShield } from "react-icons/fi";

let stripePromise;
const getStripe = async () => {
  if (!stripePromise) {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_APP_SERVER_URL}/payment/stripeapikey`);
      stripePromise = loadStripe(data.stripeApikey);
    } catch (error) {
      console.error("Error fetching stripe api key:", error);
    }
  }
  return stripePromise;
};

const StepIndicator = ({ currentStep }) => {
  const steps = ["Delivery", "Review", "Payment"];
  return (
    <div className="flex items-center justify-center w-full mb-8 sticky top-0 bg-white/80 backdrop-blur-md z-10 py-4 border-b">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors duration-300 ${
                currentStep > index + 1
                  ? "bg-green-500 text-white"
                  : currentStep === index + 1
                  ? "bg-[#f63b60] text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {currentStep > index + 1 ? <FiCheck size={20} /> : index + 1}
            </div>
            <span className={`text-sm mt-2 font-medium ${currentStep >= index + 1 ? "text-gray-900" : "text-gray-400"}`}>
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className={`h-1 w-16 md:w-32 mx-2 rounded transition-colors duration-300 ${currentStep > index + 1 ? "bg-green-500" : "bg-gray-200"}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const OrderSummaryPanel = ({ cart, subtotal, shipping, discount, total, applyCoupon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [couponInput, setCouponInput] = useState("");

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 sticky top-24">
      {/* Mobile Accordion Toggle */}
      <div className="p-4 lg:hidden flex justify-between items-center cursor-pointer bg-gray-50 rounded-t-xl" onClick={() => setIsOpen(!isOpen)}>
        <span className="font-semibold text-lg">Order Summary (₹{total})</span>
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </div>

      <div className={`${isOpen ? 'block' : 'hidden'} lg:block p-6`}>
        <h3 className="text-xl font-bold mb-4 hidden lg:block text-gray-800">Order Summary</h3>
        <div className="max-h-60 overflow-y-auto pr-2 space-y-4 mb-6">
          {cart.map((item) => (
            <div key={item._id} className="flex items-center gap-4">
              <img src={`${import.meta.env.VITE_APP_BACKEND_URL}/${item?.images[0]}`} alt={item.name} className="w-16 h-16 object-cover rounded-md border" />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                <p className="text-sm text-gray-500">Qty: {item.qty}</p>
              </div>
              <p className="text-sm font-semibold">₹{(item.discountPrice * item.qty).toFixed(2)}</p>
            </div>
          ))}
        </div>
        
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span>₹{shipping.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-₹{discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t mt-2">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>

        <div className="mt-6">
          <form onSubmit={(e) => { e.preventDefault(); applyCoupon(couponInput); }} className="flex gap-2">
            <input
              type="text"
              placeholder="Coupon code"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f63b60]"
            />
            <button type="submit" className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">Apply</button>
          </form>
        </div>
      </div>
    </div>
  );
};

const DeliveryStep = ({ shippingInfo, setShippingInfo, onNext }) => {
  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Delivery Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input required name="name" value={shippingInfo.name} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f63b60] outline-none transition-shadow" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input required type="email" name="email" value={shippingInfo.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f63b60] outline-none transition-shadow" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
            <input required type="tel" name="phone" value={shippingInfo.phone} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f63b60] outline-none transition-shadow" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
            <select required name="country" value={shippingInfo.country} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f63b60] outline-none transition-shadow">
              <option value="">Select Country</option>
              {Country.getAllCountries().map((c) => (
                <option key={c.isoCode} value={c.isoCode}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1 *</label>
            <input required name="line1" value={shippingInfo.line1} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f63b60] outline-none transition-shadow" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2 (Optional)</label>
            <input name="line2" value={shippingInfo.line2} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f63b60] outline-none transition-shadow" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State / Province *</label>
            <select required name="state" value={shippingInfo.state} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f63b60] outline-none transition-shadow" disabled={!shippingInfo.country}>
              <option value="">Select State</option>
              {shippingInfo.country && State.getStatesOfCountry(shippingInfo.country).map((s) => (
                <option key={s.isoCode} value={s.isoCode}>{s.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
            <input required name="city" value={shippingInfo.city} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f63b60] outline-none transition-shadow" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code *</label>
            <input required name="postalCode" value={shippingInfo.postalCode} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f63b60] outline-none transition-shadow" />
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <button type="submit" className="px-8 py-3 bg-[#f63b60] text-white rounded-lg font-semibold hover:bg-[#d42d4a] transition-colors shadow-md hover:shadow-lg w-full md:w-auto">
            Continue to Review
          </button>
        </div>
      </form>
    </div>
  );
};

const ReviewStep = ({ onBack, onNext, loading, shippingInfo }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Review Your Order</h2>
      <p className="text-gray-600 mb-6">Please review your items and order summary on the right before proceeding to payment.</p>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200 flex justify-between items-start">
        <div>
            <h3 className="font-semibold text-gray-800 mb-2">Delivery Information</h3>
            <p className="text-sm text-gray-600">{shippingInfo.name}</p>
            <p className="text-sm text-gray-600">{shippingInfo.line1} {shippingInfo.line2}</p>
            <p className="text-sm text-gray-600">{shippingInfo.city}, {shippingInfo.state} {shippingInfo.postalCode}</p>
            <p className="text-sm text-gray-600">{shippingInfo.country}</p>
            <p className="text-sm text-gray-600">{shippingInfo.phone}</p>
        </div>
        <button type="button" onClick={onBack} className="text-[#f63b60] text-sm font-medium hover:underline">Edit</button>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <button type="button" onClick={onBack} disabled={loading} className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium transition-colors">
          Back
        </button>
        <button 
          type="button" 
          onClick={onNext} 
          disabled={loading}
          className="px-8 py-3 bg-[#f63b60] text-white rounded-lg font-semibold hover:bg-[#d42d4a] transition-colors shadow-md hover:shadow-lg disabled:opacity-50 flex items-center gap-2"
        >
          {loading ? "Processing..." : "Proceed to Payment"}
        </button>
      </div>
    </div>
  );
};

const PaymentForm = ({ shippingInfo, onBack }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order/success`,
        payment_method_data: {
          billing_details: {
            name: shippingInfo.name,
            email: shippingInfo.email,
            phone: shippingInfo.phone,
            address: {
              line1: shippingInfo.line1,
              line2: shippingInfo.line2 || "",
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.postalCode,
              country: shippingInfo.country,
            },
          },
        },
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message);
      setIsProcessing(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      toast.success("Payment successful!");
      navigate(`/order/success?payment_intent=${paymentIntent.id}`);
    } else {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      {errorMessage && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200">
          {errorMessage}
        </div>
      )}
      <div className="flex justify-between items-center pt-6">
        <button type="button" onClick={onBack} disabled={isProcessing} className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium transition-colors">
          Back
        </button>
        <button 
          type="submit" 
          disabled={isProcessing || !stripe || !elements}
          className="px-8 py-3 bg-[#f63b60] text-white rounded-lg font-semibold hover:bg-[#d42d4a] transition-colors shadow-md hover:shadow-lg disabled:opacity-50 flex items-center gap-2"
        >
          {isProcessing ? "Processing..." : "Pay Now"}
          <FiShield />
        </button>
      </div>
    </form>
  );
};

const PaymentStep = ({ clientSecret, shippingInfo, onBack }) => {
  const [stripePromiseObj, setStripePromiseObj] = useState(null);

  useEffect(() => {
    getStripe().then(setStripePromiseObj);
  }, []);

  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#f63b60",
      colorBackground: "#ffffff",
      colorText: "#333333",
      colorDanger: "#ef4444",
      fontFamily: "ui-sans-serif, system-ui, sans-serif",
      borderRadius: "8px",
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Secure Payment</h2>
      {clientSecret && stripePromiseObj ? (
        <Elements stripe={stripePromiseObj} options={{ clientSecret, appearance }}>
          <PaymentForm shippingInfo={shippingInfo} onBack={onBack} />
        </Elements>
      ) : (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f63b60]"></div>
        </div>
      )}
    </div>
  );
};

const CheckoutWizard = () => {
  const [step, setStep] = useState(1);
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  
  const [shippingInfo, setShippingInfo] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phoneNumber || "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const [couponCode, setCouponCode] = useState("");
  const [couponData, setCouponData] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  const { fetchClientSecret, loading } = usePaymentIntent();
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    if (cart.length === 0) {
      navigate("/products");
    }
    window.scrollTo(0, 0);
  }, [cart, navigate]);

  const subtotal = cart.reduce((acc, item) => acc + item.qty * item.discountPrice, 0);
  const shipping = subtotal * 0.1;

  const applyCoupon = async (code) => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_APP_SERVER_URL}/coupon/get-coupon-value/${code}`);
      if (data.couponCode) {
        const validItems = cart.filter(item => item.shopId === data.couponCode.shopId);
        if (validItems.length > 0) {
          const eligiblePrice = validItems.reduce((acc, item) => acc + item.qty * item.discountPrice, 0);
          setDiscountAmount((eligiblePrice * data.couponCode.value) / 100);
          setCouponData(data.couponCode);
          setCouponCode(code);
          toast.success("Coupon applied successfully!");
        } else {
          toast.error("Coupon not valid for items in cart");
        }
      } else {
        toast.error("Invalid coupon code");
      }
    } catch (error) {
      toast.error("Failed to apply coupon");
    }
  };

  const total = (subtotal + shipping - discountAmount).toFixed(2);

  const handleReviewNext = async () => {
    const orderData = {
      cart: cart.map(item => ({ _id: item._id, qty: item.qty, shopId: item.shopId })),
      shippingAddress: {
        address1: shippingInfo.line1,
        address2: shippingInfo.line2,
        zipCode: shippingInfo.postalCode,
        country: shippingInfo.country,
        city: shippingInfo.city,
      },
      user,
      couponCode: couponData ? couponData.name : undefined,
    };

    const res = await fetchClientSecret(orderData);
    if (res && res.clientSecret) {
      setClientSecret(res.clientSecret);
      setStep(3);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="w-full bg-[#f6f9fc] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <StepIndicator currentStep={step} />
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-[60%]">
            {step === 1 && (
              <DeliveryStep 
                shippingInfo={shippingInfo} 
                setShippingInfo={setShippingInfo} 
                onNext={() => { setStep(2); window.scrollTo(0,0); }} 
              />
            )}
            {step === 2 && (
              <ReviewStep 
                onBack={() => { setStep(1); window.scrollTo(0,0); }} 
                onNext={handleReviewNext} 
                loading={loading}
                shippingInfo={shippingInfo}
              />
            )}
            {step === 3 && (
              <PaymentStep 
                clientSecret={clientSecret} 
                shippingInfo={shippingInfo} 
                onBack={() => { setStep(2); window.scrollTo(0,0); }} 
              />
            )}
          </div>
          
          <div className="w-full lg:w-[40%]">
            <OrderSummaryPanel 
              cart={cart}
              subtotal={subtotal}
              shipping={shipping}
              discount={discountAmount}
              total={total}
              applyCoupon={applyCoupon}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutWizard;

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Country, State } from "country-state-city";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { toast } from "react-toastify";
import { FiChevronDown, FiChevronUp, FiShield } from "react-icons/fi";
import { OrderStepper } from "@/components/ui/order-stepper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input"; // Assuming standard shadcn input

// Quick Mock for Input if it doesn't exist
const FormInput = ({ label, ...props }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      {label}
    </label>
    <input
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      {...props}
    />
  </div>
);

const FormSelect = ({ label, children, ...props }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      {label}
    </label>
    <select
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      {...props}
    >
      {children}
    </select>
  </div>
);

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

const OrderSummaryPanel = ({ cart, subtotal, shipping, discount, total, applyCoupon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [couponInput, setCouponInput] = useState("");

  return (
    <Card className="sticky top-24 border-0 lg:border shadow-none lg:shadow-sm">
      {/* Mobile Accordion Toggle */}
      <div 
        className="p-4 lg:hidden flex justify-between items-center cursor-pointer bg-muted/50 rounded-t-xl" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-lg text-foreground">Order Summary (IND₹{total})</span>
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </div>

      <div className={`${isOpen ? 'block' : 'hidden'} lg:block`}>
        <CardHeader className="hidden lg:block bg-muted/30 border-b border-border">
          <CardTitle className="text-lg">Order Summary</CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="max-h-60 overflow-y-auto pr-2 space-y-4 mb-6">
            {cart.map((item) => (
              <div key={item._id} className="flex items-center gap-4">
                <img src={`${import.meta.env.VITE_APP_BACKEND_URL}/${item?.images[0]}`} alt={item.name} className="w-16 h-16 object-cover rounded-md border border-border" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-foreground truncate">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">Qty: {item.qty}</p>
                </div>
                <p className="text-sm font-semibold text-foreground">IND₹{(item.discountPrice * item.qty).toFixed(2)}</p>
              </div>
            ))}
          </div>
          
          <div className="border-t border-border pt-4 space-y-2">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span className="text-foreground font-medium">IND₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span className="text-foreground font-medium">IND₹{shipping.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-success">
                <span>Discount</span>
                <span className="font-medium">-IND₹{discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-xl font-bold text-foreground pt-4 border-t border-border mt-4">
              <span>Total</span>
              <span>IND₹{total}</span>
            </div>
          </div>

          <div className="mt-6">
            <form onSubmit={(e) => { e.preventDefault(); applyCoupon(couponInput); }} className="flex gap-2">
              <FormInput
                placeholder="Coupon code"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
              />
              <Button type="submit" variant="secondary">Apply</Button>
            </form>
          </div>
        </CardContent>
      </div>
    </Card>
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
    <Card className="animate-in fade-in duration-500">
      <CardHeader>
        <CardTitle className="text-2xl">Delivery Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput required label="Full Name *" name="name" value={shippingInfo.name} onChange={handleChange} />
            <FormInput required type="email" label="Email *" name="email" value={shippingInfo.email} onChange={handleChange} />
            <FormInput required type="tel" label="Phone Number *" name="phone" value={shippingInfo.phone} onChange={handleChange} />
            
            <FormSelect required label="Country *" name="country" value={shippingInfo.country} onChange={handleChange}>
              <option value="">Select Country</option>
              {Country.getAllCountries().map((c) => (
                <option key={c.isoCode} value={c.isoCode}>{c.name}</option>
              ))}
            </FormSelect>
            
            <div className="md:col-span-2">
              <FormInput required label="Address Line 1 *" name="line1" value={shippingInfo.line1} onChange={handleChange} />
            </div>
            
            <div className="md:col-span-2">
              <FormInput label="Address Line 2 (Optional)" name="line2" value={shippingInfo.line2} onChange={handleChange} />
            </div>
            
            <FormSelect required label="State / Province *" name="state" value={shippingInfo.state} onChange={handleChange} disabled={!shippingInfo.country}>
              <option value="">Select State</option>
              {shippingInfo.country && State.getStatesOfCountry(shippingInfo.country).map((s) => (
                <option key={s.isoCode} value={s.isoCode}>{s.name}</option>
              ))}
            </FormSelect>
            
            <FormInput required label="City *" name="city" value={shippingInfo.city} onChange={handleChange} />
            <FormInput required label="Postal Code *" name="postalCode" value={shippingInfo.postalCode} onChange={handleChange} />
          </div>

          <div className="flex justify-end pt-6 border-t border-border mt-6">
            <Button type="submit" size="lg" className="w-full md:w-auto">
              Continue to Review
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

const ReviewStep = ({ onBack, onNext, loading, shippingInfo }) => {
  return (
    <Card className="animate-in fade-in duration-500">
      <CardHeader>
        <CardTitle className="text-2xl">Review Your Order</CardTitle>
        <p className="text-muted-foreground text-sm">Please review your items and order summary on the right before proceeding to payment.</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-muted/30 rounded-lg p-6 border border-border flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              Delivery Information
            </h3>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">{shippingInfo.name}</p>
              <p>{shippingInfo.line1} {shippingInfo.line2}</p>
              <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.postalCode}</p>
              <p>{shippingInfo.country}</p>
              <p>{shippingInfo.phone}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={onBack}>Edit Details</Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-border pt-6 mt-6">
        <Button variant="ghost" onClick={onBack} disabled={loading}>
          Back
        </Button>
        <Button onClick={onNext} disabled={loading} size="lg">
          {loading ? "Processing..." : "Proceed to Payment"}
        </Button>
      </CardFooter>
    </Card>
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
        <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-sm border border-destructive/20">
          {errorMessage}
        </div>
      )}
      <div className="flex justify-between items-center pt-6 border-t border-border">
        <Button variant="ghost" type="button" onClick={onBack} disabled={isProcessing}>
          Back
        </Button>
        <Button type="submit" disabled={isProcessing || !stripe || !elements} size="lg" className="gap-2">
          {isProcessing ? "Processing..." : "Pay Now"}
          <FiShield />
        </Button>
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
      colorPrimary: "hsl(var(--primary))",
      colorBackground: "hsl(var(--background))",
      colorText: "hsl(var(--foreground))",
      colorDanger: "hsl(var(--destructive))",
      fontFamily: "var(--font-sans)",
      borderRadius: "var(--radius)",
    },
  };

  return (
    <Card className="animate-in fade-in duration-500">
      <CardHeader>
        <CardTitle className="text-2xl">Secure Payment</CardTitle>
      </CardHeader>
      <CardContent>
        {clientSecret && stripePromiseObj ? (
          <Elements stripe={stripePromiseObj} options={{ clientSecret, appearance }}>
            <PaymentForm shippingInfo={shippingInfo} onBack={onBack} />
          </Elements>
        ) : (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}
      </CardContent>
    </Card>
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

  const checkoutSteps = [
    { title: "Delivery" },
    { title: "Review" },
    { title: "Payment" }
  ];

  return (
    <div className="w-full bg-background min-h-[calc(100vh-80px)] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-12">
          <OrderStepper steps={checkoutSteps} currentStep={step} />
        </div>
        
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

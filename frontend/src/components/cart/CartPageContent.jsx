import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart, removeFromCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { PriceDisplay } from "@/components/ui/price-display";

const CartPageContent = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

  const quantityChangeHandler = (data) => {
    dispatch(addTocart(data));
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0,
  );

  const shipping = subtotal > 1000 ? 0 : 50;
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
          <AiOutlineShoppingCart className="h-8 w-8 text-primary" />
          Shopping Cart
        </h1>
        <p className="mt-2 text-muted-foreground">
          {cart && cart.length > 0
            ? `You have ${cart.length} ${cart.length === 1 ? "item" : "items"} in your cart`
            : "Your cart is empty"}
        </p>
      </div>

      {cart && cart.length === 0 ? (
        /* Empty Cart State */
        <Card className="max-w-2xl mx-auto border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-24 text-center">
            <div className="rounded-full bg-muted p-6 mb-6">
              <AiOutlineShoppingCart className="h-16 w-16 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">
              Your cart is empty
            </h2>
            <p className="text-muted-foreground max-w-md mb-8">
              Looks like you haven't added anything to your cart yet. Start
              shopping to fill it up!
            </p>
            <Link to="/products">
              <Button size="lg" className="px-8">
                Continue Shopping
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        /* Cart with Items */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader className="bg-muted/30 border-b border-border pb-4">
                <CardTitle className="text-lg">
                  Cart Items ({cart.length})
                </CardTitle>
              </CardHeader>
              <div className="divide-y divide-border">
                {cart.map((item, index) => (
                  <CartItem
                    key={index}
                    data={item}
                    quantityChangeHandler={quantityChangeHandler}
                    removeFromCartHandler={removeFromCartHandler}
                  />
                ))}
              </div>
            </Card>

            <Link
              to="/products"
              className="inline-flex items-center text-sm font-medium text-primary hover:underline mt-4"
            >
              <span className="mr-2">←</span>
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader className="bg-muted/30 border-b border-border pb-4">
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>

              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal ({cart.length} items)</span>
                    <span className="font-medium text-foreground">
                      IND₹{subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-success">FREE</span>
                      ) : (
                        <span className="text-foreground">
                          IND₹{shipping.toFixed(2)}
                        </span>
                      )}
                    </span>
                  </div>
                </div>

                {/* Free Shipping Info */}
                {subtotal < 1000 && (
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                    <p className="text-sm text-primary mb-2">
                      Add{" "}
                      <span className="font-bold">
                        IND₹{(1000 - subtotal).toFixed(2)}
                      </span>{" "}
                      more to get FREE shipping!
                    </p>
                    <div className="w-full bg-primary/20 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(subtotal / 1000) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Divider */}
                <div className="border-t border-border pt-6">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-semibold text-foreground">
                      Total
                    </span>
                    <span className="text-3xl font-bold text-foreground">
                      IND₹{total.toFixed(2)}
                    </span>
                  </div>

                  <Link to="/checkout" className="block w-full">
                    <Button
                      size="lg"
                      className="w-full text-base font-semibold h-14"
                    >
                      Proceed to Checkout
                    </Button>
                  </Link>
                </div>
              </CardContent>

              <CardFooter className="justify-center border-t border-border bg-muted/30 py-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <svg
                    className="w-4 h-4 text-success"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Secure Checkout
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

// Cart Item Component
const CartItem = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);

  const handleQuantityChange = (newQty) => {
    setValue(newQty);
    const updateCartData = { ...data, qty: newQty };
    quantityChangeHandler(updateCartData);
  };

  return (
    <div className="p-6 group hover:bg-muted/20 transition-colors">
      <div className="flex gap-6">
        {/* Product Image */}
        <Link
          to={`/product/${data._id}`}
          className="shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-muted border border-border"
        >
          <img
            src={`${import.meta.env.VITE_APP_BACKEND_URL}/${data?.images[0]}`}
            alt={data.name}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
        </Link>

        {/* Product Details */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start gap-4">
              <Link
                to={`/product/${data._id}`}
                className="text-lg font-semibold text-foreground hover:text-primary transition-colors line-clamp-2"
              >
                {data.name}
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFromCartHandler(data)}
                className="shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                aria-label="Remove item"
              >
                <MdDeleteOutline size={22} />
              </Button>
            </div>

            {data.shop?.name && (
              <p className="mt-1 text-sm text-muted-foreground">
                Seller: {data.shop.name}
              </p>
            )}
          </div>

          {/* Price and Quantity Controls */}
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground block">
                Quantity
              </label>
              <QuantityStepper
                value={value}
                onChange={handleQuantityChange}
                min={1}
                max={data.stock}
              />
              {data.stock < 10 && (
                <p className="text-xs font-medium text-destructive mt-1">
                  Only {data.stock} left in stock
                </p>
              )}
            </div>

            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">Total</p>
              <PriceDisplay
                price={data.discountPrice * value}
                originalPrice={
                  data.originalPrice ? data.originalPrice * value : undefined
                }
                size="md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPageContent;

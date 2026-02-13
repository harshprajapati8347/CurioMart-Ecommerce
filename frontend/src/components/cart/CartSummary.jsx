import React from "react";
import { Link } from "react-router-dom";

const CartSummary = ({ cart, totalPrice, setOpenCart }) => {
  const itemCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const subtotal = totalPrice;
  const shipping = subtotal >= 1000 ? 0 : 50;
  const discount = 0; // Can be calculated based on coupons/offers
  const total = subtotal + shipping - discount;

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white border-t border-gray-200">
      {/* Order Summary */}
      <div className="px-5 py-4 space-y-3">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
          Order Summary
        </h3>

        {/* Subtotal */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">
            Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
          </span>
          <span className="font-semibold text-gray-900">
            ₹{subtotal.toLocaleString("en-IN")}
          </span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Shipping</span>
          {shipping === 0 ? (
            <span className="font-semibold text-green-600 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              FREE
            </span>
          ) : (
            <span className="font-semibold text-gray-900">
              ₹{shipping.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {/* Free Shipping Progress */}
        {subtotal < 1000 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 space-y-2">
            <p className="text-xs text-blue-800 font-medium">
              Add{" "}
              <span className="font-bold">
                ₹{(1000 - subtotal).toLocaleString("en-IN")}
              </span>{" "}
              more for FREE shipping! 🎉
            </p>
            <div className="w-full bg-blue-200 rounded-full h-1.5">
              <div
                className="bg-blue-600 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((subtotal / 1000) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Discount (if applicable) */}
        {discount > 0 && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Discount</span>
            <span className="font-semibold text-green-600">
              -₹{discount.toLocaleString("en-IN")}
            </span>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between items-center">
            <span className="text-base font-bold text-gray-900">Total</span>
            <span className="text-xl font-bold text-[#e44343]">
              ₹{total.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-5 pb-5 space-y-3">
        {/* Checkout Button */}
        <Link to="/checkout" onClick={() => setOpenCart(false)}>
          <button className="w-full bg-[#e44343] hover:bg-[#d63939] text-white font-semibold py-3.5 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
            <span>Proceed to Checkout</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </Link>

        {/* View Cart Button */}
        <Link to="/cart" onClick={() => setOpenCart(false)}>
          <button className="w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold py-3 rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-all duration-200">
            View Full Cart
          </button>
        </Link>

        {/* Continue Shopping Link */}
        <button
          onClick={() => setOpenCart(false)}
          className="w-full text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors flex items-center justify-center gap-1"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Continue Shopping
        </button>
      </div>

      {/* Security Badge */}
      <div className="px-5 pb-4 flex items-center justify-center gap-2 text-xs text-gray-500">
        <svg
          className="w-4 h-4 text-green-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        <span>Secure Checkout</span>
      </div>
    </div>
  );
};

export default CartSummary;

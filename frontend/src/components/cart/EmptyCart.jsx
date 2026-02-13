import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";

const EmptyCart = ({ onClose }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full px-8 py-12">
      {/* Empty Cart Icon */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-blue-100 rounded-full blur-2xl opacity-50"></div>
        <div className="relative p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full">
          <AiOutlineShoppingCart size={80} className="text-blue-400" />
        </div>
      </div>

      {/* Empty State Text */}
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        Your cart is empty
      </h3>
      <p className="text-gray-600 text-center mb-8 max-w-xs">
        Looks like you haven't added anything to your cart yet. Start shopping
        to fill it up!
      </p>

      {/* CTA Buttons */}
      <div className="space-y-3 w-full max-w-xs">
        <Link to="/products" onClick={onClose}>
          <button className="w-full bg-[#e44343] hover:bg-[#d63939] text-white font-semibold py-3.5 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Start Shopping
          </button>
        </Link>
        <Link to="/best-selling" onClick={onClose}>
          <button className="w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold py-3 rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-all duration-200">
            View Best Sellers
          </button>
        </Link>
      </div>

      {/* Decorative Elements */}
      <div className="mt-8 flex items-center gap-6 text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-green-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span>Free Shipping</span>
        </div>
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-green-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span>Easy Returns</span>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;

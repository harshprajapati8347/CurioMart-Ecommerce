import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";

const EmptyWishlist = ({ onClose }) => {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center max-w-sm">
        {/* Icon */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-pink-100 rounded-full blur-2xl opacity-50"></div>
          <div className="relative p-8 bg-gradient-to-br from-pink-50 to-red-50 rounded-full inline-block">
            <AiOutlineHeart size={80} className="text-pink-400" />
          </div>
        </div>

        {/* Text */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Your wishlist is empty
        </h3>
        <p className="text-gray-600 mb-6 text-sm">
          Save your favorite items here to buy them later or share with friends!
        </p>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <Link to="/products" onClick={onClose}>
            <button className="w-full bg-gradient-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Start Shopping
            </button>
          </Link>
          <Link to="/best-selling" onClick={onClose}>
            <button className="w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold py-2.5 rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-all duration-200">
              View Best Sellers
            </button>
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
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
          <div className="flex items-center gap-1">
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
    </div>
  );
};

export default EmptyWishlist;

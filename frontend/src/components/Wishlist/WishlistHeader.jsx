import React from "react";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineHeart } from "react-icons/ai";

const WishlistHeader = ({ itemCount, onClose }) => {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-pink-50 to-red-50">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-pink-500 to-red-600 rounded-lg shadow-md">
          <AiOutlineHeart size={24} className="text-white" />
        </div>
        <div>
          <h2 id="wishlist-title" className="text-lg font-bold text-gray-900">
            My Wishlist
          </h2>
          <p className="text-sm text-gray-600">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="p-2 hover:bg-white/80 rounded-lg transition-colors"
        aria-label="Close wishlist"
      >
        <RxCross1 size={24} className="text-gray-700" />
      </button>
    </div>
  );
};

export default WishlistHeader;

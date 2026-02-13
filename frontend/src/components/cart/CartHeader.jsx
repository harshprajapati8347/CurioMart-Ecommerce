import React from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";

const CartHeader = ({ itemCount, onClose }) => {
  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-5 py-4">
        {/* Title and Count */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md">
            <IoBagHandleOutline size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Shopping Cart</h2>
            <p className="text-xs text-gray-500">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
          aria-label="Close cart"
        >
          <RxCross1
            size={22}
            className="text-gray-600 group-hover:text-gray-900 transition-colors"
          />
        </button>
      </div>
    </div>
  );
};

export default CartHeader;

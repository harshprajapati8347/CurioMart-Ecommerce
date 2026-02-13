import React from "react";
import { RxCross1 } from "react-icons/rx";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const CartItem = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = React.useState(data.qty);
  const [isRemoving, setIsRemoving] = React.useState(false);
  const totalPrice = data.discountPrice * value;

  const increment = (data) => {
    if (data.stock < value + 1) {
      toast.error("Product stock limited!");
    } else {
      setValue(value + 1);
      const updateCartData = { ...data, qty: value + 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  const decrement = (data) => {
    if (value > 1) {
      setValue(value - 1);
      const updateCartData = { ...data, qty: value - 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  const handleRemove = (data) => {
    setIsRemoving(true);
    setTimeout(() => {
      removeFromCartHandler(data);
    }, 200);
  };

  return (
    <div
      className={`group relative bg-white hover:bg-gray-50 transition-all duration-200 ${
        isRemoving ? "opacity-0 scale-95" : "opacity-100 scale-100"
      }`}
    >
      <div className="flex gap-4 p-4 border-b border-gray-100">
        {/* Product Image */}
        <Link
          to={`/product/${data._id}`}
          className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-100 ring-1 ring-gray-200 hover:ring-blue-400 transition-all"
        >
          <img
            src={`${import.meta.env.VITE_APP_BACKEND_URL}/${data?.images[0]}`}
            alt={data.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </Link>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2 mb-2">
            <Link
              to={`/product/${data._id}`}
              className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2 leading-tight"
            >
              {data.name}
            </Link>
            <button
              onClick={() => handleRemove(data)}
              className="flex-shrink-0 p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
              aria-label="Remove item"
            >
              <MdDeleteOutline size={18} />
            </button>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-[#e44343]">
              ₹{totalPrice.toLocaleString("en-IN")}
            </span>
            {data.originalPrice && data.originalPrice > data.discountPrice && (
              <span className="text-xs text-gray-500 line-through">
                ₹{(data.originalPrice * value).toLocaleString("en-IN")}
              </span>
            )}
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
              <button
                onClick={() => decrement(data)}
                disabled={value === 1}
                className="p-2 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Decrease quantity"
              >
                <HiOutlineMinus size={14} className="text-gray-700" />
              </button>
              <span className="px-3 py-1 text-sm font-semibold text-gray-900 min-w-[2.5rem] text-center">
                {value}
              </span>
              <button
                onClick={() => increment(data)}
                disabled={data.stock < value + 1}
                className="p-2 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Increase quantity"
              >
                <HiPlus size={14} className="text-gray-700" />
              </button>
            </div>
            {data.stock < 10 && (
              <span className="text-xs text-orange-600 font-medium">
                Only {data.stock} left
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

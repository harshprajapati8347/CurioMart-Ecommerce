import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { BsCartPlus } from "react-icons/bs";
import { toast } from "react-toastify";

const WishlistItem = ({
  data,
  removeFromWishlistHandler,
  addToCartHandler,
}) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = (data) => {
    setIsRemoving(true);
    setTimeout(() => {
      removeFromWishlistHandler(data);
      toast.success("Removed from wishlist!");
    }, 200);
  };

  const handleAddToCart = (data) => {
    addToCartHandler(data);
    toast.success("Added to cart!");
  };

  const discountPercentage = data.originalPrice
    ? Math.round(
        ((data.originalPrice - data.discountPrice) / data.originalPrice) * 100,
      )
    : 0;

  return (
    <div
      className={`group relative bg-white hover:bg-gray-50 transition-all duration-200 ${
        isRemoving ? "opacity-0 scale-95" : "opacity-100 scale-100"
      }`}
    >
      <div className="flex gap-4 p-4">
        {/* Product Image */}
        <Link
          to={`/product/${data._id}`}
          className="relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-100 ring-1 ring-gray-200 hover:ring-pink-400 transition-all"
        >
          <img
            src={`${import.meta.env.VITE_APP_BACKEND_URL}/${data?.images[0]}`}
            alt={data.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {discountPercentage > 0 && (
            <div className="absolute top-1 left-1 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
              {discountPercentage}%
            </div>
          )}
        </Link>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2 mb-2">
            <Link
              to={`/product/${data._id}`}
              className="text-sm font-semibold text-gray-900 hover:text-pink-600 transition-colors line-clamp-2 leading-tight"
            >
              {data.name}
            </Link>
            <button
              onClick={() => handleRemove(data)}
              className="flex-shrink-0 p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
              aria-label="Remove from wishlist"
            >
              <MdDeleteOutline size={18} />
            </button>
          </div>

          {/* Shop Name */}
          {data.shop && (
            <Link
              to={`/shop/preview/${data.shop._id}`}
              className="text-xs text-gray-500 hover:text-pink-600 transition-colors mb-2 block"
            >
              {data.shop.name}
            </Link>
          )}

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-[#e44343]">
              ₹{data.discountPrice.toLocaleString("en-IN")}
            </span>
            {data.originalPrice && data.originalPrice > data.discountPrice && (
              <span className="text-xs text-gray-500 line-through">
                ₹{data.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          {/* Stock Badge */}
          {data.stock < 10 && data.stock > 0 && (
            <div className="text-xs text-orange-600 font-medium mb-2">
              Only {data.stock} left
            </div>
          )}
          {data.stock === 0 && (
            <div className="text-xs text-red-600 font-medium mb-2">
              Out of Stock
            </div>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={() => handleAddToCart(data)}
            disabled={data.stock === 0}
            className={`w-full py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
              data.stock === 0
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700 text-white shadow-md hover:shadow-lg"
            }`}
          >
            <BsCartPlus size={16} />
            {data.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;

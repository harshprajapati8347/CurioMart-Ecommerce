import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { BsCartPlus } from "react-icons/bs";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const WishlistPageContent = () => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
    toast.success("Removed from wishlist!");
  };

  const addToCartHandler = (data) => {
    const newData = { ...data, qty: 1 };
    dispatch(addTocart(newData));
    toast.success("Added to cart!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-3">
            <div className="relative">
              <div className="absolute inset-0 bg-pink-200 rounded-2xl blur-xl opacity-60"></div>
              <div className="relative p-4 bg-gradient-to-br from-pink-500 to-red-600 rounded-2xl shadow-xl">
                <AiOutlineHeart size={32} className="text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
                My Wishlist
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                {wishlist && wishlist.length > 0
                  ? `${wishlist.length} ${wishlist.length === 1 ? "item" : "items"} saved for later`
                  : "No items saved yet"}
              </p>
            </div>
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-pink-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Wishlist</span>
          </div>
        </div>

        {/* Empty State */}
        {!wishlist || wishlist.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg p-12 text-center border border-gray-100">
            <div className="max-w-md mx-auto">
              {/* Empty Icon */}
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-pink-100 rounded-full blur-3xl opacity-50"></div>
                <div className="relative p-12 bg-gradient-to-br from-pink-50 via-red-50 to-orange-50 rounded-full inline-block">
                  <AiOutlineHeart size={100} className="text-pink-400" />
                </div>
              </div>

              {/* Empty Text */}
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Your wishlist is empty
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Save your favorite items here to buy them later or share with
                friends!
              </p>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <Link to="/products">
                  <button className="w-full bg-gradient-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700 text-white font-semibold py-4 rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                    Start Shopping
                  </button>
                </Link>
                <Link to="/best-selling">
                  <button className="w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold py-3.5 rounded-xl border-2 border-gray-300 hover:border-pink-400 transition-all duration-200">
                    View Best Sellers
                  </button>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="mt-10 flex items-center justify-center gap-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-medium">Free Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-medium">Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Action Bar */}
            <div className="bg-white rounded-2xl shadow-sm p-4 mb-6 flex items-center justify-between border border-gray-100">
              <div className="flex items-center gap-4">
                <span className="text-gray-700 font-medium">
                  {wishlist.length}{" "}
                  {wishlist.length === 1 ? "Product" : "Products"}
                </span>
              </div>
              <Link
                to="/products"
                className="text-pink-600 hover:text-pink-700 font-medium text-sm transition-colors flex items-center gap-2"
              >
                <span>Continue Shopping</span>
                <span>→</span>
              </Link>
            </div>

            {/* Wishlist Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlist.map((item, index) => (
                <WishlistItemCard
                  key={item._id || index}
                  data={item}
                  removeFromWishlistHandler={removeFromWishlistHandler}
                  addToCartHandler={addToCartHandler}
                />
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-12 text-center">
              <Link to="/products">
                <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-xl border-2 border-gray-300 hover:border-pink-400 transition-all duration-200 shadow-md hover:shadow-lg">
                  <span>←</span>
                  <span>Continue Shopping</span>
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const WishlistItemCard = ({
  data,
  removeFromWishlistHandler,
  addToCartHandler,
}) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleRemove = (data) => {
    setIsRemoving(true);
    setTimeout(() => {
      removeFromWishlistHandler(data);
    }, 300);
  };

  const handleAddToCart = (data) => {
    addToCartHandler(data);
  };

  const discountPercentage = data.originalPrice
    ? Math.round(
        ((data.originalPrice - data.discountPrice) / data.originalPrice) * 100,
      )
    : 0;

  return (
    <div
      className={`group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 ${
        isRemoving ? "opacity-0 scale-90" : "opacity-100 scale-100"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <Link to={`/product/${data._id}`}>
          <img
            src={`${import.meta.env.VITE_APP_BACKEND_URL}/${data?.images[0]}`}
            alt={data.name}
            className={`w-full h-full object-contain p-4 transition-transform duration-500 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />
        </Link>

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
            {discountPercentage}% OFF
          </div>
        )}

        {/* Remove Button */}
        <button
          onClick={() => handleRemove(data)}
          className="absolute top-3 right-3 p-2.5 bg-white/95 hover:bg-red-50 rounded-full transition-all shadow-lg group/btn backdrop-blur-sm"
          aria-label="Remove from wishlist"
        >
          <MdDeleteOutline
            size={20}
            className="text-gray-600 group-hover/btn:text-red-600 transition-colors"
          />
        </button>

        {/* Stock Badge */}
        {data.stock < 10 && data.stock > 0 && (
          <div className="absolute bottom-3 left-3 bg-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
            Only {data.stock} left
          </div>
        )}
        {data.stock === 0 && (
          <div className="absolute bottom-3 left-3 bg-gray-800 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
            Out of Stock
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-5">
        {/* Shop Name */}
        {data.shop && (
          <Link to={`/shop/preview/${data.shop._id}`}>
            <p className="text-xs text-pink-600 hover:text-pink-700 font-medium mb-2 truncate">
              {data.shop.name}
            </p>
          </Link>
        )}

        {/* Product Name */}
        <Link to={`/product/${data._id}`}>
          <h3 className="text-sm font-semibold text-gray-900 hover:text-pink-600 transition-colors line-clamp-2 mb-3 min-h-[2.5rem]">
            {data.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-[#e44343]">
            ₹{data.discountPrice.toLocaleString("en-IN")}
          </span>
          {data.originalPrice && data.originalPrice > data.discountPrice && (
            <span className="text-sm text-gray-500 line-through">
              ₹{data.originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => handleAddToCart(data)}
          disabled={data.stock === 0}
          className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
            data.stock === 0
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          }`}
        >
          <BsCartPlus size={18} />
          {data.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default WishlistPageContent;

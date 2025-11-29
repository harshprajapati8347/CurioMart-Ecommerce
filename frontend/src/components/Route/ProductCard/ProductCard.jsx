import React, { useState, useEffect } from "react";
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { addTocart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "../../Products/Ratings";

const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist, data._id]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <>
      <div
        className="group relative w-full bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Discount Badge */}
        {data.originalPrice && data.discountPrice && (
          <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            {Math.round(
              ((data.originalPrice - data.discountPrice) / data.originalPrice) *
                100
            )}
            % OFF
          </div>
        )}

        {/* Stock Badge */}
        {data.stock < 10 && data.stock > 0 && (
          <div className="absolute top-3 right-3 z-10 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Only {data.stock} left
          </div>
        )}

        {/* Product Image */}
        <Link
          to={`${
            isEvent === true
              ? `/product/${data._id}?isEvent=true`
              : `/product/${data._id}`
          }`}
        >
          <div className="relative h-56 bg-gray-50 overflow-hidden">
            <img
              src={`${import.meta.env.VITE_APP_BACKEND_URL}/${
                data.images && data.images[0]
              }`}
              alt={data.name}
              className={`w-full h-full object-contain p-4 transition-transform duration-500 ${
                isHovered ? "scale-110" : "scale-100"
              }`}
            />

            {/* Quick Action Buttons - Appear on Hover */}
            <div
              className={`absolute inset-x-0 bottom-0 flex gap-2 justify-center pb-4 transition-all duration-300 ${
                isHovered
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(true);
                }}
                className="bg-white text-gray-800 p-2.5 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-colors"
                title="Quick view"
              >
                <AiOutlineEye size={20} />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addToCartHandler(data._id);
                }}
                className="bg-white text-gray-800 p-2.5 rounded-full shadow-lg hover:bg-green-600 hover:text-white transition-colors"
                title="Add to cart"
              >
                <AiOutlineShoppingCart size={20} />
              </button>
            </div>
          </div>
        </Link>

        {/* Product Details */}
        <div className="p-4">
          {/* Shop Name */}
          <Link to={`/shop/preview/${data?.shop._id}`}>
            <p className="text-xs text-blue-600 hover:text-blue-700 font-medium mb-2 truncate">
              {data.shop.name}
            </p>
          </Link>

          {/* Product Name */}
          <Link
            to={`${
              isEvent === true
                ? `/product/${data._id}?isEvent=true`
                : `/product/${data._id}`
            }`}
          >
            <h4 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 min-h-[40px] hover:text-blue-600 transition-colors">
              {data.name}
            </h4>

            {/* Ratings */}
            <div className="mb-3">
              <Ratings rating={data?.ratings} />
            </div>

            {/* Price Section */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900">
                  ₹
                  {data.originalPrice === 0
                    ? data.originalPrice
                    : data.discountPrice}
                </span>
                {data.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ₹{data.originalPrice}
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  click
                    ? removeFromWishlistHandler(data)
                    : addToWishlistHandler(data);
                }}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                title={click ? "Remove from wishlist" : "Add to wishlist"}
              >
                {click ? (
                  <AiFillHeart size={22} className="text-red-500" />
                ) : (
                  <AiOutlineHeart size={22} className="text-gray-600" />
                )}
              </button>
            </div>
          </Link>
        </div>

        {/* Add to Cart Button - Full Width at Bottom */}
        <div className="px-4 pb-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCartHandler(data._id);
            }}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            <AiOutlineShoppingCart size={18} />
            <span className="text-sm">Add to Cart</span>
          </button>
        </div>
      </div>

      {open && <ProductDetailsCard setOpen={setOpen} data={data} />}
    </>
  );
};

export default ProductCard;

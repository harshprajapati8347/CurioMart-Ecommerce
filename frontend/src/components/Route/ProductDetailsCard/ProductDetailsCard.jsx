import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { HiOutlineTruck } from "react-icons/hi";
import { MdVerifiedUser, MdLocalOffer } from "react-icons/md";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addTocart } from "../../../redux/actions/cart";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import Ratings from "../../Products/Ratings";

const ProductDetailsCard = ({ setOpen, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const handleMessageSubmit = () => {
    toast.info("Message feature coming soon!");
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    if (count < data.stock) {
      setCount(count + 1);
    } else {
      toast.error("Maximum stock reached!");
    }
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < count) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
        setOpen(false);
      }
    }
  };

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

  const discountPercentage =
    data.originalPrice && data.discountPrice
      ? Math.round(
          ((data.originalPrice - data.discountPrice) / data.originalPrice) *
            100,
        )
      : 0;

  if (!data) return null;

  return createPortal(
    <div className="bg-[#fff]">
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl relative">
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="sticky top-4 right-4 ml-auto mr-4 mt-4 z-10 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
            >
              <RxCross1 size={24} className="text-gray-700" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 pt-4">
              {/* Left Column - Images */}
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative bg-gray-50 rounded-2xl overflow-hidden aspect-square">
                  <img
                    src={`${import.meta.env.VITE_APP_BACKEND_URL}/${
                      data.images && data.images[selectedImage]
                    }`}
                    alt={data.name}
                    className="w-full h-full object-contain p-6"
                  />

                  {/* Discount Badge */}
                  {discountPercentage > 0 && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                      {discountPercentage}% OFF
                    </div>
                  )}
                </div>

                {/* Thumbnail Images */}
                {data.images && data.images.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {data.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                          selectedImage === index
                            ? "border-blue-600 shadow-md"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <img
                          src={`${
                            import.meta.env.VITE_APP_BACKEND_URL
                          }/${image}`}
                          alt={`${data.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Seller Info Card */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5">
                  <Link
                    to={`/shop/preview/${data.shop._id}`}
                    className="flex items-center gap-4 group"
                  >
                    <img
                      src={`${import.meta.env.VITE_APP_BACKEND_URL}/${
                        data?.shop?.avatar
                      }`}
                      alt={data.shop.name}
                      className="w-16 h-16 rounded-full border-2 border-white shadow-md object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {data.shop.name}
                      </h3>
                      <div className="flex items-center gap-1 mt-1">
                        <Ratings rating={4.5} />
                        <span className="text-sm text-gray-600 ml-2">
                          (4.5)
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleMessageSubmit();
                      }}
                      className="bg-white hover:bg-blue-600 hover:text-white text-gray-700 p-3 rounded-xl transition-colors shadow-sm"
                    >
                      <AiOutlineMessage size={20} />
                    </button>
                  </Link>

                  {/* Sold Count */}
                  {data.sold_out > 0 && (
                    <div className="mt-4 pt-4 border-t border-blue-100">
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <MdLocalOffer className="text-green-600" />
                        <span className="font-semibold text-green-600">
                          {data.sold_out}
                        </span>{" "}
                        units sold
                      </p>
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <HiOutlineTruck className="w-6 h-6 mx-auto mb-1 text-blue-600" />
                    <p className="text-xs text-gray-600 font-medium">
                      Free Delivery
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <MdVerifiedUser className="w-6 h-6 mx-auto mb-1 text-green-600" />
                    <p className="text-xs text-gray-600 font-medium">
                      Verified
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <MdLocalOffer className="w-6 h-6 mx-auto mb-1 text-orange-600" />
                    <p className="text-xs text-gray-600 font-medium">
                      Best Price
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column - Details */}
              <div className="space-y-6">
                {/* Product Title */}
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-3">
                    {data.name}
                  </h1>
                  <div className="flex items-center gap-2">
                    <Ratings rating={data?.ratings} />
                    <span className="text-sm text-gray-600">
                      ({data?.ratings || 0} ratings)
                    </span>
                  </div>
                </div>

                {/* Price Section */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-3xl font-bold text-gray-900">
                      ₹{data.discountPrice}
                    </span>
                    {data.originalPrice && (
                      <>
                        <span className="text-xl text-gray-500 line-through">
                          ₹{data.originalPrice}
                        </span>
                        <span className="bg-green-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                          Save ₹{data.originalPrice - data.discountPrice}
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    Inclusive of all taxes
                  </p>
                </div>

                {/* Stock Status */}
                <div className="flex items-center gap-2">
                  {data.stock > 0 ? (
                    <>
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-700 font-semibold">
                        In Stock ({data.stock} available)
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-red-700 font-semibold">
                        Out of Stock
                      </span>
                    </>
                  )}
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Product Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {data.description}
                  </p>
                </div>

                {/* Quantity Selector & Wishlist */}
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity
                    </label>
                    <div className="flex items-center bg-gray-100 rounded-xl w-fit">
                      <button
                        onClick={decrementCount}
                        disabled={count <= 1}
                        className="p-3 hover:bg-gray-200 rounded-l-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <AiOutlineMinus size={18} />
                      </button>
                      <span className="px-6 py-3 font-semibold text-gray-900 min-w-[60px] text-center">
                        {count}
                      </span>
                      <button
                        onClick={incrementCount}
                        disabled={count >= data.stock}
                        className="p-3 hover:bg-gray-200 rounded-r-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <AiOutlinePlus size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={() =>
                      click
                        ? removeFromWishlistHandler(data)
                        : addToWishlistHandler(data)
                    }
                    className={`p-4 rounded-xl transition-all ${
                      click
                        ? "bg-red-50 text-red-600 hover:bg-red-100"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    title={click ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    {click ? (
                      <AiFillHeart size={28} />
                    ) : (
                      <AiOutlineHeart size={28} />
                    )}
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => addToCartHandler(data._id)}
                    disabled={data.stock < 1}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <AiOutlineShoppingCart size={24} />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    disabled={data.stock < 1}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>,
    document.body,
  );
};

export default ProductDetailsCard;

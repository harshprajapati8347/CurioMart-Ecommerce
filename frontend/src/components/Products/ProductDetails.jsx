import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import { HiOutlineTruck, HiOutlineShieldCheck } from "react-icons/hi";
import { MdVerifiedUser, MdLocalOffer } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import styles from "../../styles/styles";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "./Ratings";
import axios from "axios";

const ProductDetails = ({ data }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProductsShop(data && data?.shop._id));
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data, wishlist]);

  const incrementCount = () => {
    if (count < data.stock) {
      setCount(count + 1);
    } else {
      toast.error("Maximum stock reached!");
    }
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

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
        const cartData = { ...data, qty: count };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const avg = totalRatings / totalReviewsLength || 0;
  const averageRating = avg.toFixed(2);

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      const sellerId = data.shop._id;
      await axios
        .post(
          `${
            import.meta.env.VITE_APP_SERVER_URL
          }/conversation/create-new-conversation`,
          {
            groupTitle,
            userId,
            sellerId,
          }
        )
        .then((res) => {
          navigate(`/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("Please login to create a conversation");
    }
  };

  const discountPercentage =
    data?.originalPrice && data?.discountPrice
      ? Math.round(
          ((data.originalPrice - data.discountPrice) / data.originalPrice) * 100
        )
      : 0;

  return (
    <div className="bg-gray-50">
      {data ? (
        <div className={`${styles.section} py-8`}>
          {/* Main Product Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-10">
              {/* Left Column - Images */}
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative bg-gray-50 rounded-2xl overflow-hidden aspect-square border border-gray-200">
                  <img
                    src={`${import.meta.env.VITE_APP_BACKEND_URL}/${
                      data && data.images[select]
                    }`}
                    alt={data.name}
                    className="w-full h-full object-contain p-8"
                  />

                  {/* Discount Badge */}
                  {discountPercentage > 0 && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-lg font-bold px-4 py-2 rounded-full shadow-lg">
                      {discountPercentage}% OFF
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={() =>
                      click
                        ? removeFromWishlistHandler(data)
                        : addToWishlistHandler(data)
                    }
                    className={`absolute top-4 right-4 p-3 rounded-full transition-all shadow-lg ${
                      click
                        ? "bg-red-50 text-red-600 hover:bg-red-100"
                        : "bg-white text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {click ? (
                      <AiFillHeart size={24} />
                    ) : (
                      <AiOutlineHeart size={24} />
                    )}
                  </button>
                </div>

                {/* Thumbnail Gallery */}
                {data.images && data.images.length > 1 && (
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                    {data.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelect(index)}
                        className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all hover:scale-105 ${
                          select === index
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

                {/* Features Section - Desktop */}
                <div className="hidden lg:grid grid-cols-2 gap-3 pt-4">
                  <div className="bg-blue-50 rounded-xl p-4 flex items-center gap-3">
                    <HiOutlineTruck className="w-8 h-8 text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm text-gray-900">
                        Free Delivery
                      </p>
                      <p className="text-xs text-gray-600">
                        On orders over ₹100
                      </p>
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 flex items-center gap-3">
                    <HiOutlineShieldCheck className="w-8 h-8 text-green-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm text-gray-900">
                        Secure Payment
                      </p>
                      <p className="text-xs text-gray-600">100% protected</p>
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4 flex items-center gap-3">
                    <MdVerifiedUser className="w-8 h-8 text-purple-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm text-gray-900">
                        Verified Seller
                      </p>
                      <p className="text-xs text-gray-600">Trusted partner</p>
                    </div>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-4 flex items-center gap-3">
                    <BsBoxSeam className="w-8 h-8 text-orange-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm text-gray-900">
                        Easy Returns
                      </p>
                      <p className="text-xs text-gray-600">7 days return</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Product Info */}
              <div className="space-y-6">
                {/* Product Title & Rating */}
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                    {data.name}
                  </h1>
                  <div className="flex items-center gap-3">
                    <Ratings rating={data?.ratings} />
                    <span className="text-sm text-gray-600">
                      ({data?.ratings || 0} ratings)
                    </span>
                  </div>
                </div>

                {/* Price Section */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-4xl font-bold text-gray-900">
                      ₹{data.discountPrice}
                    </span>
                    {data.originalPrice && (
                      <>
                        <span className="text-2xl text-gray-500 line-through">
                          ₹{data.originalPrice}
                        </span>
                        <span className="bg-green-600 text-white text-sm font-bold px-4 py-1.5 rounded-full">
                          Save ₹{data.originalPrice - data.discountPrice}
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
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
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                    About this product
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {data.description}
                  </p>
                </div>

                {/* Quantity Selector */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Quantity
                  </label>
                  <div className="flex items-center bg-gray-100 rounded-xl w-fit">
                    <button
                      onClick={decrementCount}
                      disabled={count <= 1}
                      className="p-4 hover:bg-gray-200 rounded-l-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <AiOutlineMinus size={18} />
                    </button>
                    <span className="px-8 py-4 font-bold text-gray-900 min-w-[80px] text-center text-lg">
                      {count}
                    </span>
                    <button
                      onClick={incrementCount}
                      disabled={count >= data.stock}
                      className="p-4 hover:bg-gray-200 rounded-r-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <AiOutlinePlus size={18} />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => addToCartHandler(data._id)}
                    disabled={data.stock < 1}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                  >
                    <AiOutlineShoppingCart size={24} />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    disabled={data.stock < 1}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                  >
                    Buy Now
                  </button>
                </div>

                {/* Seller Info Card */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                  <Link
                    to={`/shop/preview/${data?.shop._id}`}
                    className="flex items-center gap-4 group mb-4"
                  >
                    <img
                      src={`${import.meta.env.VITE_APP_BACKEND_URL}/${
                        data?.shop?.avatar
                      }`}
                      alt={data.shop.name}
                      className="w-16 h-16 rounded-full border-2 border-white shadow-md object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {data.shop.name}
                      </h3>
                      <div className="flex items-center gap-1 mt-1">
                        <Ratings rating={Number(averageRating)} />
                        <span className="text-sm text-gray-600 ml-2">
                          ({averageRating}/5)
                        </span>
                      </div>
                    </div>
                  </Link>

                  <button
                    onClick={handleMessageSubmit}
                    className="w-full bg-white hover:bg-blue-600 hover:text-white text-gray-700 font-semibold py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    <AiOutlineMessage size={20} />
                    <span>Contact Seller</span>
                  </button>
                </div>

                {/* Features Section - Mobile */}
                <div className="grid lg:hidden grid-cols-2 gap-3">
                  <div className="bg-blue-50 rounded-xl p-3 flex items-center gap-2">
                    <HiOutlineTruck className="w-6 h-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-xs text-gray-900">
                        Free Delivery
                      </p>
                      <p className="text-xs text-gray-600">Over ₹100</p>
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-xl p-3 flex items-center gap-2">
                    <HiOutlineShieldCheck className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-xs text-gray-900">
                        Secure Payment
                      </p>
                      <p className="text-xs text-gray-600">Protected</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <ProductDetailsInfo
            data={data}
            products={products}
            totalReviewsLength={totalReviewsLength}
            averageRating={averageRating}
          />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({
  data,
  products,
  totalReviewsLength,
  averageRating,
}) => {
  const [active, setActive] = useState(1);

  const tabs = [
    { id: 1, label: "Product Details" },
    { id: 2, label: "Reviews", badge: data?.reviews?.length || 0 },
    { id: 3, label: "Seller Information" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Tabs Navigation */}
      <div className="flex border-b border-gray-200 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`relative px-6 py-4 font-semibold text-sm md:text-base whitespace-nowrap transition-colors flex items-center gap-2 ${
              active === tab.id
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab.label}
            {tab.badge !== undefined && (
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  active === tab.id
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6 md:p-8">
        {/* Product Details Tab */}
        {active === 1 && (
          <div className="prose max-w-none">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Description
            </h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {data.description}
            </p>
          </div>
        )}

        {/* Reviews Tab */}
        {active === 2 && (
          <div className="space-y-6">
            {Array.isArray(data?.reviews) && data.reviews.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    Customer Reviews
                  </h3>
                  <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                    Write a Review
                  </button>
                </div>
                <div className="space-y-4">
                  {data.reviews.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-xl p-5 border border-gray-200 hover:border-blue-200 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={`${import.meta.env.VITE_APP_BACKEND_URL}/${
                            item.user.avatar
                          }`}
                          alt={item.user.name}
                          className="w-12 h-12 rounded-full border-2 border-white shadow-sm object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">
                              {item.user.name}
                            </h4>
                            <Ratings rating={item.rating || data?.ratings} />
                          </div>
                          <p className="text-gray-700 leading-relaxed">
                            {item.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AiOutlineMessage className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Reviews Yet
                </h3>
                <p className="text-gray-600 mb-4">
                  Be the first to review this product!
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl transition-colors">
                  Write a Review
                </button>
              </div>
            )}
          </div>
        )}

        {/* Seller Information Tab */}
        {active === 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Link to={`/shop/preview/${data.shop._id}`}>
                <div className="flex items-center gap-4 mb-6 group">
                  <img
                    src={`${import.meta.env.VITE_APP_BACKEND_URL}/${
                      data?.shop?.avatar
                    }`}
                    className="w-20 h-20 rounded-full border-2 border-gray-200 group-hover:border-blue-600 transition-colors object-cover shadow-md"
                    alt={data.shop.name}
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {data.shop.name}
                    </h3>
                    <div className="flex items-center gap-1 mt-1">
                      <Ratings rating={Number(averageRating)} />
                      <span className="text-sm text-gray-600 ml-2">
                        ({averageRating}/5)
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
              <p className="text-gray-700 leading-relaxed">
                {data.shop.description}
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-1">Joined On</h4>
                <p className="text-gray-700">
                  {new Date(data.shop?.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-1">
                  Total Products
                </h4>
                <p className="text-gray-700">{products && products.length}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-1">
                  Total Reviews
                </h4>
                <p className="text-gray-700">{totalReviewsLength}</p>
              </div>

              <Link to={`/shop/preview/${data.shop._id}`}>
                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-xl transition-all shadow-md hover:shadow-lg">
                  Visit Shop
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;

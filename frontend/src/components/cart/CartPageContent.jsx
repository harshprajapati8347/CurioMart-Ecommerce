import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart, removeFromCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";

const CartPageContent = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

  const quantityChangeHandler = (data) => {
    dispatch(addTocart(data));
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0,
  );

  const shipping = subtotal > 1000 ? 0 : 50;
  const total = subtotal + shipping;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <AiOutlineShoppingCart size={36} />
          Shopping Cart
        </h1>
        <p className="mt-2 text-gray-600">
          {cart && cart.length > 0
            ? `You have ${cart.length} ${cart.length === 1 ? "item" : "items"} in your cart`
            : "Your cart is empty"}
        </p>
      </div>

      {cart && cart.length === 0 ? (
        /* Empty Cart State */
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="max-w-md mx-auto">
            <AiOutlineShoppingCart
              size={120}
              className="mx-auto text-gray-300 mb-6"
            />
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added anything to your cart yet. Start
              shopping to fill it up!
            </p>
            <Link
              to="/products"
              className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      ) : (
        /* Cart with Items */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Cart Items ({cart.length})
                </h2>
              </div>

              <div className="divide-y divide-gray-200">
                {cart.map((item, index) => (
                  <CartItem
                    key={index}
                    data={item}
                    quantityChangeHandler={quantityChangeHandler}
                    removeFromCartHandler={removeFromCartHandler}
                  />
                ))}
              </div>
            </div>

            {/* Continue Shopping Link */}
            <Link
              to="/products"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <span className="mr-2">←</span>
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm sticky top-24">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Order Summary
                </h2>
              </div>

              <div className="p-6 space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal ({cart.length} items)</span>
                  <span className="font-medium">IND₹{subtotal.toFixed(2)}</span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `IND₹${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>

                {/* Free Shipping Info */}
                {subtotal < 1000 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-800">
                      Add{" "}
                      <span className="font-semibold">
                        IND₹{(1000 - subtotal).toFixed(2)}
                      </span>{" "}
                      more to get FREE shipping!
                    </p>
                    <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${(subtotal / 1000) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Divider */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-gray-900">
                      IND₹{total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link to="/checkout" className="block">
                  <button className="w-full bg-[#e44343] hover:bg-[#d63939] text-white font-semibold py-4 rounded-lg transition-colors shadow-md hover:shadow-lg">
                    Proceed to Checkout
                  </button>
                </Link>

                {/* Security Badge */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Secure Checkout
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Cart Item Component
const CartItem = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;

  const increment = (data) => {
    if (data.stock < value) {
      toast.error("Product stock limited!");
    } else {
      setValue(value + 1);
      const updateCartData = { ...data, qty: value + 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1);
    const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    quantityChangeHandler(updateCartData);
  };

  return (
    <div className="p-6 hover:bg-gray-50 transition-colors">
      <div className="flex gap-4">
        {/* Product Image */}
        <Link
          to={`/product/${data._id}`}
          className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden bg-gray-100"
        >
          <img
            src={`${import.meta.env.VITE_APP_BACKEND_URL}/${data?.images[0]}`}
            alt={data.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform"
          />
        </Link>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <Link
                to={`/product/${data._id}`}
                className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2"
              >
                {data.name}
              </Link>
              {data.description && (
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                  {data.description}
                </p>
              )}
            </div>

            {/* Remove Button */}
            <button
              onClick={() => removeFromCartHandler(data)}
              className="flex-shrink-0 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              aria-label="Remove item"
            >
              <MdDeleteOutline size={24} />
            </button>
          </div>

          {/* Price and Quantity Controls */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            {/* Quantity Controls */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 font-medium">Qty:</span>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => decrement(data)}
                  disabled={value === 1}
                  className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Decrease quantity"
                >
                  <HiOutlineMinus size={16} className="text-gray-700" />
                </button>
                <span className="px-4 py-2 font-semibold text-gray-900 min-w-[3rem] text-center">
                  {value}
                </span>
                <button
                  onClick={() => increment(data)}
                  disabled={data.stock < value + 1}
                  className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Increase quantity"
                >
                  <HiPlus size={16} className="text-gray-700" />
                </button>
              </div>
              {data.stock < 10 && (
                <span className="text-xs text-orange-600 font-medium">
                  Only {data.stock} left
                </span>
              )}
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              {data.originalPrice &&
                data.originalPrice > data.discountPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    IND₹{(data.originalPrice * value).toFixed(2)}
                  </span>
                )}
              <span className="text-xl font-bold text-[#e44343]">
                IND₹{totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPageContent;

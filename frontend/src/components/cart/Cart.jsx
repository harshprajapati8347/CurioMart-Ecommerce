import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTocart, removeFromCart } from "../../redux/actions/cart";
import CartHeader from "./CartHeader";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import EmptyCart from "./EmptyCart";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Close cart on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setOpenCart(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [setOpenCart]);

  // Prevent body scroll when cart is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const removeFromCartHandler = useCallback(
    (data) => {
      dispatch(removeFromCart(data));
    },
    [dispatch],
  );

  const quantityChangeHandler = useCallback(
    (data) => {
      dispatch(addTocart(data));
    },
    [dispatch],
  );

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0,
  );

  const itemCount = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999] transition-opacity duration-300 ease-out animate-fadeIn"
        onClick={() => setOpenCart(false)}
        aria-hidden="true"
      />

      {/* Cart Drawer */}
      <div
        className="fixed top-0 right-0 h-full w-full sm:w-[420px] md:w-[450px] bg-white shadow-2xl z-[1000] flex flex-col animate-slideInRight"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        {/* Header */}
        <CartHeader itemCount={itemCount} onClose={() => setOpenCart(false)} />

        {/* Content */}
        {cart && cart.length === 0 ? (
          <EmptyCart onClose={() => setOpenCart(false)} />
        ) : (
          <>
            {/* Cart Items - Scrollable */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              <div className="divide-y divide-gray-100">
                {cart &&
                  cart.map((item, index) => (
                    <CartItem
                      key={item._id || index}
                      data={item}
                      quantityChangeHandler={quantityChangeHandler}
                      removeFromCartHandler={removeFromCartHandler}
                    />
                  ))}
              </div>
            </div>

            {/* Summary - Sticky at Bottom */}
            <CartSummary
              cart={cart}
              totalPrice={totalPrice}
              setOpenCart={setOpenCart}
            />
          </>
        )}
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideInRight {
          animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Custom Scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #cbd5e0;
          border-radius: 3px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #a0aec0;
        }
      `}</style>
    </>
  );
};

export default Cart;

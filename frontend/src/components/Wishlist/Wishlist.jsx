import React, { useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";
import WishlistHeader from "./WishlistHeader";
import WishlistItem from "./WishlistItem";
import EmptyWishlist from "./EmptyWishlist";

const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  // Close wishlist on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setOpenWishlist(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [setOpenWishlist]);

  // Prevent body scroll when wishlist is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const removeFromWishlistHandler = useCallback(
    (data) => {
      dispatch(removeFromWishlist(data));
    },
    [dispatch],
  );

  const addToCartHandler = useCallback(
    (data) => {
      const newData = { ...data, qty: 1 };
      dispatch(addTocart(newData));
      setOpenWishlist(false);
    },
    [dispatch, setOpenWishlist],
  );

  const itemCount = wishlist ? wishlist.length : 0;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999] transition-opacity duration-300 ease-out animate-fadeIn"
        onClick={() => setOpenWishlist(false)}
        aria-hidden="true"
      />

      {/* Wishlist Drawer */}
      <div
        className="fixed top-0 right-0 h-full w-full sm:w-[420px] md:w-[450px] bg-white shadow-2xl z-[1000] flex flex-col animate-slideInRight"
        role="dialog"
        aria-modal="true"
        aria-labelledby="wishlist-title"
      >
        {/* Header */}
        <WishlistHeader
          itemCount={itemCount}
          onClose={() => setOpenWishlist(false)}
        />

        {/* Content */}
        {wishlist && wishlist.length === 0 ? (
          <EmptyWishlist onClose={() => setOpenWishlist(false)} />
        ) : (
          <>
            {/* Wishlist Items - Scrollable */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              <div className="divide-y divide-gray-100">
                {wishlist &&
                  wishlist.map((item, index) => (
                    <WishlistItem
                      key={item._id || index}
                      data={item}
                      removeFromWishlistHandler={removeFromWishlistHandler}
                      addToCartHandler={addToCartHandler}
                    />
                  ))}
              </div>
            </div>

            {/* View Full Wishlist Button - Sticky at Bottom */}
            <div className="border-t border-gray-200 p-4 bg-white">
              <Link to="/wishlist" onClick={() => setOpenWishlist(false)}>
                <button className="w-full bg-gradient-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700 text-white font-semibold py-3.5 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                  <AiOutlineHeart size={20} />
                  View Full Wishlist
                </button>
              </Link>
            </div>
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

export default Wishlist;

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { categoriesData } from "../../static/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import Cart from "../cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import logo from "../../Assests/images/logo.png";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);

  // Refs for click outside detection
  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase()),
      );
    setSearchData(filteredProducts);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchData(null);
  };

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        desktopSearchRef.current &&
        !desktopSearchRef.current.contains(event.target)
      ) {
        if (searchData && searchTerm) {
          clearSearch();
        }
      }
      if (
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(event.target)
      ) {
        if (searchData && searchTerm) {
          clearSearch();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchData, searchTerm]);

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 70);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Header - Desktop Only */}
      <div className="hidden lg:block bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img
                src={logo}
                alt="Logo"
                className="h-12 w-auto object-contain hover:opacity-80 transition-opacity"
              />
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative" ref={desktopSearchRef}>
                <input
                  type="search"
                  placeholder="Search for products..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full h-11 pl-4 pr-12 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                  aria-label="Search products"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label="Search"
                >
                  <AiOutlineSearch size={20} />
                </button>

                {/* Search Results Dropdown */}
                {searchData && searchTerm && searchData.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                    {searchData.map((item) => (
                      <Link
                        key={item._id}
                        to={`/product/${item._id}`}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors"
                        onClick={clearSearch}
                      >
                        <img
                          src={`${import.meta.env.VITE_APP_BACKEND_URL}/${
                            item.images[0]
                          }`}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <span className="text-sm text-gray-700 line-clamp-2">
                          {item.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Seller CTA */}
            <Link
              to={`${isSeller ? "/dashboard" : "/shop-create"}`}
              className="flex-shrink-0 px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              {isSeller ? "Dashboard" : "Become Seller"}
              <IoIosArrowForward size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation - Desktop */}
      <nav
        className={`hidden lg:block bg-gray-900 text-white ${
          active ? "fixed top-0 left-0 right-0 z-40 shadow-lg" : ""
        } transition-all`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropDown(!dropDown)}
                className="flex items-center gap-3 px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors min-w-[240px]"
                aria-expanded={dropDown}
                aria-label="Categories menu"
              >
                <BiMenuAltLeft size={24} />
                <span className="flex-1 text-left font-medium">
                  All Categories
                </span>
                <IoIosArrowDown
                  size={18}
                  className={`transition-transform ${
                    dropDown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {dropDown && (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              )}
            </div>

            {/* Nav Links */}
            <div className="flex-1 flex justify-center">
              <Navbar active={activeHeading} />
            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-6">
              {/* Wishlist */}
              <button
                onClick={() => setOpenWishlist(true)}
                className="relative p-2 hover:bg-gray-800 rounded-lg transition-colors group"
                aria-label={`Wishlist with ${wishlist?.length || 0} items`}
              >
                <AiOutlineHeart
                  size={24}
                  className="text-gray-300 group-hover:text-white transition-colors"
                />
                {wishlist && wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Cart */}
              <button
                onClick={() => setOpenCart(true)}
                className="relative p-2 hover:bg-gray-800 rounded-lg transition-colors group"
                aria-label={`Cart with ${cart?.length || 0} items`}
              >
                <AiOutlineShoppingCart
                  size={24}
                  className="text-gray-300 group-hover:text-white transition-colors"
                />
                {cart && cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>

              {/* Profile */}
              <Link
                to={isAuthenticated ? "/profile" : "/login"}
                className="flex-shrink-0 hover:opacity-80 transition-opacity"
                aria-label={isAuthenticated ? "Profile" : "Login"}
              >
                {isAuthenticated ? (
                  <img
                    src={`${import.meta.env.VITE_APP_BACKEND_URL}/${
                      user?.avatar
                    }`}
                    alt="Profile"
                    className="w-9 h-9 rounded-full object-cover border-2 border-gray-700 hover:border-gray-500 transition-colors"
                  />
                ) : (
                  <CgProfile size={28} className="text-gray-300" />
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Header */}
      <header
        className={`lg:hidden bg-white border-b border-gray-200 ${
          active ? "fixed top-0 left-0 right-0 z-40 shadow-md" : ""
        }`}
      >
        {/* Top Row: Menu, Logo, Icons */}
        <div className="flex items-center justify-between h-16 px-3 sm:px-4">
          {/* Left: Hamburger Menu */}
          <button
            onClick={() => setOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
            aria-label="Open menu"
          >
            <BiMenuAltLeft size={28} className="text-gray-900" />
          </button>

          {/* Center: Logo */}
          <Link to="/" className="flex-shrink-0 mx-2">
            <img
              src={logo}
              alt="Logo"
              className="h-9 sm:h-10 w-auto object-contain"
            />
          </Link>

          {/* Right: Action Icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Wishlist Button */}
            <button
              onClick={() => setOpenWishlist(true)}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
              aria-label={`Wishlist with ${wishlist?.length || 0} items`}
            >
              <AiOutlineHeart size={22} className="text-gray-900" />
              {wishlist && wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setOpenCart(true)}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
              aria-label={`Cart with ${cart?.length || 0} items`}
            >
              <AiOutlineShoppingCart size={22} className="text-gray-900" />
              {cart && cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>

            {/* Profile Button */}
            <Link
              to={isAuthenticated ? "/profile" : "/login"}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
              aria-label={isAuthenticated ? "Profile" : "Login"}
            >
              {isAuthenticated ? (
                <img
                  src={`${import.meta.env.VITE_APP_BACKEND_URL}/${user?.avatar}`}
                  alt="Profile"
                  className="w-7 h-7 rounded-full object-cover border-2 border-gray-300"
                />
              ) : (
                <CgProfile size={22} className="text-gray-900" />
              )}
            </Link>
          </div>
        </div>

        {/* Bottom Row: Search Bar */}
        <div className="px-3 sm:px-4 pb-3" ref={mobileSearchRef}>
          <div className="relative">
            <input
              type="search"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full h-10 pl-4 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
              aria-label="Search products"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Search"
            >
              <AiOutlineSearch size={20} />
            </button>

            {/* Mobile Search Results Dropdown */}
            {searchData && searchTerm && searchData.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto z-50">
                {searchData.map((item) => (
                  <Link
                    key={item._id}
                    to={`/product/${item._id}`}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                    onClick={clearSearch}
                  >
                    <img
                      src={`${import.meta.env.VITE_APP_BACKEND_URL}/${item.images[0]}`}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <span className="text-sm text-gray-700 line-clamp-2 flex-1">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Sidebar with Animations */}
      {open && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
        >
          {/* Overlay with Fade Animation */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-out animate-fadeIn"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Sidebar Content with Slide Animation */}
          <div className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-white shadow-2xl overflow-y-auto animate-slideInLeft">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <button
                onClick={() => {
                  setOpenWishlist(true);
                  setOpen(false);
                }}
                className="relative p-2 hover:bg-white/80 rounded-lg transition-all"
                aria-label={`Wishlist with ${wishlist?.length || 0} items`}
              >
                <AiOutlineHeart size={24} className="text-gray-900" />
                {wishlist && wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Close Button with Hover Effect */}
              <button
                onClick={() => setOpen(false)}
                className="p-2.5 hover:bg-red-50 rounded-lg transition-all group"
                aria-label="Close menu"
              >
                <RxCross1
                  size={24}
                  className="text-gray-900 group-hover:text-red-600 transition-colors"
                />
              </button>
            </div>

            {/* Search Bar - Matching Desktop Behavior */}
            <div className="p-4 bg-gray-50">
              <div className="relative" ref={mobileSearchRef}>
                <input
                  type="search"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full h-11 pl-4 pr-12 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                  aria-label="Search products"
                />
                <AiOutlineSearch
                  size={20}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                />

                {/* Mobile Search Results - Matching Desktop */}
                {searchData && searchTerm && searchData.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto z-50">
                    {searchData.map((item) => (
                      <Link
                        key={item._id}
                        to={`/product/${item._id}`}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors"
                        onClick={() => {
                          clearSearch();
                          setOpen(false);
                        }}
                      >
                        <img
                          src={`${import.meta.env.VITE_APP_BACKEND_URL}/${
                            item.images[0]
                          }`}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <span className="text-sm text-gray-700 line-clamp-2">
                          {item.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Navigation with Hover Effects */}
            <div className="px-4">
              <Navbar active={activeHeading} isMobile={true} />
            </div>

            {/* Seller CTA */}
            <div className="px-4 py-3">
              <Link
                to={`${isSeller ? "/dashboard" : "/shop-create"}`}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                onClick={() => setOpen(false)}
              >
                {isSeller ? "Dashboard" : "Become Seller"}
                <IoIosArrowForward size={18} />
              </Link>
            </div>

            {/* User Profile/Auth */}
            <div className="px-4 py-6 border-t border-gray-200 mt-4">
              {isAuthenticated ? (
                <Link
                  to="/profile"
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-all"
                  onClick={() => setOpen(false)}
                >
                  <img
                    src={`${import.meta.env.VITE_APP_BACKEND_URL}/${
                      user?.avatar
                    }`}
                    alt="Profile"
                    className="w-14 h-14 rounded-full object-cover border-2 border-green-500"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{user?.name}</p>
                    <p className="text-sm text-gray-500">View Profile</p>
                  </div>
                </Link>
              ) : (
                <div className="flex items-center gap-2 justify-center text-sm">
                  <Link
                    to="/login"
                    className="px-6 py-2.5 text-gray-700 hover:text-gray-900 font-medium hover:bg-gray-100 rounded-lg transition-all"
                    onClick={() => setOpen(false)}
                  >
                    Login
                  </Link>
                  <span className="text-gray-400">|</span>
                  <Link
                    to="/sign-up"
                    className="px-6 py-2.5 text-gray-700 hover:text-gray-900 font-medium hover:bg-gray-100 rounded-lg transition-all"
                    onClick={() => setOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Cart Popup */}
      {openCart && <Cart setOpenCart={setOpenCart} />}

      {/* Wishlist Popup */}
      {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}

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

        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
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

        .animate-slideInLeft {
          animation: slideInLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Custom Scrollbar for Mobile Sidebar */
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

export default Header;

import React, { useState } from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import { HiArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import {
  footercompanyLinks,
  footerProductLinks,
  footerSupportLinks,
} from "../../static/data";
import logo from "../../Assests/images/logo.png";
import { toast } from "react-toastify";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribing(true);
      // Simulate API call
      setTimeout(() => {
        toast.success("Successfully subscribed to newsletter!");
        setEmail("");
        setIsSubscribing(false);
      }, 500);
    } else {
      toast.error("Please enter a valid email address");
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-12 md:py-16 overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Left Content */}
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
                <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                  Subscribe
                </span>{" "}
                to Our Newsletter
              </h2>
              <p className="text-blue-100 text-base md:text-lg max-w-xl">
                Get the latest updates on new products, exclusive deals, and
                special offers delivered straight to your inbox
              </p>
            </div>

            {/* Newsletter Form */}
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 w-full md:w-auto"
            >
              <div className="relative flex-1 md:w-96">
                <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email address"
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/95 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition-all shadow-lg"
                />
              </div>
              <button
                type="submit"
                disabled={isSubscribing}
                className="group bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubscribing ? (
                  "Subscribing..."
                ) : (
                  <>
                    Subscribe
                    <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 text-center sm:text-left">
            <Link to="/" className="inline-block mb-6 group">
              <img
                src={logo}
                alt="CurioMart Logo"
                className="h-16 w-auto md:h-20 group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <p className="text-gray-400 leading-relaxed mb-8 max-w-sm mx-auto sm:mx-0 text-base">
              Your trusted online store for quality products at the best prices.
              Shop with confidence and enjoy fast delivery and reliable support.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <a
                href="https://www.iamharsh.in"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300 justify-center sm:justify-start"
              >
                <div className="bg-blue-600/10 p-2.5 rounded-lg group-hover:bg-blue-600/20 transition-colors">
                  <MdLocationOn className="text-blue-500 text-xl" />
                </div>
                <span className="text-sm group-hover:translate-x-1 transition-transform">
                  Surat, Gujarat, India
                </span>
              </a>
              <a
                href="tel:+919023822895"
                className="group flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300 justify-center sm:justify-start"
              >
                <div className="bg-green-600/10 p-2.5 rounded-lg group-hover:bg-green-600/20 transition-colors">
                  <MdPhone className="text-green-500 text-xl" />
                </div>
                <span className="text-sm group-hover:translate-x-1 transition-transform">
                  +91 9023822895
                </span>
              </a>
              <a
                href="mailto:harshprajapati0123@gmail.com"
                className="group flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300 justify-center sm:justify-start"
              >
                <div className="bg-yellow-600/10 p-2.5 rounded-lg group-hover:bg-yellow-600/20 transition-colors">
                  <MdEmail className="text-yellow-500 text-xl" />
                </div>
                <span className="text-sm group-hover:translate-x-1 transition-transform">
                  harshprajapati0123@gmail.com
                </span>
              </a>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-lg">
                Follow Us
              </h3>
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <Link
                  to="#"
                  className="group bg-gray-800 hover:bg-blue-600 p-3.5 rounded-xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-blue-600/50"
                >
                  <AiFillFacebook
                    size={22}
                    className="group-hover:scale-110 transition-transform"
                  />
                </Link>
                <Link
                  to="https://twitter.com/Harsh62300719"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-gray-800 hover:bg-sky-500 p-3.5 rounded-xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-sky-500/50"
                >
                  <AiOutlineTwitter
                    size={22}
                    className="group-hover:scale-110 transition-transform"
                  />
                </Link>
                <Link
                  to="https://www.instagram.com/harsh_pr26/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-gray-800 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 p-3.5 rounded-xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-pink-600/50"
                >
                  <AiFillInstagram
                    size={22}
                    className="group-hover:scale-110 transition-transform"
                  />
                </Link>
                <Link
                  to="https://www.youtube.com/channel/UCGrekJRFqeI7SP4o06CuxPg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-gray-800 hover:bg-red-600 p-3.5 rounded-xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-red-600/50"
                >
                  <AiFillYoutube
                    size={22}
                    className="group-hover:scale-110 transition-transform"
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
              Company
              <span className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {footerProductLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.link || "#"}
                    className="group text-gray-400 hover:text-white transition-all duration-300 text-sm inline-flex items-center gap-2"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-500 transition-all duration-300 rounded-full"></span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop Links */}
          {footercompanyLinks?.length > 0 && (
            <div className="text-center sm:text-left">
              <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
                Shop
                <span className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></span>
              </h3>
              <ul className="space-y-3">
                {footercompanyLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.link || "#"}
                      className="group text-gray-400 hover:text-white transition-all duration-300 text-sm inline-flex items-center gap-2"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-blue-500 transition-all duration-300 rounded-full"></span>
                      <span className="group-hover:translate-x-1 transition-transform">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Support Links */}
          {footerSupportLinks?.length > 0 && (
            <div className="text-center sm:text-left">
              <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
                Support
                <span className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></span>
              </h3>
              <ul className="space-y-3">
                {footerSupportLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.link || "#"}
                      className="group text-gray-400 hover:text-white transition-all duration-300 text-sm inline-flex items-center gap-2"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-blue-500 transition-all duration-300 rounded-full"></span>
                      <span className="group-hover:translate-x-1 transition-transform">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-t border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="group flex flex-col items-center">
              <div className="bg-gradient-to-br from-blue-600/20 to-blue-600/5 p-4 rounded-2xl mb-3 group-hover:scale-110 transition-transform duration-300">
                <MdLocationOn className="text-blue-500 text-3xl" />
              </div>
              <p className="text-white font-semibold text-sm mb-1">
                100+ Locations
              </p>
              <p className="text-gray-500 text-xs">Nationwide Delivery</p>
            </div>
            <div className="group flex flex-col items-center">
              <div className="bg-gradient-to-br from-green-600/20 to-green-600/5 p-4 rounded-2xl mb-3 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-7 h-7 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <p className="text-white font-semibold text-sm mb-1">
                50K+ Orders
              </p>
              <p className="text-gray-500 text-xs">Successfully Delivered</p>
            </div>
            <div className="group flex flex-col items-center">
              <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-600/5 p-4 rounded-2xl mb-3 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-7 h-7 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
              <p className="text-white font-semibold text-sm mb-1">
                4.8 Star Rating
              </p>
              <p className="text-gray-500 text-xs">Customer Reviews</p>
            </div>
            <div className="group flex flex-col items-center">
              <div className="bg-gradient-to-br from-purple-600/20 to-purple-600/5 p-4 rounded-2xl mb-3 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-7 h-7 text-purple-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <p className="text-white font-semibold text-sm mb-1">
                10K+ Customers
              </p>
              <p className="text-gray-500 text-xs">Happy Shoppers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700/50 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} CurioMart by{" "}
              <a
                href="https://www.iamharsh.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-400 transition-colors font-medium"
              >
                Harsh
              </a>
              . All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex items-center gap-4 text-sm">
              <Link className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <span className="text-gray-600">·</span>
              <Link className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <span className="text-gray-600">·</span>
              <button
                onClick={() =>
                  window.openCookieSettings && window.openCookieSettings()
                }
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                Cookie Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

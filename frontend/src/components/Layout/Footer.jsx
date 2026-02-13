import React, { useState } from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
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

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      toast.success("Successfully subscribed to newsletter!");
      setEmail("");
    } else {
      toast.error("Please enter a valid email address");
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Left Content */}
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                <span className="text-yellow-300">Subscribe</span> to Our
                Newsletter
              </h2>
              <p className="text-blue-100 text-sm md:text-base">
                Get the latest updates on new products, exclusive deals, and
                special offers
              </p>
            </div>

            {/* Newsletter Form */}
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 w-full md:w-auto"
            >
              <div className="relative flex-1 md:w-80">
                <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email address"
                  className="w-full pl-11 pr-4 py-3 md:py-3.5 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all"
                />
              </div>
              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-3 md:py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 text-center sm:text-left">
            <Link to="/" className="inline-block mb-4">
              <img
                src={logo}
                alt="CurioMart Logo"
                className="h-16 w-auto md:h-20"
              />
            </Link>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-sm mx-auto sm:mx-0">
              Your trusted online store for quality products at the best prices.
              Shop with confidence and enjoy fast delivery and reliable support.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors justify-center sm:justify-start">
                <MdLocationOn className="text-blue-500 text-xl flex-shrink-0" />
                <span
                  className="text-sm"
                  onClick={() => window.open("https://www.iamharsh.in")}
                  style={{ cursor: "pointer" }}
                >
                  Surat, Gujarat, India
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors justify-center sm:justify-start">
                <MdPhone className="text-green-500 text-xl flex-shrink-0" />
                <span
                  className="text-sm"
                  onClick={() => window.open("tel:+919023822895")}
                  style={{ cursor: "pointer" }}
                >
                  +91 9023822895
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors justify-center sm:justify-start">
                <MdEmail className="text-yellow-500 text-xl flex-shrink-0" />
                <span
                  className="text-sm"
                  onClick={() =>
                    window.open("mailto:harshprajapati0123@gmail.com")
                  }
                  style={{ cursor: "pointer" }}
                >
                  harshprajapati0123@gmail.com
                </span>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-white font-semibold mb-4">Follow Us</h3>
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <Link
                  to="#"
                  className="bg-gray-800 hover:bg-blue-600 p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
                >
                  <AiFillFacebook size={20} />
                </Link>
                <Link
                  to="https://twitter.com/Harsh62300719"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-sky-500 p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
                >
                  <AiOutlineTwitter size={20} />
                </Link>
                <Link
                  to="https://www.instagram.com/harsh_pr26/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-pink-600 p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
                >
                  <AiFillInstagram size={20} />
                </Link>
                <Link
                  to="https://www.youtube.com/channel/UCGrekJRFqeI7SP4o06CuxPg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-red-600 p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
                >
                  <AiFillYoutube size={20} />
                </Link>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-white font-bold text-lg mb-4 relative inline-block">
              Company
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-blue-500"></span>
            </h3>
            <ul className="space-y-3">
              {footerProductLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.link || "#"}
                    className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 text-sm inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-white font-bold text-lg mb-4 relative inline-block">
              Shop
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-blue-500"></span>
            </h3>
            <ul className="space-y-3">
              {footercompanyLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.link || "#"}
                    className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 text-sm inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-white font-bold text-lg mb-4 relative inline-block">
              Support
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-blue-500"></span>
            </h3>
            <ul className="space-y-3">
              {footerSupportLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.link || "#"}
                    className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 text-sm inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} CurioMart by{" "}
              <a
                href="https://www.iamharsh.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-400 transition-colors"
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
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-blue-600/10 p-3 rounded-full mb-2">
                <MdLocationOn className="text-blue-500 text-2xl" />
              </div>
              <p className="text-gray-400 text-xs">100+ Locations</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-green-600/10 p-3 rounded-full mb-2">
                <svg
                  className="w-6 h-6 text-green-500"
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
              <p className="text-gray-400 text-xs">50K+ Orders</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-yellow-600/10 p-3 rounded-full mb-2">
                <svg
                  className="w-6 h-6 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
              <p className="text-gray-400 text-xs">4.8 Star Rating</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-purple-600/10 p-3 rounded-full mb-2">
                <svg
                  className="w-6 h-6 text-purple-500"
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
              <p className="text-gray-400 text-xs">10K+ Customers</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

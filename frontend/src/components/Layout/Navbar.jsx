import React from "react";
import { Link } from "react-router-dom";
import { navItems } from "../../static/data";

const Navbar = ({ active, isMobile = false }) => {
  return (
    <nav
      className={`flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-2 ${isMobile ? "py-2" : ""}`}
    >
      {navItems &&
        navItems.map((item, index) => {
          const isActive = active === index + 1;

          return (
            <Link
              key={item.url || index}
              to={item.url}
              className={`
                relative px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200
                focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900
                ${
                  isMobile
                    ? isActive
                      ? "bg-blue-50 text-blue-700 font-semibold"
                      : "text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                    : isActive
                      ? "text-green-400 lg:text-green-400"
                      : "text-gray-900 lg:text-gray-300 hover:text-gray-600 lg:hover:text-white"
                }
              `}
            >
              <span className="group inline-flex flex-col">
                <span>{item.title}</span>
                {!isMobile && (
                  <span
                    className={`
                      mt-1 h-0.5 rounded-full bg-green-400 transition-all duration-300 origin-center
                      ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                    `}
                  />
                )}
              </span>
            </Link>
          );
        })}
    </nav>
  );
};

export default Navbar;

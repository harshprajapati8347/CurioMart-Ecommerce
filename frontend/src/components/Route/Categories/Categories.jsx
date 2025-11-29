import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { brandingData, categoriesData } from "../../../static/data";
import styles from "../../../styles/styles";

const Categories = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category.title}`);
  };

  return (
    <>
      {/* Branding Section */}
      <div className={`${styles.section} hidden sm:block`}>
        <div className="branding my-6 md:my-8 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-sm border border-gray-100">
          {brandingData &&
            brandingData.map((item, index) => (
              <div
                className="flex items-start gap-2 md:gap-3 p-3 md:p-4 rounded-lg md:rounded-xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 group"
                key={index}
              >
                <div className="flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300 scale-90 md:scale-100">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-xs sm:text-sm md:text-base text-gray-900 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 mt-0.5 md:mt-1">
                    {item.Description}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className={`${styles.section} mb-8 md:mb-12`} id="categories">
        {/* Section Header */}
        <div className="mb-4 md:mb-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
            Shop by Category
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1 md:mt-2">
            Discover products across all categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {categoriesData &&
            categoriesData.map((category) => (
              <div
                key={category.id}
                className="group relative bg-white rounded-xl md:rounded-2xl shadow-sm hover:shadow-xl md:hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100"
                onClick={() => handleCategoryClick(category)}
                onMouseEnter={() => setHoveredCard(category.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Popular Badge */}
                {category.id <= 3 && (
                  <div className="absolute top-2 right-2 md:top-3 md:right-3 z-10 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-[10px] md:text-xs font-bold px-2 py-0.5 md:px-3 md:py-1 rounded-full shadow-md md:shadow-lg">
                    Popular
                  </div>
                )}

                {/* Category Content */}
                <div className="p-3 md:p-4">
                  {/* Category Image */}
                  <div className="relative h-28 sm:h-32 md:h-36 mb-2 md:mb-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg md:rounded-xl overflow-hidden">
                    <img
                      src={category.image_Url}
                      alt={category.title}
                      className={`w-full h-full object-contain p-2 md:p-3 transition-transform duration-500 ${
                        hoveredCard === category.id
                          ? "scale-110 rotate-2"
                          : "scale-100"
                      }`}
                    />

                    {/* Overlay on hover - Desktop only */}
                    <div
                      className={`hidden md:block absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300 ${
                        hoveredCard === category.id
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    />

                    {/* Explore Button - Desktop only */}
                    <div
                      className={`hidden md:flex absolute inset-0 items-center justify-center transition-all duration-300 ${
                        hoveredCard === category.id
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }`}
                    >
                      <span className="bg-white text-gray-900 px-3 md:px-4 py-1.5 md:py-2 rounded-full font-semibold text-[10px] md:text-xs shadow-lg flex items-center gap-1 md:gap-2">
                        Explore
                        <svg
                          className="w-2.5 h-2.5 md:w-3 md:h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>

                  {/* Category Title */}
                  <h3 className="font-bold text-xs sm:text-sm md:text-base text-gray-900 line-clamp-2 min-h-[32px] sm:min-h-[40px] group-hover:text-blue-600 transition-colors">
                    {category.title}
                  </h3>

                  {/* Category Subtitle - Hidden on mobile */}
                  <p className="hidden sm:block text-[10px] md:text-xs text-gray-600 line-clamp-2 mt-1 md:mt-2">
                    {category.subTitle}
                  </p>

                  {/* View Products Link - Desktop only */}
                  <div
                    className={`hidden md:flex items-center text-blue-600 font-medium text-xs mt-2 md:mt-3 transition-all duration-300 ${
                      hoveredCard === category.id
                        ? "translate-x-2 opacity-100"
                        : "translate-x-0 opacity-70"
                    }`}
                  >
                    <span>View Products</span>
                    <svg
                      className="w-2.5 h-2.5 md:w-3 md:h-3 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Bottom Gradient Accent */}
                <div
                  className={`h-0.5 md:h-1 bg-gradient-to-r from-blue-600 to-indigo-600 transition-opacity duration-300 ${
                    hoveredCard === category.id ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Categories;

import React from "react";
import { useNavigate } from "react-router-dom";

const DropDown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();

  const submitHandle = (category) => {
    navigate(`/products?category=${category.title}`);
    setDropDown(false);
    window.location.reload();
  };

  if (!categoriesData || categoriesData.length === 0) {
    return (
      <div className="absolute z-30 mt-1 w-64 rounded-b-lg bg-white shadow-lg border border-gray-100 p-4 text-sm text-gray-500">
        No categories available.
      </div>
    );
  }

  return (
    <div className="absolute z-30 mt-1 w-72 rounded-b-lg bg-white shadow-lg border border-gray-100 py-2 max-h-96 overflow-y-auto">
      {categoriesData.map((category, index) => (
        <button
          key={index}
          type="button"
          onClick={() => submitHandle(category)}
          className="flex w-full items-center gap-3 px-3 py-2.5 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white text-left"
        >
          <img
            src={category.image_Url}
            alt={category.title}
            className="w-8 h-8 object-cover rounded-md flex-shrink-0"
            draggable="false"
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">
              {category.title}
            </span>
            {category.subTitle && (
              <span className="text-xs text-gray-500 line-clamp-2">
                {category.subTitle}
              </span>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

export default DropDown;

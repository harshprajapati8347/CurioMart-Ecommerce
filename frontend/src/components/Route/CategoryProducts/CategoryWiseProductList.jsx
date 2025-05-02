import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";
import styles from "../../../styles/styles";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { sliderSettings } from "../../ArrowSlider/CustomArrow";

const CategoryWiseProductList = () => {
  const { allProducts } = useSelector((state) => state.products);
  const [productsByCategory, setProductsByCategory] = useState({});

  useEffect(() => {
    if (allProducts) {
      const grouped = {};
      allProducts.forEach((product) => {
        if (!grouped[product.category]) {
          grouped[product.category] = [];
        }
        grouped[product.category].push(product);
      });
      setProductsByCategory(grouped);
    }
  }, [allProducts]);

  return (
    <div>
      <div className={`${styles.section}`}>
        {Object.keys(productsByCategory).map((category) => (
          <div key={category} className="mb-12">
            <div className={`${styles.heading}`}>
              <h1>Best Deals on {category}</h1>
            </div>
            <div className="mt-6">
              <Slider {...sliderSettings}>
                {productsByCategory[category].map((product, index) => (
                  <div key={index} className="px-2">
                    <ProductCard data={product} />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryWiseProductList;

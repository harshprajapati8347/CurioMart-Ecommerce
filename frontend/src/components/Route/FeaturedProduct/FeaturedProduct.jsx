import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import ProductCard from "../ProductCard/ProductCard";
import styles from "../../../styles/styles";
import { sliderSettings } from "../../ArrowSlider/CustomArrow";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FeaturedProduct = () => {
  const { allProducts } = useSelector((state) => state.products);
  const [productsByCategory, setProductsByCategory] = useState([]);

  useEffect(() => {
    if (allProducts) {
      setProductsByCategory(allProducts);
    }
  }, [allProducts]);

  return (
    <div className="my-12">
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Featured Products</h1>
        </div>
        <div>
          <Slider {...sliderSettings}>
            {productsByCategory && productsByCategory.length !== 0 ? (
              productsByCategory.map((product, index) => (
                <div key={index} className="px-2">
                  <ProductCard data={product} />
                </div>
              ))
            ) : (
              <p>No products available</p>
            )}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;

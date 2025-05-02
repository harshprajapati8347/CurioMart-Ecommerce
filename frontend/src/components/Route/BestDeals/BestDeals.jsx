import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import ProductCard from "../ProductCard/ProductCard";
import styles from "../../../styles/styles";
import { sliderSettings } from "../../ArrowSlider/CustomArrow"; // ✅ Import Custom Arrows
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BestDeals = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.products);

  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.sort((a, b) => b.sold_out - a.sold_out);
    const firstSix = sortedData && sortedData.slice(0, 6);
    setData(firstSix);
  }, [allProducts]);

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Best Deals</h1>
        </div>
        <div>
          <Slider {...sliderSettings}>
            {data && data.length !== 0 ? (
              data.map((product, index) => (
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

export default BestDeals;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import ProductCard from "../Route/ProductCard/ProductCard";

const SuggestedProduct = ({ data }) => {
  const { allProducts } = useSelector((state) => state.products);
  const [productData, setProductData] = useState();

  useEffect(() => {
    const d =
      allProducts && allProducts.filter((i) => i.category === data.category);
    setProductData(d);
  }, [allProducts, data]);

  return (
    <div>
      {data && productData && productData.length > 0 ? (
        <div className={`${styles.section} py-8`}>
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Related Products
            </h2>
            <p className="text-gray-600 mt-2">
              You might also like these products
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {productData &&
              productData
                .slice(0, 10)
                .map((i, index) => <ProductCard data={i} key={index} />)}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuggestedProduct;

import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import CartPageContent from "../components/cart/CartPageContent";

const CartPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header activeHeading={3} />
      <div className="flex-1 bg-gray-50">
        <CartPageContent />
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;

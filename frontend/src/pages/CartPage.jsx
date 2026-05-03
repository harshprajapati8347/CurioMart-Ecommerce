import React from "react";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import CartPageContent from "../components/cart/CartPageContent";

const CartPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar activeHeading={3} />
      <div className="flex-1">
        <CartPageContent />
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;

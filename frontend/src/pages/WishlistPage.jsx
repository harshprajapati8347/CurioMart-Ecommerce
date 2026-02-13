import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import WishlistPageContent from "../components/Wishlist/WishlistPageContent";

const WishlistPage = () => {
  return (
    <div>
      <Header />
      <WishlistPageContent />
      <Footer />
    </div>
  );
};

export default WishlistPage;

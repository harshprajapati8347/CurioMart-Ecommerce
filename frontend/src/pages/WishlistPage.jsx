import React from "react";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import WishlistPageContent from "../components/Wishlist/WishlistPageContent";

const WishlistPage = () => {
  return (
    <div>
      <Navbar />
      <WishlistPageContent />
      <Footer />
    </div>
  );
};

export default WishlistPage;

import React, { useEffect } from "react";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductCard } from "../components/product/ProductCard";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../redux/actions/product";

// Icons for categories
import { Shirt, Monitor, Watch, Book, Coffee, Music } from "lucide-react";

const HomePage = () => {
  const { allProducts } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!allProducts || allProducts.length === 0) {
      dispatch(getAllProducts());
    }
  }, [dispatch, allProducts]);

  const categories = [
    { title: "Clothing", icon: <Shirt className="w-8 h-8 mb-2" /> },
    { title: "Electronics", icon: <Monitor className="w-8 h-8 mb-2" /> },
    { title: "Accessories", icon: <Watch className="w-8 h-8 mb-2" /> },
    { title: "Books", icon: <Book className="w-8 h-8 mb-2" /> },
    { title: "Home", icon: <Coffee className="w-8 h-8 mb-2" /> },
    { title: "Entertainment", icon: <Music className="w-8 h-8 mb-2" /> },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar activeHeading={1} />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full bg-muted py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-foreground">
                  The Best E-Commerce Experience
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Discover our premium collection of handpicked products curated just for you.
                </p>
              </div>
              <div className="space-x-4">
                <Link to="/products">
                  <Button size="lg" className="px-8">Shop Now</Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg" className="px-8">Learn More</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Category Grid */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tight mb-8">Shop by Category</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((cat, index) => (
                <Link to={`/products?category=${cat.title}`} key={index}>
                  <Card className="hover:scale-105 transition-transform cursor-pointer border-0 shadow-sm hover:shadow-md h-full">
                    <CardContent className="flex flex-col items-center justify-center p-6 h-full text-muted-foreground hover:text-primary transition-colors">
                      {cat.icon}
                      <span className="font-medium text-sm">{cat.title}</span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="w-full py-12 md:py-24 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
              <Link to="/products" className="text-primary font-medium hover:underline">View All</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {allProducts && allProducts.slice(0, 4).map((product, index) => (
                <ProductCard 
                  key={index}
                  product={{
                    id: product._id,
                    name: product.name,
                    brand: product.shop?.name || "CurioMart",
                    price: product.discountPrice || product.originalPrice,
                    originalPrice: product.originalPrice,
                    rating: product.ratings || 4.5,
                    reviewCount: product.reviews?.length || 0,
                    image: product.images?.[0] ? `${import.meta.env.VITE_APP_BACKEND_URL}/${product.images[0]}` : "https://placehold.co/400x400/png",
                    isNew: index < 2,
                    discount: product.originalPrice ? Math.round((1 - product.discountPrice/product.originalPrice)*100) : 0
                  }}
                  onAddToCart={() => console.log("Add", product._id)}
                  onQuickView={() => console.log("View", product._id)}
                  onAddToWishlist={() => console.log("Wishlist", product._id)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Promotional Banner */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-6 items-center bg-primary text-primary-foreground rounded-2xl overflow-hidden shadow-lg">
              <div className="p-8 md:p-12 space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">Summer Sale 2026</h2>
                <p className="text-primary-foreground/80 md:text-lg">
                  Up to 50% off on selected electronics and accessories. Offer valid till end of the month.
                </p>
                <Button variant="secondary" size="lg" className="mt-4">
                  Explore Deals
                </Button>
              </div>
              <div className="h-64 md:h-full w-full bg-black/10 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop" 
                  alt="Summer Sale" 
                  className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;

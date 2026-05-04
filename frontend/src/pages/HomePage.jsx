import React, { useEffect } from "react";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductCard } from "../components/product/ProductCard";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../redux/actions/product";
import {
  ArrowRight,
  Shirt,
  Monitor,
  Watch,
  Book,
  Coffee,
  Music,
  Zap,
  ShieldCheck,
  Truck,
  Badge,
} from "lucide-react";

const HomePage = () => {
  const { allProducts } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!allProducts || allProducts.length === 0) {
      dispatch(getAllProducts());
    }
  }, [dispatch, allProducts]);

  const categories = [
    {
      title: "Clothing",
      icon: <Shirt className="h-6 w-6" />,
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      title: "Electronics",
      icon: <Monitor className="h-6 w-6" />,
      color: "bg-purple-500/10 text-purple-500",
    },
    {
      title: "Accessories",
      icon: <Watch className="h-6 w-6" />,
      color: "bg-pink-500/10 text-pink-500",
    },
    {
      title: "Books",
      icon: <Book className="h-6 w-6" />,
      color: "bg-amber-500/10 text-amber-500",
    },
    {
      title: "Home",
      icon: <Coffee className="h-6 w-6" />,
      color: "bg-green-500/10 text-green-500",
    },
    {
      title: "Entertainment",
      icon: <Music className="h-6 w-6" />,
      color: "bg-red-500/10 text-red-500",
    },
  ];

  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast Delivery",
      desc: "Get your orders in 24 hours or less.",
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: "Secure Payments",
      desc: "100% protected payments & data privacy.",
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: "Free Shipping",
      desc: "On all orders over ₹500 across India.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      <Navbar activeHeading={1} />

      <main className="flex-1">
        {/* Modern Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-32 lg:pt-36 lg:pb-40 border-b border-border/50 bg-grid-pattern">
          {/* Ambient Background Glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 blur-[100px] rounded-full mix-blend-multiply filter dark:mix-blend-soft-light dark:opacity-20 animate-pulse-slow"></div>
          </div>

          <div className="container relative z-10 px-4 md:px-6 mx-auto max-w-6xl text-center">
            <div className="inline-flex items-center rounded-full border border-border/50 bg-background/50 backdrop-blur-sm px-3 py-1 text-sm font-medium mb-8 hover:bg-muted/50 transition-colors cursor-pointer">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              Welcome to the New CurioMart 2.0
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/80 to-foreground/50">
              Commerce, <br className="hidden sm:block" /> Designed for You.
            </h1>

            <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
              Experience the fastest, most beautiful way to shop online.
              Handpicked premium products, seamless checkout, and lightning-fast
              delivery.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/products">
                <Button
                  size="lg"
                  className="h-12 px-8 rounded-full text-base font-semibold group shadow-lg shadow-primary/20 transition-all hover:shadow-primary/30 hover:-translate-y-0.5"
                >
                  Start Shopping
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/best-selling">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 px-8 rounded-full text-base font-medium backdrop-blur-sm bg-background/50 hover:bg-muted transition-all"
                >
                  View Best Sellers
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Value Props / Features */}
        <section className="py-12 border-b border-border/50 bg-muted/30">
          <div className="container px-4 md:px-6 mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-background transition-colors"
                >
                  <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Category Grid */}
        <section className="py-20 md:py-28">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                  Explore Categories
                </h2>
                <p className="text-muted-foreground">
                  Find exactly what you're looking for.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
              {categories.map((cat, index) => (
                <Link to={`/products?category=${cat.title}`} key={index}>
                  <Card className="group hover:border-primary/50 transition-all cursor-pointer border border-border/50 shadow-sm hover:shadow-md h-full bg-background/50 backdrop-blur-sm overflow-hidden">
                    <CardContent className="flex flex-col items-center justify-center p-6 h-full relative">
                      {/* Hover Gradient Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div
                        className={`p-4 rounded-2xl ${cat.color} mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        {cat.icon}
                      </div>
                      <span className="font-semibold text-sm group-hover:text-primary transition-colors z-10">
                        {cat.title}
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20 md:py-28 bg-muted/20 border-y border-border/50">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                  Trending Now
                </h2>
                <p className="text-muted-foreground">
                  The most popular products right now.
                </p>
              </div>
              <Link
                to="/products"
                className="group flex items-center text-sm font-medium text-primary hover:underline"
              >
                View All{" "}
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {allProducts &&
                allProducts.slice(0, 4).map((product, index) => (
                  <div
                    key={index}
                    className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <ProductCard
                      product={{
                        id: product._id,
                        name: product.name,
                        brand: product.shop?.name || "CurioMart",
                        price: product.discountPrice || product.originalPrice,
                        originalPrice: product.originalPrice,
                        rating: product.ratings || 4.5,
                        reviewCount: product.reviews?.length || 0,
                        image: product.images?.[0]
                          ? `${import.meta.env.VITE_APP_BACKEND_URL}/${product.images[0]}`
                          : "https://placehold.co/400x400/png",
                        isNew: index < 2,
                        discount: product.originalPrice
                          ? Math.round(
                              (1 -
                                product.discountPrice / product.originalPrice) *
                                100,
                            )
                          : 0,
                      }}
                      onAddToCart={() => console.log("Add", product._id)}
                      onQuickView={() => console.log("View", product._id)}
                      onAddToWishlist={() =>
                        console.log("Wishlist", product._id)
                      }
                    />
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Promotional Banner */}
        <section className="py-20 md:py-32 overflow-hidden">
          <div className="container px-4 md:px-6 mx-auto max-w-6xl">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-transparent z-10" />
              <img
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop"
                alt="Summer Sale"
                className="absolute inset-0 w-full h-full object-cover object-right"
              />

              <div className="relative z-20 p-8 md:p-16 lg:p-20 flex flex-col items-start max-w-2xl text-white">
                <Badge
                  variant="secondary"
                  className="mb-6 bg-white/20 text-white hover:bg-white/30 backdrop-blur-md border-0"
                >
                  Limited Time Offer
                </Badge>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                  Summer Collection 2026
                </h2>
                <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg leading-relaxed">
                  Discover our exclusive summer collection. Use code{" "}
                  <strong className="text-white">SUMMER26</strong> for 50% off
                  all accessories and electronics.
                </p>
                <Button
                  size="lg"
                  className="h-12 px-8 rounded-full text-base font-semibold bg-white text-gray-900 hover:bg-gray-100 transition-transform hover:scale-105"
                >
                  Shop the Collection
                </Button>
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

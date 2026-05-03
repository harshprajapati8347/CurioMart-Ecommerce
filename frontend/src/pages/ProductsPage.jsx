import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Navbar from "../components/Layout/Navbar";
import Loader from "../components/Layout/Loader";
import { ProductCard } from "../components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Filter, SlidersHorizontal, ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const [data, setData] = useState([]);
  
  // Filter state mocks
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [view, setView] = useState("grid");

  useEffect(() => {
    if (categoryData === null) {
      setData(allProducts || []);
    } else {
      const d = allProducts && allProducts.filter((i) => i.category === categoryData);
      setData(d || []);
    }
  }, [allProducts, categoryData]);

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Categories</h3>
        <div className="space-y-2">
          {["Clothing", "Electronics", "Accessories", "Home", "Books"].map((cat) => (
            <label key={cat} className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="rounded border-input text-primary focus:ring-primary" defaultChecked={categoryData === cat} />
              <span className="text-sm font-medium leading-none">{cat}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className="pt-4 border-t border-border">
        <h3 className="font-semibold mb-4">Price Range</h3>
        <div className="space-y-4">
          <input 
            type="range" 
            min="0" max="1000" 
            className="w-full accent-primary" 
            value={priceRange[1]} 
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
          />
          <div className="flex items-center justify-between text-sm">
            <span>$0</span>
            <span className="font-medium">${priceRange[1]}</span>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-border">
        <h3 className="font-semibold mb-4">Rating</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center space-x-2 cursor-pointer">
              <input type="radio" name="rating" className="text-primary focus:ring-primary" />
              <span className="text-sm font-medium leading-none flex items-center">
                {rating} Stars & Up
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="pt-6 space-y-2">
        <Button className="w-full">Apply Filters</Button>
        <Button variant="outline" className="w-full">Clear All</Button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar activeHeading={3} />
      
      <main className="flex-1 container px-4 md:px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            {categoryData ? `${categoryData} Products` : "All Products"}
          </h1>
          
          {/* Mobile Filter Trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="lg:hidden">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh] overflow-y-auto">
              <SheetTitle className="sr-only">Filters</SheetTitle>
              <SheetDescription className="sr-only">
                Filter products by category, price, and rating.
              </SheetDescription>
              <div className="py-4">
                <FilterSidebar />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              <Card>
                <CardContent className="p-6">
                  <FilterSidebar />
                </CardContent>
              </Card>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
              <span className="text-sm text-muted-foreground">
                Showing {data.length} results
              </span>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-muted-foreground">Sort by:</span>
                  <button className="flex items-center font-medium hover:text-primary">
                    Featured <ChevronDown className="w-4 h-4 ml-1" />
                  </button>
                </div>
                
                <div className="hidden sm:flex border border-border rounded-md">
                  <Button 
                    variant={view === "grid" ? "secondary" : "ghost"} 
                    size="icon" 
                    className="rounded-none rounded-l-md h-8 w-8"
                    onClick={() => setView("grid")}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
                  </Button>
                  <Button 
                    variant={view === "list" ? "secondary" : "ghost"} 
                    size="icon" 
                    className="rounded-none rounded-r-md h-8 w-8"
                    onClick={() => setView("list")}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>
                  </Button>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader />
              </div>
            ) : data && data.length > 0 ? (
              <div className={`grid gap-6 ${view === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                {data.map((product, index) => (
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
                      isNew: index < 3,
                      discount: product.originalPrice ? Math.round((1 - product.discountPrice/product.originalPrice)*100) : 0
                    }}
                    onAddToCart={() => console.log("Add", product._id)}
                    onQuickView={() => console.log("View", product._id)}
                    onAddToWishlist={() => console.log("Wishlist", product._id)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="rounded-full bg-muted p-6 mb-4">
                  <Filter className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground max-w-md">
                  We couldn't find any products matching your current filters. Try adjusting your search or clearing some filters.
                </p>
                <Button variant="outline" className="mt-6" onClick={() => {}}>Clear All Filters</Button>
              </div>
            )}
            
            {/* Pagination Mock */}
            {data && data.length > 0 && (
              <div className="flex justify-center mt-12">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" disabled><ChevronDown className="w-4 h-4 rotate-90" /></Button>
                  <Button variant="default" size="icon">1</Button>
                  <Button variant="outline" size="icon">2</Button>
                  <Button variant="outline" size="icon">3</Button>
                  <Button variant="outline" size="icon"><ChevronDown className="w-4 h-4 -rotate-90" /></Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductsPage;

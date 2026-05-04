import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Menu,
  Search,
  Heart,
  ShoppingCart,
  User,
  Moon,
  Sun,
  LayoutDashboard,
  Store,
  ChevronDown,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { navItems, categoriesData } from "../../static/data";
import { CartDrawer } from "../cart/CartDrawer";
import { useTheme } from "next-themes";

const Navbar = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { allProducts } = useSelector((state) => state.products);
  const { theme, setTheme } = useTheme();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchData(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        clearSearch();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm transition-all">
      <div className="container flex h-16 items-center gap-4 px-4 md:px-6 max-w-7xl mx-auto">
        {/* Mobile Hamburger Menu */}
        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="shrink-0">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <SheetDescription className="sr-only">
              Main navigation menu for mobile
            </SheetDescription>
            <div className="flex flex-col gap-6 mt-6">
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <span className="font-display font-bold text-2xl text-primary">
                  CurioMart
                </span>
              </Link>
              
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full pl-8 bg-muted"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>

              <nav className="flex flex-col gap-4">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.url}
                    className={`text-lg font-medium transition-colors hover:text-primary ${
                      activeHeading === index + 1
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
              
              <div className="flex flex-col gap-4 mt-auto">
                <Link to={isSeller ? "/dashboard" : "/shop-create"}>
                  <Button className="w-full justify-start gap-2">
                    {isSeller ? <LayoutDashboard className="h-4 w-4" /> : <Store className="h-4 w-4" />}
                    {isSeller ? "Dashboard" : "Become Seller"}
                  </Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link to="/" className="mr-6 flex items-center space-x-2 shrink-0">
          <span className="font-display font-bold text-2xl text-primary tracking-tight">
            CurioMart
          </span>
        </Link>

        {/* Desktop Navigation & Search */}
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:gap-6">
          {/* Categories Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 shrink-0 border-dashed">
                <Menu className="h-4 w-4" />
                Categories
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[240px]">
              {categoriesData && categoriesData.map((category) => (
                <DropdownMenuItem key={category.id} asChild>
                  <Link to={`/products?category=${category.title}`} className="cursor-pointer">
                    {category.title}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Main Nav Links */}
          <nav className="flex items-center gap-6 text-sm font-medium">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.url}
                className={`transition-colors hover:text-primary ${
                  activeHeading === index + 1
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                }`}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-md mx-auto" ref={searchRef}>
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for products..."
              className="w-full bg-muted/50 border-muted-foreground/20 focus-visible:bg-background pl-8 rounded-full"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            
            {/* Search Results Dropdown */}
            {searchData && searchTerm && searchData.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                {searchData.map((item) => (
                  <Link
                    key={item._id}
                    to={`/product/${item._id}`}
                    className="flex items-center gap-3 p-3 hover:bg-muted transition-colors border-b border-border/50 last:border-0"
                    onClick={clearSearch}
                  >
                    <img
                      src={`${import.meta.env.VITE_APP_BACKEND_URL}/${item.images[0]}`}
                      alt={item.name}
                      className="w-10 h-10 object-cover rounded bg-muted"
                    />
                    <span className="text-sm font-medium line-clamp-2">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="rounded-full"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Wishlist */}
          <Link to="/wishlist">
            <Button variant="ghost" size="icon" className="relative rounded-full">
              <Heart className="h-5 w-5" />
              {wishlist && wishlist.length > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px] rounded-full">
                  {wishlist.length}
                </Badge>
              )}
              <span className="sr-only">Wishlist</span>
            </Button>
          </Link>

          {/* Cart Drawer */}
          <CartDrawer itemCount={cart && cart.length}>
            <div className="flex flex-col h-full">
               {/* Cart items map will go here later */}
               <div className="flex-1 overflow-y-auto p-4">
                 <p className="text-sm text-muted-foreground text-center mt-10">Cart functionality integrated here.</p>
               </div>
            </div>
          </CartDrawer>

          {/* User Profile */}
          <Link to={isAuthenticated ? "/profile" : "/login"}>
            <Button variant="ghost" size="icon" className="rounded-full">
              {isAuthenticated ? (
                <img
                  src={`${import.meta.env.VITE_APP_BACKEND_URL}/${user?.avatar}`}
                  alt="avatar"
                  className="h-8 w-8 rounded-full object-cover border border-border"
                />
              ) : (
                <User className="h-5 w-5" />
              )}
              <span className="sr-only">Profile</span>
            </Button>
          </Link>

          {/* Seller CTA (Desktop only) */}
          <div className="hidden lg:block ml-2 border-l border-border pl-4">
            <Link to={isSeller ? "/dashboard" : "/shop-create"}>
              <Button variant={isSeller ? "default" : "secondary"} className="gap-2">
                {isSeller ? <LayoutDashboard className="h-4 w-4" /> : <Store className="h-4 w-4" />}
                {isSeller ? "Dashboard" : "Seller"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

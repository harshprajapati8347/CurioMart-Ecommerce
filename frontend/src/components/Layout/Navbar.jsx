import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetTitle, 
  SheetDescription 
} from "@/components/ui/sheet";
import { 
  NavigationMenu, 
  NavigationMenuList, 
  NavigationMenuItem, 
  NavigationMenuLink 
} from "@/components/ui/navigation-menu";
import { Menu, Search, Heart, ShoppingCart, User, Moon, Sun } from "lucide-react";
import { useSelector } from "react-redux";
import { navItems } from "../../static/data";
import { CartDrawer } from "../cart/CartDrawer";
import { useTheme } from "next-themes"; // Assume next-themes is installed per shadcn docs

const Navbar = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Mobile Hamburger Menu */}
        <Sheet>
          <SheetTrigger asChild className="lg:hidden mr-2">
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
            <nav className="flex flex-col gap-4 mt-6">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.url}
                  className={`text-lg font-medium transition-colors hover:text-primary ${
                    activeHeading === index + 1 ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <span className="font-display font-bold text-xl inline-block">
            CurioMart
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:flex-1">
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              {navItems.map((item, index) => (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink 
                    asChild
                    className={`group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50
                      ${activeHeading === index + 1 ? "bg-accent text-accent-foreground" : ""}
                    `}
                  >
                    <Link to={item.url}>
                      {item.title}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right Actions */}
        <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Search icon for mobile, input could go here for desktop */}
            <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </div>

          <nav className="flex items-center space-x-1">
            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Wishlist */}
            <Link to="/wishlist">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                {wishlist && wishlist.length > 0 && (
                  <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs rounded-full">
                    {wishlist.length}
                  </Badge>
                )}
                <span className="sr-only">Wishlist</span>
              </Button>
            </Link>

            {/* Cart Drawer */}
            <CartDrawer itemCount={cart && cart.length}>
              {/* Cart items map will go here later */}
              <div className="text-sm p-4">Cart items would render here.</div>
            </CartDrawer>

            {/* User Avatar */}
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
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

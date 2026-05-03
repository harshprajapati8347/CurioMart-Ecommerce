import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import { addToWishlist, removeFromWishlist } from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "./Ratings";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { PriceDisplay } from "@/components/ui/price-display";

const ProductDetails = ({ data }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(data && data?.shop._id));
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data, wishlist, dispatch]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      const sellerId = data.shop._id;
      await axios
        .post(`${import.meta.env.VITE_APP_SERVER_URL}/conversation/create-new-conversation`, {
          groupTitle, userId, sellerId,
        })
        .then((res) => {
          navigate(`/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("Please login to create a conversation");
    }
  };

  if (!data) return null;

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted border border-border">
              <img
                src={`${import.meta.env.VITE_APP_BACKEND_URL}/${data.images[select]}`}
                alt={data.name}
                className="w-full h-full object-contain mix-blend-multiply p-8"
              />
              {data.discountPrice && data.originalPrice && (
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground shadow-lg">
                  {Math.round(((data.originalPrice - data.discountPrice) / data.originalPrice) * 100)}% OFF
                </Badge>
              )}
            </div>

            {data.images && data.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {data.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelect(index)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all hover:opacity-80 ${
                      select === index ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <img
                      src={`${import.meta.env.VITE_APP_BACKEND_URL}/${image}`}
                      alt={`${data.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Details */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                {data.name}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Ratings rating={data?.ratings} />
                  <span className="text-sm text-muted-foreground">({data?.reviews?.length || 0} reviews)</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Brand: <Link to={`/shop/preview/${data?.shop._id}`} className="font-medium text-primary hover:underline">{data.shop.name}</Link>
                </div>
              </div>
            </div>

            <PriceDisplay 
              price={data.discountPrice} 
              originalPrice={data.originalPrice}
              size="lg"
            />

            {/* Mock Variant Selector */}
            <div className="space-y-4">
              <h3 className="font-medium text-foreground">Color</h3>
              <div className="flex gap-3">
                {['bg-slate-900', 'bg-blue-600', 'bg-red-600', 'bg-green-600'].map((color, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setSelectedVariant(idx)}
                    className={`w-10 h-10 rounded-full ${color} ring-offset-background transition-all ${
                      selectedVariant === idx ? 'ring-2 ring-primary ring-offset-2 scale-110' : 'hover:scale-105'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-foreground">Quantity</h3>
                <span className={`text-sm font-medium ${data.stock > 0 ? 'text-success' : 'text-destructive'}`}>
                  {data.stock > 0 ? `${data.stock} available` : 'Out of Stock'}
                </span>
              </div>
              <QuantityStepper 
                value={count} 
                onChange={setCount} 
                max={data.stock} 
                min={1} 
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button 
                size="lg" 
                className="flex-1 text-lg font-medium shadow-xl shadow-primary/20 hover:-translate-y-1 transition-transform"
                onClick={() => addToCartHandler(data._id)}
                disabled={data.stock < 1}
              >
                <AiOutlineShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className={`h-12 w-12 shrink-0 border-2 rounded-xl hover:-translate-y-1 transition-transform ${click ? 'text-destructive border-destructive/20 hover:bg-destructive/10 hover:text-destructive' : ''}`}
                onClick={() => click ? removeFromWishlistHandler(data) : addToWishlistHandler(data)}
              >
                {click ? <AiFillHeart className="w-6 h-6" /> : <AiOutlineHeart className="w-6 h-6" />}
              </Button>
            </div>
            
            <div className="rounded-xl border border-border p-6 bg-muted/50 mt-8 flex flex-col sm:flex-row items-center gap-6 justify-between">
               <div className="flex items-center gap-4">
                 <img src={`${import.meta.env.VITE_APP_BACKEND_URL}/${data?.shop?.avatar}`} alt={data.shop.name} className="w-14 h-14 rounded-full border border-border" />
                 <div>
                   <p className="font-medium text-foreground">Sold by {data.shop.name}</p>
                   <p className="text-sm text-muted-foreground mt-1">100% positive feedback</p>
                 </div>
               </div>
               <Button variant="secondary" onClick={handleMessageSubmit}>
                 <AiOutlineMessage className="w-4 h-4 mr-2" />
                 Message Seller
               </Button>
            </div>

          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-8 overflow-x-auto flex-nowrap">
              <TabsTrigger value="description" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-4 px-8 text-base">
                Description
              </TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-4 px-8 text-base">
                Reviews ({data.reviews?.length || 0})
              </TabsTrigger>
              <TabsTrigger value="shipping" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-4 px-8 text-base">
                Shipping & Returns
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="prose max-w-none prose-neutral text-muted-foreground animate-in fade-in duration-500">
              <div className="whitespace-pre-line text-base leading-relaxed">
                {data.description}
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="space-y-8 animate-in fade-in duration-500">
              {data.reviews && data.reviews.length > 0 ? (
                data.reviews.map((item, index) => (
                  <div key={index} className="flex gap-4 p-6 rounded-xl bg-muted/30 border border-border">
                    <img src={`${import.meta.env.VITE_APP_BACKEND_URL}/${item.user.avatar}`} alt="avatar" className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-foreground">{item.user.name}</h4>
                        <Ratings rating={item.rating} />
                      </div>
                      <p className="text-muted-foreground">{item.comment}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-16 px-4 bg-muted/30 rounded-xl border border-border border-dashed">
                  <h3 className="text-lg font-medium text-foreground mb-2">No reviews yet</h3>
                  <p className="text-muted-foreground mb-6">Be the first to review this product and help others make informed decisions.</p>
                  <Button variant="outline">Write a Review</Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="shipping" className="animate-in fade-in duration-500">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 rounded-xl bg-muted/30 border border-border">
                  <h3 className="font-semibold text-lg mb-4 flex items-center"><span className="text-primary mr-2">🚚</span> Shipping Info</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li>Free shipping on orders over $100</li>
                    <li>Standard delivery: 3-5 business days</li>
                    <li>Express delivery: 1-2 business days (+$15)</li>
                    <li>International shipping available to selected countries</li>
                  </ul>
                </div>
                <div className="p-6 rounded-xl bg-muted/30 border border-border">
                  <h3 className="font-semibold text-lg mb-4 flex items-center"><span className="text-primary mr-2">🔄</span> Returns Policy</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li>30-day hassle-free return policy</li>
                    <li>Item must be in original condition and packaging</li>
                    <li>Return shipping costs covered for defective items</li>
                    <li>Refunds processed within 5-7 business days</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

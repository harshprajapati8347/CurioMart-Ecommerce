import { Heart, ShoppingCart, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/ui/star-rating";

export function ProductCard({
  product = {
    id: 1,
    name: "Product Name",
    brand: "Brand",
    price: 99.99,
    originalPrice: 129.99,
    rating: 4.5,
    reviewCount: 120,
    image: "https://placehold.co/400x400/png",
    isNew: false,
    discount: 0,
  },
  onAddToCart,
  onQuickView,
  onAddToWishlist,
}) {
  return (
    <Card className="group relative overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-square overflow-hidden bg-muted rounded-t-lg">
        <img
          loading="lazy"
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Badge: NEW / SALE */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <Badge className="bg-success text-success-foreground hover:bg-success/90">
              New
            </Badge>
          )}
          {product.discount > 0 && (
            <Badge variant="destructive">-{product.discount}%</Badge>
          )}
        </div>
        {/* Hover actions overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4 gap-2">
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full shadow-sm hover:bg-white"
            onClick={onQuickView}
          >
            <Eye className="w-4 h-4 text-foreground" />
            <span className="sr-only">Quick View</span>
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full shadow-sm hover:bg-white"
            onClick={onAddToWishlist}
          >
            <Heart className="w-4 h-4 text-foreground" />
            <span className="sr-only">Add to Wishlist</span>
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
        <h3 className="font-medium text-sm line-clamp-2 mb-2 min-h-[40px]">
          {product.name}
        </h3>
        <StarRating
          rating={product.rating}
          count={product.reviewCount}
          size="sm"
        />
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-baseline flex-wrap gap-x-2">
            <span className="font-bold text-primary">
              ${Number(product.price).toFixed(2)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-muted-foreground line-through">
                ${Number(product.originalPrice).toFixed(2)}
              </span>
            )}
          </div>
          <Button
            size="sm"
            className="rounded-full shadow-sm"
            onClick={onAddToCart}
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

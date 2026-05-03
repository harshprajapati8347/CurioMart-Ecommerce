import React from "react";
import { cn } from "@/lib/utils";

export function PriceDisplay({ price, originalPrice, size = "md", className }) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl sm:text-4xl",
  };

  const discount = originalPrice && price < originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100) 
    : 0;

  return (
    <div className={cn("flex items-baseline gap-3 flex-wrap", className)}>
      <span className={cn("font-bold text-foreground", sizeClasses[size] || sizeClasses.md)}>
        IND₹{Number(price).toFixed(2)}
      </span>
      {originalPrice && price < originalPrice && (
        <>
          <span className="text-muted-foreground line-through text-lg">
            IND₹{Number(originalPrice).toFixed(2)}
          </span>
          <span className="text-sm font-semibold text-destructive bg-destructive/10 px-2 py-1 rounded-md">
            -{discount}%
          </span>
        </>
      )}
    </div>
  );
}

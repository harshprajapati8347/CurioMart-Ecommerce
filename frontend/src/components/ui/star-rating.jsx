import React from "react";
import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming cn utility is available based on shadcn usage

export function StarRating({ rating, count, size = "md", className }) {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const iconSizeClass = sizeClasses[size] || sizeClasses.md;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex text-amber-400">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className={cn("fill-current", iconSizeClass)} />
        ))}
        {hasHalfStar && <StarHalf className={cn("fill-current", iconSizeClass)} />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className={cn("text-muted-foreground/30", iconSizeClass)} />
        ))}
      </div>
      {count !== undefined && (
        <span className="text-xs text-muted-foreground ml-1">
          ({count})
        </span>
      )}
    </div>
  );
}

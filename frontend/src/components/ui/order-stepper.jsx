import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function OrderStepper({ steps, currentStep, className }) {
  return (
    <div className={cn("flex items-center w-full", className)}>
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;
        
        return (
          <React.Fragment key={step.title}>
            <div className="flex flex-col items-center relative">
              <div 
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm border-2 transition-colors z-10",
                  isCompleted ? "bg-primary border-primary text-primary-foreground" : 
                  isActive ? "bg-background border-primary text-primary" : 
                  "bg-muted border-muted-foreground/30 text-muted-foreground"
                )}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : stepNumber}
              </div>
              <span 
                className={cn(
                  "absolute -bottom-6 text-sm font-medium whitespace-nowrap",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                {step.title}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-4 bg-muted relative">
                <div 
                  className="absolute inset-0 bg-primary transition-all duration-500"
                  style={{ width: isCompleted ? "100%" : "0%" }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

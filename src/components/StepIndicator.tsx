import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
  completedSteps: number[];
}

export const StepIndicator = ({ steps, currentStep, completedSteps }: StepIndicatorProps) => {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-border -z-10">
          <div 
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${(Math.max(currentStep - 1, 0) / (steps.length - 1)) * 100}%` }}
          />
        </div>
        
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(index);
          const isCurrent = index === currentStep;
          const isPast = index < currentStep;
          
          return (
            <div key={index} className="flex flex-col items-center relative">
              <div
                className={cn(
                  "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                  {
                    "bg-success border-success": isCompleted,
                    "bg-primary border-primary": isCurrent && !isCompleted,
                    "bg-background border-primary": isPast && !isCompleted,
                    "bg-background border-border": !isCurrent && !isPast && !isCompleted,
                  }
                )}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 text-success-foreground" />
                ) : (
                  <span
                    className={cn(
                      "text-sm font-medium",
                      {
                        "text-primary-foreground": isCurrent,
                        "text-primary": isPast,
                        "text-muted-foreground": !isCurrent && !isPast,
                      }
                    )}
                  >
                    {index + 1}
                  </span>
                )}
              </div>
              <span
                className={cn(
                  "text-xs mt-2 text-center max-w-20 transition-colors duration-300",
                  {
                    "text-success font-medium": isCompleted,
                    "text-primary font-medium": isCurrent,
                    "text-foreground": isPast,
                    "text-muted-foreground": !isCurrent && !isPast,
                  }
                )}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
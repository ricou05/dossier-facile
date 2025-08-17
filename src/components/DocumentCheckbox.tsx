import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { InfoIcon, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface DocumentCheckboxProps {
  id: string;
  label: string;
  description?: string;
  required?: boolean;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  icon?: string;
}

export const DocumentCheckbox = ({
  id,
  label,
  description,
  required = false,
  checked,
  onChange,
  disabled = false,
}: DocumentCheckboxProps) => {
  return (
    <div className={cn(
      "flex items-start space-x-3 p-4 rounded-lg border transition-all duration-200",
      {
        "bg-success-light border-success": checked && !required,
        "bg-primary-light border-primary": required,
        "bg-card border-border hover:border-primary/50": !checked && !required,
        "opacity-50": disabled,
      }
    )}>
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled}
        className="mt-1"
      />
      
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <label 
            htmlFor={id}
            className={cn(
              "text-sm font-medium cursor-pointer",
              {
                "text-success": checked && !required,
                "text-primary": required,
                "cursor-not-allowed": disabled,
              }
            )}
          >
            {label}
          </label>
          
          {required && (
            <Badge variant="secondary" className="bg-primary text-primary-foreground text-xs">
              <AlertCircle className="w-3 h-3 mr-1" />
              Obligatoire
            </Badge>
          )}
        </div>
        
        {description && (
          <div className="flex items-start gap-2">
            <InfoIcon className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
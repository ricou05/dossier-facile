import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { REGISTRATION_TYPES } from "@/types/registration";

interface RegistrationTypeSelectorProps {
  onSelect: (typeId: string) => void;
}

export const RegistrationTypeSelector = ({ onSelect }: RegistrationTypeSelectorProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Quelle est votre situation ?
        </h2>
        <p className="text-muted-foreground">
          Sélectionnez le cas qui correspond le mieux à votre situation actuelle
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {REGISTRATION_TYPES.map((type) => (
          <Card 
            key={type.id} 
            className="cursor-pointer transition-all duration-200 hover:shadow-md hover:border-primary/50 group"
            onClick={() => onSelect(type.id)}
          >
            <CardHeader className="text-center">
              <div className="text-4xl mb-2">{type.icon}</div>
              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                {type.title}
              </CardTitle>
              <CardDescription className="text-sm">
                {type.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(type.id);
                }}
              >
                Choisir cette situation
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Card className="bg-warning-light border-warning/20">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              <strong>Votre situation ne correspond à aucun cas ?</strong><br />
              Nous vous conseillons de vous rapprocher de votre mairie qui pourra 
              vous orienter selon votre cas particulier.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
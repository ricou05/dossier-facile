import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface HostSubcaseStepProps {
  onConfirm: (info: { age: number; isParent: boolean }) => void;
  onPrevious: () => void;
}

export const HostSubcaseStep = ({ onConfirm, onPrevious }: HostSubcaseStepProps) => {
  const [relation, setRelation] = useState<"parent" | "other" | "">("");
  const [ageGroup, setAgeGroup] = useState<"under26" | "over26">("under26");

  const canContinue = relation === "other" || (relation === "parent");

  const handleContinue = () => {
    if (!canContinue) return;
    const isParent = relation === "parent";
    const age = isParent ? (ageGroup === "under26" ? 20 : 26) : 30;
    onConfirm({ age, isParent });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Précisez votre cas d'hébergement
        </h2>
        <p className="text-muted-foreground">
          Nous adapterons automatiquement la liste des documents à fournir
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>🏠</span> Où êtes-vous hébergé ?
          </CardTitle>
          <CardDescription>Choisissez l'option qui correspond à votre situation</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={relation}
            onValueChange={(v) => setRelation(v as any)}
            className="grid gap-4 md:grid-cols-2"
          >
            <div className="flex items-center space-x-2 p-4 border rounded-lg hover:border-primary transition-colors">
              <RadioGroupItem value="parent" id="rel-parent" />
              <Label htmlFor="rel-parent" className="cursor-pointer">
                👨‍👩‍👦 Chez un parent (père, mère)
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-4 border rounded-lg hover:border-primary transition-colors">
              <RadioGroupItem value="other" id="rel-other" />
              <Label htmlFor="rel-other" className="cursor-pointer">
                🤝 Chez une autre personne (ami, proche)
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {relation === "parent" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>🎂</span> Quel est votre âge ?
            </CardTitle>
            <CardDescription>Cette information permet d'appliquer les bonnes règles</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={ageGroup}
              onValueChange={(v) => setAgeGroup(v as any)}
              className="grid gap-4 md:grid-cols-2"
            >
              <div className="flex items-center space-x-2 p-4 border rounded-lg hover:border-primary transition-colors">
                <RadioGroupItem value="under26" id="age-under" />
                <Label htmlFor="age-under" className="cursor-pointer">
                  👦 Moins de 26 ans
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-4 border rounded-lg hover:border-primary transition-colors">
                <RadioGroupItem value="over26" id="age-over" />
                <Label htmlFor="age-over" className="cursor-pointer">
                  🧑 26 ans ou plus
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrevious}>
          Retour
        </Button>
        <Button onClick={handleContinue} disabled={!canContinue}>
          Continuer
        </Button>
      </div>
    </div>
  );
};
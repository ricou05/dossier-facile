import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { DocumentCheckbox } from "./DocumentCheckbox";
import { type RegistrationType } from "@/types/registration";

interface DocumentSelectorProps {
  registrationType: RegistrationType;
  selectedDocuments: string[];
  onSelectionChange: (documents: string[], isComplete: boolean) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const DocumentSelector = ({
  registrationType,
  selectedDocuments,
  onSelectionChange,
  onNext,
  onPrevious
}: DocumentSelectorProps) => {
  const [localSelection, setLocalSelection] = useState<Set<string>>(() => {
    const requiredDocIds = registrationType.documents.filter(doc => doc.required).map(doc => doc.id);
    return new Set([...selectedDocuments, ...requiredDocIds]);
  });

  useEffect(() => {
    const requiredDocIds = registrationType.documents.filter(doc => doc.required).map(doc => doc.id);
    const newSelection = new Set([...selectedDocuments, ...requiredDocIds]);
    setLocalSelection(newSelection);
    
    // Mettre à jour la sélection parent avec les documents obligatoires
    const newDocuments = Array.from(newSelection);
    const isComplete = validateSelection(newSelection);
    onSelectionChange(newDocuments, isComplete);
  }, [selectedDocuments, registrationType]);

  const handleDocumentToggle = (documentId: string, checked: boolean) => {
    const newSelection = new Set(localSelection);
    if (checked) {
      newSelection.add(documentId);
    } else {
      newSelection.delete(documentId);
    }
    setLocalSelection(newSelection);

    const newDocuments = Array.from(newSelection);
    const isComplete = validateSelection(newSelection);
    onSelectionChange(newDocuments, isComplete);
  };

  const validateSelection = (selection: Set<string>): boolean => {
    // Vérifier que tous les documents obligatoires sont sélectionnés
    const requiredDocs = registrationType.documents.filter(doc => doc.required);
    const hasAllRequired = requiredDocs.every(doc => selection.has(doc.id));

    if (!hasAllRequired) return false;

    // Vérifier les exigences par catégorie
    if (registrationType.minRequiredFromCategory) {
      for (const [category, minRequired] of Object.entries(registrationType.minRequiredFromCategory)) {
        const categoryDocs = registrationType.documents.filter(doc => doc.category === category);
        const selectedInCategory = categoryDocs.filter(doc => selection.has(doc.id)).length;
        if (selectedInCategory < minRequired) return false;
      }
    }

    return true;
  };

  const isComplete = validateSelection(localSelection);
  const requiredDocs = registrationType.documents.filter(doc => doc.required);
  const optionalDocs = registrationType.documents.filter(doc => !doc.required);

  // Grouper les documents optionnels par catégorie
  const groupedOptionalDocs = optionalDocs.reduce((acc, doc) => {
    if (!acc[doc.category]) {
      acc[doc.category] = [];
    }
    acc[doc.category].push(doc);
    return acc;
  }, {} as Record<string, typeof optionalDocs>);

  const getCategoryTitle = (category: string): string => {
    const titles: Record<string, string> = {
      address: 'Justificatifs de domicile',
      fiscal: 'Justificatifs fiscaux',
      activity: 'Justificatifs d\'activité',
      hosting: 'Justificatifs d\'hébergement',
      management: 'Justificatifs de gérance'
    };
    return titles[category] || 'Autres documents';
  };

  const getCategoryRequirement = (category: string): string => {
    const minRequired = registrationType.minRequiredFromCategory?.[category];
    if (minRequired) {
      const selectedCount = registrationType.documents
        .filter(doc => doc.category === category && localSelection.has(doc.id))
        .length;
      
      if (minRequired === 1) {
        return selectedCount >= 1 ? "✓ Au moins un requis" : "⚠️ Au moins un requis";
      }
      return selectedCount >= minRequired 
        ? `✓ Au moins ${minRequired} requis` 
        : `⚠️ Au moins ${minRequired} requis`;
    }
    return "";
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Documents nécessaires
        </h2>
        <p className="text-muted-foreground mb-4">
          Situation sélectionnée : <strong>{registrationType.title}</strong>
        </p>
        
        <div className="flex items-center justify-center gap-4">
          <Badge variant={isComplete ? "default" : "destructive"} className="px-4 py-2">
            {isComplete ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Dossier complet
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4 mr-2" />
                Documents manquants
              </>
            )}
          </Badge>
        </div>
      </div>

      {/* Documents obligatoires */}
      {requiredDocs.length > 0 && (
        <Card className="border-destructive/30 bg-destructive/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <span className="text-lg">🔒</span>
              Documents INCONTOURNABLES
            </CardTitle>
            <CardDescription>
              Ces documents sont obligatoires pour tous les dossiers de ce type
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {requiredDocs.map((doc) => (
              <DocumentCheckbox
                key={doc.id}
                id={doc.id}
                label={doc.label}
                description={doc.description}
                required={true}
                checked={true}
                onChange={() => {}}
                disabled={true}
                icon={doc.icon}
              />
            ))}
          </CardContent>
        </Card>
      )}

      {/* Documents optionnels par catégorie */}
      {Object.entries(groupedOptionalDocs).map(([category, docs]) => (
        <Card key={category} className="border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="text-lg">📄</span>
                {getCategoryTitle(category)}
              </CardTitle>
              {getCategoryRequirement(category) && (
                <Badge 
                  variant={getCategoryRequirement(category).startsWith('✓') ? "default" : "destructive"}
                  className="text-xs"
                >
                  {getCategoryRequirement(category)}
                </Badge>
              )}
            </div>
            <CardDescription>
              Sélectionnez les documents que vous possédez
              {category === "address" && (
                <div className="mt-2 text-xs text-warning flex items-center gap-1">
                  <span>⚠️</span>
                  Les factures de téléphone mobile ne sont pas acceptées seules
                </div>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {docs.map((doc) => (
              <DocumentCheckbox
                key={doc.id}
                id={doc.id}
                label={doc.label}
                description={doc.description}
                checked={localSelection.has(doc.id)}
                onChange={(checked) => handleDocumentToggle(doc.id, checked)}
                icon={doc.icon}
              />
            ))}
          </CardContent>
        </Card>
      ))}

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrevious}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>
        
        <Button 
          onClick={onNext} 
          disabled={!isComplete}
          className={isComplete ? "bg-success hover:bg-success/90" : ""}
        >
          Continuer
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};
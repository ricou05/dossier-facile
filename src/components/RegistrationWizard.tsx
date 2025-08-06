import { useState } from "react";
import { StepIndicator } from "./StepIndicator";
import { RegistrationTypeSelector } from "./RegistrationTypeSelector";
import { DocumentSelector } from "./DocumentSelector";
import { ResultSummary } from "./ResultSummary";
import { REGISTRATION_TYPES, type UserSelection } from "@/types/registration";

const STEPS = ["Situation", "Documents", "Vérification"];

export const RegistrationWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [userSelection, setUserSelection] = useState<UserSelection>({
    registrationType: '',
    selectedDocuments: [],
    isComplete: false
  });

  const handleTypeSelection = (typeId: string) => {
    setUserSelection(prev => ({
      ...prev,
      registrationType: typeId,
      selectedDocuments: [],
      isComplete: false
    }));
    
    if (!completedSteps.includes(0)) {
      setCompletedSteps(prev => [...prev, 0]);
    }
    setCurrentStep(1);
  };

  const handleDocumentSelection = (documents: string[], isComplete: boolean) => {
    setUserSelection(prev => ({
      ...prev,
      selectedDocuments: documents,
      isComplete
    }));

    if (isComplete && !completedSteps.includes(1)) {
      setCompletedSteps(prev => [...prev, 1]);
    }
  };

  const handleNext = () => {
    if (currentStep === 1 && userSelection.isComplete) {
      setCurrentStep(2);
      if (!completedSteps.includes(2)) {
        setCompletedSteps(prev => [...prev, 2]);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setCompletedSteps([]);
    setUserSelection({
      registrationType: '',
      selectedDocuments: [],
      isComplete: false
    });
  };

  const selectedType = REGISTRATION_TYPES.find(type => type.id === userSelection.registrationType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Mon Dossier Inscription Électorale
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Guide interactif et personnalisé pour constituer facilement votre dossier 
              d'inscription sur les listes électorales. Choisissez votre situation, 
              indiquez vos documents et obtenez votre checklist personnalisée.
            </p>
          </div>

          {/* Step Indicator */}
          <StepIndicator 
            steps={STEPS} 
            currentStep={currentStep} 
            completedSteps={completedSteps}
          />

          {/* Main Content */}
          <div className="bg-card rounded-xl shadow-lg p-8 mt-8">
            {currentStep === 0 && (
              <RegistrationTypeSelector onSelect={handleTypeSelection} />
            )}

            {currentStep === 1 && selectedType && (
              <DocumentSelector
                registrationType={selectedType}
                selectedDocuments={userSelection.selectedDocuments}
                onSelectionChange={handleDocumentSelection}
                onNext={handleNext}
                onPrevious={handlePrevious}
              />
            )}

            {currentStep === 2 && selectedType && (
              <ResultSummary
                registrationType={selectedType}
                selectedDocuments={userSelection.selectedDocuments}
                onRestart={handleRestart}
                onPrevious={handlePrevious}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
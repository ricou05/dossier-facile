import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowLeft, RotateCcw, Download, Printer, AlertTriangle } from "lucide-react";
import { type RegistrationType } from "@/types/registration";

interface ResultSummaryProps {
  registrationType: RegistrationType;
  selectedDocuments: string[];
  onRestart: () => void;
  onPrevious: () => void;
}

export const ResultSummary = ({
  registrationType,
  selectedDocuments,
  onRestart,
  onPrevious
}: ResultSummaryProps) => {
  const selectedDocsSet = new Set(selectedDocuments);
  const requiredDocs = registrationType.documents.filter(doc => doc.required);
  const selectedOptionalDocs = registrationType.documents.filter(
    doc => !doc.required && selectedDocsSet.has(doc.id)
  );

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    const checklist = [
      `CHECKLIST INSCRIPTION ÉLECTORALE`,
      `Situation : ${registrationType.title}`,
      `Date : ${new Date().toLocaleDateString('fr-FR')}`,
      ``,
      `DOCUMENTS À PRÉSENTER EN MAIRIE :`,
      ``,
      `Documents obligatoires :`,
      ...requiredDocs.map(doc => `☑️ ${doc.label}`),
      ``,
      `Documents sélectionnés :`,
      ...selectedOptionalDocs.map(doc => `☑️ ${doc.label}`),
      ``,
      `IMPORTANT :`,
      `- Présentez les documents originaux ou des copies certifiées conformes`,
      `- Vérifiez que vos justificatifs sont datés de moins de 3 mois quand requis`,
      `- N'hésitez pas à contacter votre mairie pour toute question`,
    ].join('\n');

    const blob = new Blob([checklist], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'checklist-inscription-electorale.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mb-4">
          <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Félicitations ! Votre dossier est complet
          </h2>
          <p className="text-muted-foreground">
            Voici le récapitulatif de votre checklist personnalisée pour l'inscription électorale
          </p>
        </div>
        
        <Badge variant="default" className="bg-success text-success-foreground px-4 py-2 text-base">
          <CheckCircle className="w-4 h-4 mr-2" />
          Dossier validé pour : {registrationType.title}
        </Badge>
      </div>

      {/* Checklist */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Documents obligatoires */}
        <Card className="border-success/20 bg-success-light">
          <CardHeader>
            <CardTitle className="text-success flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Documents obligatoires
            </CardTitle>
            <CardDescription>
              À présenter impérativement en mairie
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {requiredDocs.map((doc) => (
              <div key={doc.id} className="flex items-start gap-3 p-3 bg-background rounded-lg">
                <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">{doc.label}</p>
                  {doc.description && (
                    <p className="text-xs text-muted-foreground mt-1">{doc.description}</p>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Documents sélectionnés */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              Vos documents sélectionnés
            </CardTitle>
            <CardDescription>
              Documents que vous avez indiqué posséder
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {selectedOptionalDocs.length > 0 ? (
              selectedOptionalDocs.map((doc) => (
                <div key={doc.id} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">{doc.label}</p>
                    {doc.description && (
                      <p className="text-xs text-muted-foreground mt-1">{doc.description}</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground italic">
                Seuls les documents obligatoires sont requis pour votre situation
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Conseils */}
      <Card className="border-warning/20 bg-warning-light">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-warning">
            <AlertTriangle className="w-5 h-5" />
            Conseils importants
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <ul className="text-sm space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-warning">•</span>
              Présentez les <strong>documents originaux</strong> ou des copies certifiées conformes
            </li>
            <li className="flex items-start gap-2">
              <span className="text-warning">•</span>
              Vérifiez que vos justificatifs sont <strong>datés de moins de 3 mois</strong> quand requis
            </li>
            <li className="flex items-start gap-2">
              <span className="text-warning">•</span>
              Les documents doivent être <strong>à votre nom et à l'adresse de la commune</strong>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-warning">•</span>
              En cas de doute, <strong>contactez votre mairie</strong> avant de vous déplacer
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="outline" onClick={handlePrint}>
          <Printer className="w-4 h-4 mr-2" />
          Imprimer
        </Button>
        
        <Button variant="outline" onClick={handleExport}>
          <Download className="w-4 h-4 mr-2" />
          Télécharger la checklist
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between pt-6 border-t">
        <Button variant="outline" onClick={onPrevious} className="order-1 sm:order-1">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Modifier mes documents
        </Button>
        
        <Button variant="outline" onClick={onRestart} className="order-2 sm:order-2">
          <RotateCcw className="w-4 h-4 mr-2" />
          Nouvelle simulation
        </Button>
      </div>
    </div>
  );
};
// Types pour les situations de logement
export interface HousingSituation {
  id: string;
  label: string;
  description?: string;
  ageRestriction?: {
    min?: number;
    max?: number;
  };
  requiredDocuments: DocumentRequirement[];
}

export interface DocumentRequirement {
  id: string;
  label: string;
  description?: string;
  mandatory: boolean;
}

// Configuration des situations de logement regroupées
export const HOUSING_SITUATIONS: HousingSituation[] = [
  {
    id: "hosted_by_friend_or_family",
    label: "Logé chez un ami ou un proche",
    description: "3 cas de figure selon votre âge et le lien avec l'hébergeant",
    requiredDocuments: [] // Documents dynamiques selon le sous-cas
  },
  // ... autres situations existantes
];

// Sous-cas pour "Logé chez un ami ou un proche"
export const HOSTED_SUBCASES = {
  // Cas 1: Chez une autre personne (non-parent)
  hosted_by_other: {
    id: "hosted_by_other",
    label: "Logé chez une autre personne (tiers, autre qu'un parent)",
    ageRestriction: null, // Tout âge
    requiredDocuments: [
      {
        id: "hosted_person_id",
        label: "Pièce d'identité du demandeur (hébergé)",
        mandatory: true
      },
      {
        id: "hosting_attestation",
        label: "Attestation d'hébergement manuscrite, signée et datée de moins de 3 mois",
        description: "Par la personne qui héberge",
        mandatory: true
      },
      {
        id: "host_id_copy",
        label: "Copie de la pièce d'identité de l'hébergeant",
        mandatory: true
      },
      {
        id: "host_address_proof",
        label: "Justificatif de domicile récent (moins de 3 mois) au nom de l'hébergeant",
        description: "Facture eau, électricité, quittance, etc.",
        mandatory: true
      }
    ]
  },

  // Cas 2: Enfant majeur chez parent (moins de 26 ans)
  adult_child_under_26: {
    id: "adult_child_under_26",
    label: "Enfant majeur logé chez un parent",
    ageRestriction: { min: 18, max: 25 },
    requiredDocuments: [
      {
        id: "young_adult_id",
        label: "Pièce d'identité du jeune majeur",
        mandatory: true
      },
      {
        id: "parent_address_proof",
        label: "Justificatif de domicile du parent (moins de 3 mois)",
        description: "Facture, quittance, avis d'imposition dans la commune",
        mandatory: true
      },
      {
        id: "filiation_proof",
        label: "Preuve du lien de filiation",
        description: "Copie du livret de famille ou acte de naissance mentionnant les parents",
        mandatory: true
      }
    ],
    note: "Aucune attestation d'hébergement manuscrite nécessaire car le lien familial suffit"
  },

  // Cas 3: Enfant majeur chez parent (26 ans ou plus)
  adult_child_26_plus: {
    id: "adult_child_26_plus", 
    label: "Enfant majeur logé chez un parent",
    ageRestriction: { min: 26 },
    requiredDocuments: [
      {
        id: "adult_child_id",
        label: "Pièce d'identité du demandeur",
        mandatory: true
      },
      {
        id: "parent_hosting_attestation",
        label: "Attestation d'hébergement manuscrite du parent",
        description: "Signée et datée de moins de 3 mois",
        mandatory: true
      },
      {
        id: "municipality_link_proof",
        label: "Document prouvant votre lien avec la commune",
        description: "Bulletin de salaire récent, facture, relevé CAF à votre nom et à l'adresse",
        mandatory: true
      },
      {
        id: "parent_id_copy",
        label: "Copie de la pièce d'identité du parent hébergeant",
        mandatory: true
      }
    ],
    note: "Au-delà de 26 ans, le lien familial ne suffit plus. L'attestation d'hébergement est obligatoire."
  }
};

// Fonction pour déterminer le sous-cas selon l'âge et la relation
export function getHostingSubcase(age: number, isParent: boolean): string {
  if (!isParent) {
    return "hosted_by_other";
  }
  
  if (age >= 18 && age < 26) {
    return "adult_child_under_26";
  }
  
  if (age >= 26) {
    return "adult_child_26_plus";
  }
  
  // Cas par défaut
  return "hosted_by_other";
}

// Composant pour afficher les documents requis selon le sous-cas
export function getRequiredDocuments(subcase: string, age?: number, isParent?: boolean) {
  if (subcase === "hosted_by_friend_or_family" && age !== undefined && isParent !== undefined) {
    const subcaseKey = getHostingSubcase(age, isParent);
    return HOSTED_SUBCASES[subcaseKey as keyof typeof HOSTED_SUBCASES]?.requiredDocuments || [];
  }
  
  return HOSTED_SUBCASES[subcase as keyof typeof HOSTED_SUBCASES]?.requiredDocuments || [];
}

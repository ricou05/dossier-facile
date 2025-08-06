export interface Document {
  id: string;
  label: string;
  description?: string;
  required: boolean;
  category: 'identity' | 'address' | 'fiscal' | 'activity' | 'hosting' | 'management';
}

export interface RegistrationType {
  id: string;
  title: string;
  description: string;
  icon: string;
  documents: Document[];
  minRequiredFromCategory?: Record<string, number>;
}

export interface UserSelection {
  registrationType: string;
  selectedDocuments: string[];
  isComplete: boolean;
}

export const REGISTRATION_TYPES: RegistrationType[] = [
  {
    id: 'residence_principale',
    title: 'Résidence principale',
    description: 'Vous habitez principalement dans cette commune',
    icon: '🏠',
    documents: [
      {
        id: 'identity',
        label: 'Pièce d\'identité',
        description: 'Carte d\'identité valide ou périmée depuis moins de 5 ans, ou passeport valide',
        required: true,
        category: 'identity'
      },
      {
        id: 'facture_eau',
        label: 'Facture d\'eau',
        description: 'Facture à votre nom, datée de moins de 3 mois',
        required: false,
        category: 'address'
      },
      {
        id: 'facture_electricite',
        label: 'Facture d\'électricité',
        description: 'Facture à votre nom, datée de moins de 3 mois',
        required: false,
        category: 'address'
      },
      {
        id: 'facture_gaz',
        label: 'Facture de gaz',
        description: 'Facture à votre nom, datée de moins de 3 mois',
        required: false,
        category: 'address'
      },
      {
        id: 'facture_telephone',
        label: 'Facture téléphone fixe',
        description: 'Facture à votre nom, datée de moins de 3 mois',
        required: false,
        category: 'address'
      },
      {
        id: 'facture_internet',
        label: 'Facture internet',
        description: 'Facture à votre nom, datée de moins de 3 mois',
        required: false,
        category: 'address'
      },
      {
        id: 'quittance_loyer',
        label: 'Quittance de loyer',
        description: 'Quittance non manuscrite, datée de moins de 3 mois',
        required: false,
        category: 'address'
      },
      {
        id: 'contrat_bail',
        label: 'Contrat de bail',
        description: 'Si bail de moins d\'un an, joindre une quittance récente',
        required: false,
        category: 'address'
      },
      {
        id: 'assurance_habitation',
        label: 'Attestation assurance habitation',
        description: 'Attestation à votre nom, datée de moins de 3 mois',
        required: false,
        category: 'address'
      },
      {
        id: 'taxe_habitation',
        label: 'Taxe d\'habitation ou foncière',
        description: 'Avis d\'imposition ou attestation du rôle des impôts locaux',
        required: false,
        category: 'address'
      },
      {
        id: 'acte_propriete',
        label: 'Acte de propriété + facture',
        description: 'Acte de propriété accompagné d\'une facture récente',
        required: false,
        category: 'address'
      },
      {
        id: 'releve_caf',
        label: 'Relevé CAF',
        description: 'Relevé de prestations CAF de moins d\'un an',
        required: false,
        category: 'address'
      },
      {
        id: 'avis_imposition',
        label: 'Avis d\'imposition',
        description: 'Dernier avis d\'imposition sur le revenu',
        required: false,
        category: 'address'
      }
    ],
    minRequiredFromCategory: { address: 1 }
  },
  {
    id: 'residence_secondaire',
    title: 'Résidence secondaire',
    description: 'Propriétaire non résident permanent dans la commune',
    icon: '🏡',
    documents: [
      {
        id: 'identity',
        label: 'Pièce d\'identité',
        description: 'Carte d\'identité valide ou périmée depuis moins de 5 ans, ou passeport valide',
        required: true,
        category: 'identity'
      },
      {
        id: 'taxe_fonciere_n1',
        label: 'Taxe foncière année N-1',
        description: 'Avis de taxe foncière de l\'année précédente',
        required: false,
        category: 'fiscal'
      },
      {
        id: 'taxe_fonciere_n2',
        label: 'Taxe foncière année N-2',
        description: 'Avis de taxe foncière d\'il y a deux ans',
        required: false,
        category: 'fiscal'
      },
      {
        id: 'attestation_dgfip',
        label: 'Attestation DGFIP',
        description: 'Attestation DGFIP couvrant 2 années consécutives',
        required: false,
        category: 'fiscal'
      }
    ],
    minRequiredFromCategory: { fiscal: 1 }
  },
  {
    id: 'commercant',
    title: 'Commerçant/Artisan',
    description: 'Activité commerciale ou artisanale dans la commune',
    icon: '🏪',
    documents: [
      {
        id: 'identity',
        label: 'Pièce d\'identité',
        description: 'Carte d\'identité valide ou périmée depuis moins de 5 ans, ou passeport valide',
        required: true,
        category: 'identity'
      },
      {
        id: 'kbis',
        label: 'Extrait Kbis',
        description: 'Extrait Kbis de plus de 2 ans d\'ancienneté',
        required: false,
        category: 'activity'
      },
      {
        id: 'registre_metiers',
        label: 'Registre des métiers',
        description: 'Inscription au registre des métiers de plus de 2 ans',
        required: false,
        category: 'activity'
      },
      {
        id: 'bail_commercial',
        label: 'Bail commercial',
        description: 'Bail commercial de plus de 2 ans',
        required: false,
        category: 'activity'
      },
      {
        id: 'cet_n1',
        label: 'Contribution économique territoriale N-1',
        description: 'Avis de contribution économique territoriale année précédente',
        required: false,
        category: 'fiscal'
      },
      {
        id: 'cet_n2',
        label: 'Contribution économique territoriale N-2',
        description: 'Avis de contribution économique territoriale d\'il y a deux ans',
        required: false,
        category: 'fiscal'
      },
      {
        id: 'attestation_dgfip_pro',
        label: 'Attestation DGFIP professionnelle',
        description: 'Attestation DGFIP mentionnant 2 ans d\'ancienneté minimum',
        required: false,
        category: 'fiscal'
      }
    ],
    minRequiredFromCategory: { activity: 1, fiscal: 1 }
  },
  {
    id: 'gerant_sci',
    title: 'Gérant(e) de SCI',
    description: 'Gérant d\'une SCI propriétaire dans la commune',
    icon: '🏢',
    documents: [
      {
        id: 'identity',
        label: 'Pièce d\'identité',
        description: 'Carte d\'identité valide ou périmée depuis moins de 5 ans, ou passeport valide',
        required: true,
        category: 'identity'
      },
      {
        id: 'attestation_gerance',
        label: 'Attestation sur l\'honneur de gérance',
        description: 'Attestation sur l\'honneur de gérance ininterrompue de plus de 2 ans',
        required: true,
        category: 'management'
      },
      {
        id: 'statuts_sci',
        label: 'Statuts SCI',
        description: 'Statuts nommant le gérant avec date de prise de fonction',
        required: false,
        category: 'management'
      },
      {
        id: 'decision_nomination',
        label: 'Décision de nomination',
        description: 'Décision de nomination ou procès-verbal avec date',
        required: false,
        category: 'management'
      },
      {
        id: 'taxe_fonciere_sci_n1',
        label: 'Taxe foncière SCI année N-1',
        description: 'Avis de taxe foncière de la SCI année précédente',
        required: false,
        category: 'fiscal'
      },
      {
        id: 'taxe_fonciere_sci_n2',
        label: 'Taxe foncière SCI année N-2',
        description: 'Avis de taxe foncière de la SCI d\'il y a deux ans',
        required: false,
        category: 'fiscal'
      },
      {
        id: 'attestation_dgfip_sci',
        label: 'Attestation DGFIP SCI',
        description: 'Attestation DGFIP de la SCI sur 2 années consécutives',
        required: false,
        category: 'fiscal'
      }
    ],
    minRequiredFromCategory: { management: 1, fiscal: 1 }
  },
  {
    id: 'heberge_famille',
    title: 'Hébergé chez un parent/tiers',
    description: 'Enfant majeur hébergé chez ses parents ou chez un tiers',
    icon: '👨‍👩‍👧‍👦',
    documents: [
      {
        id: 'identity',
        label: 'Pièce d\'identité du demandeur',
        description: 'Votre carte d\'identité valide ou périmée depuis moins de 5 ans',
        required: true,
        category: 'identity'
      },
      {
        id: 'attestation_hebergement',
        label: 'Attestation d\'hébergement',
        description: 'Attestation signée par l\'hébergeant, datée de moins de 3 mois',
        required: true,
        category: 'hosting'
      },
      {
        id: 'identity_hebergeant',
        label: 'Pièce d\'identité de l\'hébergeant',
        description: 'Carte d\'identité ou passeport de la personne qui vous héberge',
        required: true,
        category: 'hosting'
      },
      {
        id: 'justificatif_hebergeant',
        label: 'Justificatif de domicile de l\'hébergeant',
        description: 'Facture ou justificatif au nom de l\'hébergeant, de moins de 3 mois',
        required: true,
        category: 'hosting'
      },
      {
        id: 'lien_parente',
        label: 'Preuve du lien de parenté',
        description: 'Livret de famille ou acte de naissance (si hébergement parental uniquement)',
        required: false,
        category: 'hosting'
      }
    ]
  },
  {
    id: 'foyer',
    title: 'Hébergé en foyer/structure',
    description: 'Hébergement dans un foyer ou une structure spécialisée',
    icon: '🏠',
    documents: [
      {
        id: 'identity',
        label: 'Pièce d\'identité',
        description: 'Carte d\'identité valide ou périmée depuis moins de 5 ans, ou passeport valide',
        required: true,
        category: 'identity'
      },
      {
        id: 'attestation_structure',
        label: 'Attestation d\'hébergement de la structure',
        description: 'Attestation délivrée par le foyer ou la structure d\'hébergement',
        required: true,
        category: 'hosting'
      },
      {
        id: 'justificatif_structure',
        label: 'Justificatif de domicile de la structure',
        description: 'Justificatif de domicile au nom de la structure',
        required: true,
        category: 'hosting'
      },
      {
        id: 'identity_responsable',
        label: 'Pièce d\'identité du responsable',
        description: 'Pièce d\'identité du responsable du foyer (parfois demandée)',
        required: false,
        category: 'hosting'
      }
    ]
  }
];
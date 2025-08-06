export interface Document {
  id: string;
  label: string;
  description?: string;
  required: boolean;
  category: string;
  icon?: string;
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
    id: "residence-principale",
    title: "Résidence principale",
    description: "Vous habitez dans la commune de façon permanente",
    icon: "🏠",
    documents: [
      {
        id: "identity",
        label: "Pièce d'identité",
        description: "CNI valide ou périmée depuis moins de 5 ans, ou passeport valide",
        required: true,
        category: "identity",
        icon: "🪪"
      },
      {
        id: "water-bill",
        label: "Facture d'eau",
        description: "À votre nom, adresse dans la commune, datée de moins de 3 mois",
        required: false,
        category: "address",
        icon: "💧"
      },
      {
        id: "electricity-bill",
        label: "Facture d'électricité",
        description: "À votre nom, adresse dans la commune, datée de moins de 3 mois",
        required: false,
        category: "address",
        icon: "⚡"
      },
      {
        id: "gas-bill",
        label: "Facture de gaz",
        description: "À votre nom, adresse dans la commune, datée de moins de 3 mois",
        required: false,
        category: "address",
        icon: "🔥"
      },
      {
        id: "landline-bill",
        label: "Facture de téléphone fixe",
        description: "À votre nom, adresse dans la commune, datée de moins de 3 mois",
        required: false,
        category: "address",
        icon: "☎️"
      },
      {
        id: "internet-bill",
        label: "Facture internet (ADSL/fibre)",
        description: "À votre nom, adresse dans la commune, datée de moins de 3 mois",
        required: false,
        category: "address",
        icon: "🌐"
      },
      {
        id: "rent-receipt",
        label: "Quittance de loyer",
        description: "Non manuscrite, à votre nom, datée de moins de 3 mois",
        required: false,
        category: "address",
        icon: "🧾"
      },
      {
        id: "lease-contract",
        label: "Contrat de bail",
        description: "Si moins d'un an, joindre une quittance récente",
        required: false,
        category: "address",
        icon: "📝"
      },
      {
        id: "home-insurance",
        label: "Attestation assurance habitation",
        description: "À votre nom, adresse dans la commune, datée de moins de 3 mois",
        required: false,
        category: "address",
        icon: "🛡️"
      },
      {
        id: "property-tax",
        label: "Avis taxe foncière ou taxe d'habitation",
        description: "Document officiel prouvant votre domicile",
        required: false,
        category: "address",
        icon: "📋"
      },
      {
        id: "property-deed",
        label: "Acte de propriété",
        description: "Souvent accompagné d'une facture récente",
        required: false,
        category: "address",
        icon: "🏠"
      },
      {
        id: "caf-statement",
        label: "Relevé CAF",
        description: "Daté de moins d'un an",
        required: false,
        category: "address",
        icon: "🏦"
      },
      {
        id: "tax-notice",
        label: "Avis d'imposition récent",
        description: "Document fiscal officiel",
        required: false,
        category: "address",
        icon: "💼"
      }
    ],
    minRequiredFromCategory: {
      address: 1
    }
  },
  {
    id: "residence-secondaire",
    title: "Résidence secondaire / Contribuable local",
    description: "Vous êtes propriétaire d'une résidence secondaire ou contribuable local",
    icon: "🏡",
    documents: [
      {
        id: "identity",
        label: "Pièce d'identité",
        description: "CNI valide ou périmée depuis moins de 5 ans, ou passeport valide",
        required: true,
        category: "identity",
        icon: "🪪"
      },
      {
        id: "property-tax-n1",
        label: "Avis de taxe foncière année N-1",
        description: "Sur la résidence secondaire dans la commune",
        required: false,
        category: "fiscal",
        icon: "📋"
      },
      {
        id: "property-tax-n2",
        label: "Avis de taxe foncière année N-2",
        description: "Sur la résidence secondaire dans la commune",
        required: false,
        category: "fiscal",
        icon: "📋"
      },
      {
        id: "dgfip-certificate",
        label: "Attestation DGFIP",
        description: "Prouvant l'imposition continue sur 2 ans",
        required: false,
        category: "fiscal",
        icon: "🏛️"
      }
    ],
    minRequiredFromCategory: {
      fiscal: 2
    }
  },
  {
    id: "chef-entreprise",
    title: "Chef d'entreprise / Gérant / Associé dirigeant",
    description: "Vous dirigez une entreprise dans la commune depuis plus de 2 ans",
    icon: "🏢",
    documents: [
      {
        id: "identity",
        label: "Pièce d'identité",
        description: "CNI valide ou périmée depuis moins de 5 ans, ou passeport valide",
        required: true,
        category: "identity",
        icon: "🪪"
      },
      {
        id: "kbis",
        label: "Extrait Kbis",
        description: "Datant de plus de 2 ans prouvant votre fonction",
        required: false,
        category: "activity",
        icon: "📜"
      },
      {
        id: "craft-register",
        label: "Registre des métiers",
        description: "Immatriculation de plus de 2 ans",
        required: false,
        category: "activity",
        icon: "🔨"
      },
      {
        id: "commercial-lease",
        label: "Bail commercial",
        description: "De plus de 2 ans dans la commune",
        required: false,
        category: "activity",
        icon: "🏪"
      },
      {
        id: "company-statutes",
        label: "Statuts de société",
        description: "Mentionnant votre nomination, datés de plus de 2 ans",
        required: false,
        category: "management",
        icon: "📝"
      },
      {
        id: "nomination-decision",
        label: "Décision de nomination",
        description: "Procès-verbal datant de plus de 2 ans",
        required: false,
        category: "management",
        icon: "⚖️"
      },
      {
        id: "cfe-n1",
        label: "Avis CFE année N-1",
        description: "Contribution économique territoriale",
        required: false,
        category: "fiscal",
        icon: "💼"
      },
      {
        id: "cfe-n2",
        label: "Avis CFE année N-2",
        description: "Contribution économique territoriale",
        required: false,
        category: "fiscal",
        icon: "💼"
      },
      {
        id: "continuity-attestation",
        label: "Attestation sur l'honneur",
        description: "De continuité de fonction sur plus de 2 ans",
        required: true,
        category: "management",
        icon: "✍️"
      }
    ],
    minRequiredFromCategory: {
      activity: 1,
      fiscal: 2
    }
  },
  {
    id: "enfant-heberge",
    title: "Enfant majeur (-26 ans) hébergé chez ses parents",
    description: "Vous êtes majeur de moins de 26 ans et hébergé chez vos parents",
    icon: "👦",
    documents: [
      {
        id: "identity",
        label: "Pièce d'identité de l'enfant",
        description: "CNI valide ou périmée depuis moins de 5 ans, ou passeport valide",
        required: true,
        category: "identity",
        icon: "🪪"
      },
      {
        id: "parent-address-proof",
        label: "Justificatif de domicile du parent",
        description: "Daté de moins de 3 mois",
        required: true,
        category: "hosting",
        icon: "📄"
      },
      {
        id: "family-link",
        label: "Preuve de filiation",
        description: "Livret de famille ou acte de naissance",
        required: true,
        category: "hosting",
        icon: "👨‍👩‍👦"
      }
    ]
  },
  {
    id: "heberge-tiers",
    title: "Hébergé chez un tiers",
    description: "Vous êtes hébergé chez une personne autre qu'un parent",
    icon: "🤝",
    documents: [
      {
        id: "identity",
        label: "Pièce d'identité de l'hébergé",
        description: "CNI valide ou périmée depuis moins de 5 ans, ou passeport valide",
        required: true,
        category: "identity",
        icon: "🪪"
      },
      {
        id: "hosting-attestation",
        label: "Attestation d'hébergement",
        description: "Signée par l'hébergeant, datée de moins de 3 mois",
        required: true,
        category: "hosting",
        icon: "🏠"
      },
      {
        id: "host-identity",
        label: "Pièce d'identité de l'hébergeant",
        description: "CNI ou passeport de la personne qui vous héberge",
        required: true,
        category: "hosting",
        icon: "🪪"
      },
      {
        id: "host-address-proof",
        label: "Justificatif de domicile de l'hébergeant",
        description: "Daté de moins de 3 mois",
        required: true,
        category: "hosting",
        icon: "📄"
      }
    ]
  },
  {
    id: "heberge-etablissement",
    title: "Hébergé en établissement",
    description: "Vous êtes hébergé en maison de retraite, foyer ou établissement",
    icon: "🏨",
    documents: [
      {
        id: "identity",
        label: "Pièce d'identité",
        description: "CNI valide ou périmée depuis moins de 5 ans, ou passeport valide",
        required: true,
        category: "identity",
        icon: "🪪"
      },
      {
        id: "establishment-attestation",
        label: "Attestation du directeur d'établissement",
        description: "Datée de moins de 3 mois",
        required: true,
        category: "hosting",
        icon: "🏨"
      }
    ]
  },
  {
    id: "autres-attaches",
    title: "Autres attaches",
    description: "Marinier, domicile association, ou autres situations particulières",
    icon: "⚓",
    documents: [
      {
        id: "identity",
        label: "Pièce d'identité",
        description: "CNI valide ou périmée depuis moins de 5 ans, ou passeport valide",
        required: true,
        category: "identity",
        icon: "🪪"
      },
      {
        id: "specific-document",
        label: "Document spécifique selon attache",
        description: "Contrat marinier, attestation d'association domiciliataire...",
        required: true,
        category: "special",
        icon: "📄"
      }
    ]
  },
  {
    id: "francais-etranger",
    title: "Français à l'étranger / Citoyen UE",
    description: "Vous résidez à l'étranger ou êtes citoyen de l'Union Européenne",
    icon: "🌍",
    documents: [
      {
        id: "identity",
        label: "Carte d'identité ou passeport",
        description: "En cours de validité",
        required: true,
        category: "identity",
        icon: "🪪"
      },
      {
        id: "consular-address",
        label: "Justificatif d'adresse selon consulat",
        description: "Document attestant de votre adresse",
        required: false,
        category: "address",
        icon: "📄"
      },
      {
        id: "honor-declaration",
        label: "Déclaration sur l'honneur",
        description: "Selon votre profil spécifique",
        required: false,
        category: "special",
        icon: "📝"
      }
    ]
  },
  {
    id: "autre",
    title: "Autre situation",
    description: "Votre situation ne correspond pas aux cas précédents",
    icon: "❓",
    documents: [
      {
        id: "identity",
        label: "Pièce d'identité",
        description: "CNI valide ou périmée depuis moins de 5 ans, ou passeport valide",
        required: true,
        category: "identity",
        icon: "🪪"
      }
    ]
  }
];
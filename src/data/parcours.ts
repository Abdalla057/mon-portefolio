import type { LucideIcon } from "lucide-react";
import { Award, BookOpen, GraduationCap, Network, Wrench } from "lucide-react";

// ------------------------------------------------------------------
// DONNÉES DU PARCOURS
// Toutes les informations affichées dans les sections "Parcours",
// "Expériences" et "Entreprises" sont centralisées ici.
// Modifie uniquement ce fichier pour mettre le contenu à jour.
// ------------------------------------------------------------------

export type AcademicEntry = {
  id: string;
  period: string;
  title: string;
  school: string;
  description: string;
  status?: string;
  icon: LucideIcon;
};

export type Stage = {
  id: string;
  period: string;
  duration: string;
  title: string;
  focus: string;
  missions: string[];
  skills: string[];
  icon: LucideIcon;
};

export type Entreprise = {
  id: string;
  stageId: string;
  name: string;
  logo: string;
  period: string;
  domain: string;
};

export const FORMATION: AcademicEntry[] = [
  {
    id: "baccalaureat",
    period: "2022 – 2023",
    title: "Baccalauréat",
    school: "Nafooré",
    description: "Obtention du diplôme de Baccalauréat.",
    status: "Diplômé",
    icon: GraduationCap,
  },
  {
    id: "licence-1",
    period: "2023 – 2024",
    title: "Licence 1 — Génie informatique",
    school: "Unipro (Univers Professionnel)",
    description: "Première année de Licence en Génie informatique.",
    icon: BookOpen,
  },
  {
    id: "licence-2",
    period: "2024 – 2025",
    title: "Licence 2 — Génie informatique",
    school: "Unipro (Univers Professionnel)",
    description: "Deuxième année de Licence en Génie informatique.",
    icon: BookOpen,
  },
  {
    id: "licence-3",
    period: "2025 – 2026",
    title: "Licence — Génie informatique",
    school: "Unipro (Univers Professionnel)",
    description: "Obtention de la Licence en Génie informatique.",
    status: "Diplômé",
    icon: Award,
  },
];

export const STAGES: Stage[] = [
  {
    id: "stage-2024",
    period: "2024",
    duration: "6 mois",
    title: "Stage 2024",
    focus: "Maintenance informatique, infographie & WordPress",
    missions: [
      "Maintenance informatique matérielle et logicielle.",
      "Initiation à l'infographie.",
      "Création et gestion de sites web avec WordPress.",
    ],
    skills: [
      "Maintenance informatique",
      "Découverte des outils graphiques",
      "Gestion de sites web",
      "Adaptation à un environnement professionnel",
    ],
    icon: Wrench,
  },
  {
    id: "stage-2025",
    period: "2025",
    duration: " 4 mois",
    title: "Stage 2025",
    focus: "Diagnostic & résolution d'incidents réseau",
    missions: [
      "Détection et diagnostic des problèmes liés aux réseaux informatiques.",
      "Participation à la résolution des incidents réseau et à l'amélioration de leur fonctionnement.",
      "Collaboration avec une équipe dans un environnement professionnel.",
    ],
    skills: [
      "Diagnostic réseau",
      "Analyse et résolution de problèmes techniques",
      "Assistance informatique",
      "Travail en équipe",
    ],
    icon: Network,
  },
];

// Les noms, logos et domaines d'activité ne figurent pas dans le CV :
// remplace simplement les valeurs ci-dessous par les informations réelles.
// Pour un logo, dépose l'image dans public/images/entreprises/ puis renseigne
// le chemin, par exemple : "/images/entreprises/entreprise-2024.png".
export const ENTREPRISES: Entreprise[] = [
  {
    id: "entreprise-2024",
    stageId: "stage-2024",
    name: "TGI",
    logo: "",
    period: "Stage 2024 · 6 mois",
    domain: "Services informatiques et solutions numériques",
  },
  {
    id: "entreprise-2025",
    stageId: "stage-2025",
    name: "AIGLIX",
    logo: " ",
    period: "Stage 2025 · 4 mois",
    domain: "Informatique, réseaux et infrastructures numériques.",
  },
];

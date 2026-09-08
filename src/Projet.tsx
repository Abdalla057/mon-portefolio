import React, { useState } from "react";
import {  ArrowRight, ImageOff } from "lucide-react";

// Même logique que la page Compétences : fond violet foncé en arrière-plan
// de page (cohérence avec le reste du site), carte claire pour le contenu
// (cohérence avec la maquette "My Projects").
const colors = {
  canvas: "#1b1130",
  blobOrange: "#ff7a3d",
  blobViolet: "#7c4dff",
  card: "#fffaf3",
  cardSoft: "#fbf5ec",
  ink: "#1e1810",
  inkSoft: "#6f6355",
  inkFaint: "#a89c8b",
  accent: "#ff6a2b",
  accentDeep: "#e04f16",
  accentSoft: "#ffe3cd",
  line: "#ece2d3",
};

const fonts = {
  display: "'Space Grotesk', sans-serif",
  body: "'Inter', sans-serif",
  mono: "'JetBrains Mono', monospace",
};

// Projets à afficher : "image" = chemin vers ta capture d'écran (à déposer
// toi-même dans public/images/projects/), "codeUrl"/"demoUrl" = tes liens réels.
const PROJECTS = [
  {
    title: "Plateforme de l'apprentissage islamique en ligne",
    description: "Plateforme de l'apprentissage islamique en ligne complète avec un abonnement intégré et suivi des gestions de cours.",
    image: "/images/project/islamique.png",
    tags: ["React", "Node.js"],
   
  },
  {
    title: "Application de e-commerce",
    description: "Application de e-commerce avec gestion des produits, commandes et paiements.",
    image: "/images/project/line6.jpeg",
    tags: ["React-Native", "Node.js", "Stripe"],
    width: 400,
    height: 50,
  
  },
  {
    title: "Application de gestion de rendez-vous pour les patients et les médecins",
    description: "Outil de gestion de rendez-vous pour les patients et les médecins avec planification et rappels.",
    image: "/images/project/tableau de bord.jpeg",
    tags: ["Nest.js" , "React", "Tailwind CSS"],
   
  },
  {
    title: "Plateforme immobilière",
    description: "Recherche et visite virtuelle de biens immobiliers.",
    image: "/images/project/immobilier.jpeg",
    tags: ["Django", "PostGIS"],
    codeUrl: "#",
    demoUrl: "#",
  },
];

// Une carte projet : capture d'écran, titre, description, tags, boutons Code / Démo.
type ProjectCardProps = {
  title: string;
  description: string;
  image: string;
  tags: string[];

};

function Project({ title, description, image, tags }: ProjectCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="rounded-2xl overflow-hidden transition-transform hover:-translate-y-1 flex flex-col"
      style={{ background: colors.cardSoft, border: `1px solid ${colors.line}`, boxShadow: "0 10px 24px -16px rgba(30,24,16,0.35)" }}
    >
      {/* Capture d'écran du projet — repli propre tant que l'image n'est pas déposée */}
      <div className="aspect-[16] w-full flex items-center justify-center" style={{ background: colors.line }}>
        {!imgError ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex flex-col items-center gap-1.5" style={{ color: colors.inkFaint }}>
            <ImageOff size={20} />
            <span className="text-[10px]" style={{ fontFamily: fonts.mono }}>Aperçu à venir</span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-semibold mb-1" style={{ color: colors.ink, fontFamily: fonts.display }}>
          {title}
        </h3>
        <p className="text-xs leading-relaxed mb-3" style={{ color: colors.inkSoft }}>
          {description}
        </p>

        {/* Tags technos */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-medium rounded-full px-2.5 py-1"
              style={{ background: colors.accentSoft, color: colors.accentDeep, fontFamily: fonts.mono }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Projets() {
  return (
    // Fond de page violet foncé (identique aux autres pages), blobs ambiants,
    // carte claire au centre pour le contenu (comme "My Projects" de la maquette).
    <div
      id="projet"
      className="relative min-h-screen w-full flex items-center justify-center p-4 md:p-8 overflow-hidden"
      style={{ background: colors.canvas }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
      `}</style>

      <div
        className="absolute rounded-full pointer-events-none"
        style={{ width: "45vw", height: "45vw", top: "-18vw", right: "-12vw", background: colors.blobOrange, filter: "blur(100px)", opacity: 0.4 }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{ width: "45vw", height: "45vw", bottom: "-18vw", left: "-12vw", background: colors.blobViolet, filter: "blur(100px)", opacity: 0.35 }}
      />

      {/* Carte claire, comme le bloc "My Projects" de la maquette */}
      <div
        className="relative w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl px-6 md:px-11 py-10 md:py-14"
        style={{ background: colors.card, fontFamily: fonts.body }}
      >
        {/* En-tête centré : titre + sous-titre, comme dans la maquette */}
        <div className="text-center mb-10 max-w-md mx-auto">
          <h2
            className="font-bold leading-[1.1] mb-3"
            style={{ fontFamily: fonts.display, color: colors.ink, fontSize: "clamp(1.8rem, 3vw, 2.4rem)", letterSpacing: "-0.02em" }}
          >
            Mes <span style={{ color: colors.accent, fontStyle: "italic" }}>Projets</span>
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: colors.inkSoft }}>
            Un aperçu de mes réalisations récentes.
          </p>
        </div>

        {/* Grille de projets : 1 colonne mobile, 2 tablette, 3 desktop — comme la maquette */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {PROJECTS.map((project) => (
            <Project key={project.title} {...project} />
          ))}
        </div>

        {/* Bouton "Voir tous les projets", centré, comme dans la maquette */}
        <div className="flex justify-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-semibold rounded-full px-6 py-3 border-2 transition-colors"
            style={{ borderColor: colors.ink, color: colors.ink }}
          >
            Voir tous les projets <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </div>
  );
}
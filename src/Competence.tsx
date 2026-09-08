import React, { useState } from "react";

// Même palette de base que le reste du site (fond violet foncé en arrière-plan
// de page), mais la carte "Compétences" elle-même repasse en clair pour
// coller à la maquette fournie (cartes blanches type "My Skills").
const colors = {
  canvas: "#1b1130",
  blobOrange: "#ff7a3d",
  blobViolet: "#7c4dff",
  card: "#fffaf3",
  cardSoft: "#fbf5ec",   // fond légèrement plus doux pour les mini-cartes de compétence
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

// Compétences à afficher : "logo" = chemin vers ton image (à déposer toi-même
// dans public/images/logos/), "brand" = couleur de la techno utilisée pour le
// carré d'icône et la barre de progression, comme dans la maquette.
const Competence = [
  { name: "React", level: 90, logo: "/images/competence/react1.png", brand: "#61dafb" },
  { name: "Photoshop", level: 80, logo: "/images/competence/AdobePs.webp", brand: "#42b883" },
   { name: "illustrator", level: 80, logo: "/images/competence/adobeIA.webp", brand: "#42b883" },
  { name: "Tailwind CSS", level: 92, logo: "/images/competence/Tailwindcss.png", brand: "#38bdf8" },
  { name: "Laravel", level: 85, logo: "/images/competence/Laravel.png", brand: "#ff2d20" },
  { name: "Django", level: 75, logo: "/images/competence/Django.png", brand: "#1f8a4c" },
  { name: "Node.js", level: 78, logo: "/images/competence/node.png", brand: "#3c873a" },
  { name: "Git / GitHub", level: 88, logo: "/images/competence/Github.jpeg", brand: "#f05033" },
  { name: "Docker", level: 65, logo: "/images/competence/Docker.webp", brand: "#2496ed" },
  { name: "Nest.js", level: 82, logo: "/images/competence/nestjs.webp", brand: "#a259ff" },
];

// Une mini-carte "compétence" : icône (ou lettre de secours si le logo n'est
// pas encore ajouté), nom, "Maîtrise" + pourcentage, barre de progression.
interface CarteCompetenceProps {
  name: string;
  level: number;
  logo: string;
  brand: string;
}

function SkillCard({ name, level, logo, brand }: CarteCompetenceProps) {
  const [imgError, setImgError] = useState<boolean>(false);

  return (
    <div
      className="rounded-2xl p-4 transition-transform hover:-translate-y-1"
      style={{ background: colors.accentSoft, border: `1px solid ${colors.line}`, boxShadow: "0 10px 24px -16px rgba(30,24,16,0.35)" }}
    >
      <div className="flex items-center gap-2.5 mb-4">
        <span
          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 overflow-hidden"
          style={{ background: `${brand}3a` }} // teinte très légère de la couleur de marque
        >
          {!imgError ? (
            <img
              src={logo}
              alt={`Logo ${name}`}
              className="w-full h-full object-contain"
              onError={() => setImgError(true)}
            />
          ) : (
            // Repli tant que le logo n'est pas déposé dans public/images/logos/
            <span className="text-xs font-bold" style={{ color: brand, fontFamily: fonts.display }}>
              {name[0]}
            </span>
          )}
        </span>
        <span className="text-sm font-semibold truncate" style={{ color: colors.ink, fontFamily: fonts.display }}>
          {name}
        </span>
      </div>

      <div className="flex items-center justify-between mb-1.5" style={{ fontFamily: fonts.mono, fontSize: "0.68rem" }}>
        <span style={{ color: colors.inkFaint }}>Maîtrise</span>
        <span style={{ color: colors.inkSoft, fontWeight: 600 }}>{level}%</span>
      </div>
      <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: colors.line }}>
        <div className="h-full rounded-full" style={{ width: `${level}%`, background: brand }} />
      </div>
    </div>
  );
}

export default function Competences() {
  return (
    // Fond de page violet foncé (identique au reste du site), avec les blobs
    // ambiants placés ICI (et non plus dans la carte, qui redevient claire).
    <div
      id="competence" className="relative min-h-screen w-full flex items-center justify-center p-4 md:p-8 overflow-hidden"
      style={{ background: colors.canvas }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
      `}</style>

      <div
        className="absolute rounded-full pointer-events-none"
        style={{ width: "45vw", height: "45vw", top: "-18vw", left: "-12vw", background: colors.blobOrange, filter: "blur(100px)", opacity: 0.4 }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{ width: "45vw", height: "45vw", bottom: "-18vw", right: "-12vw", background: colors.blobViolet, filter: "blur(100px)", opacity: 0.35 }}
      />

      {/* Carte claire, comme le bloc "My Skills" de la maquette */}
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
            Mes <span style={{ color: colors.accent, fontStyle: "italic" }}>Compétences</span>
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: colors.inkSoft }}>
            Technologies et outils que j'utilise pour créer des expériences web exceptionnelles.
          </p>
        </div>

        {/* Grille de compétences : 1 colonne mobile, 2 tablette, 4 desktop — comme la maquette */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {Competence.map((skill) => (
            <SkillCard key={skill.name} {...skill} />
          ))}
        </div>
      </div>
    </div>
  );
}
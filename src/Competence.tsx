import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  colors,
  fonts,
  fontImport,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from "./theme";

// Compétences à afficher : "logo" = chemin vers ton image (à déposer toi-même
// dans public/images/competence/), "brand" = couleur de la techno, utilisée
// pour le liseré du haut, le fond de l'icône et la barre de progression.
const COMPETENCES = [
  { name: "React", level: 80, logo: "/images/competence/react1.png", brand: "#61dafb" },
  { name: "Photoshop", level: 75, logo: "/images/competence/AdobePs.webp", brand: "#31a8ff" },
  { name: "illustrator", level: 75, logo: "/images/competence/adobeIA.webp", brand: "#ff9a00" },
  { name: "Tailwind CSS", level: 70, logo: "/images/competence/Tailwindcss.png", brand: "#38bdf8" },
  { name: "Laravel", level: 65, logo: "/images/competence/Laravel.png", brand: "#ff2d20" },
  { name: "Django", level: 60, logo: "/images/competence/Django.png", brand: "#1f8a4c" },
  { name: "Node.js", level: 60, logo: "/images/competence/node.png", brand: "#3c873a" },
  { name: "Git / GitHub", level: 70, logo: "/images/competence/Github.jpeg", brand: "#f05033" },
  { name: "Docker", level: 65, logo: "/images/competence/Docker.webp", brand: "#2496ed" },
  { name: "Nest.js", level: 80, logo: "/images/competence/nestjs.webp", brand: "#a259ff" },
];

// Une mini-carte "compétence" : icône façon badge (ou lettre de secours si le
// logo n'est pas encore ajouté), nom, "Maîtrise" + pourcentage, barre de
// progression animée qui se remplit à l'apparition.
interface CarteCompetenceProps {
  name: string;
  level: number;
  logo: string;
  brand: string;
}

function SkillCard({ name, level, logo, brand }: CarteCompetenceProps) {
  const [imgError, setImgError] = useState<boolean>(false);
  const [animatedLevel, setAnimatedLevel] = useState(0);

  // Petit délai pour déclencher l'animation de remplissage de la barre
  useEffect(() => {
    const timeout = setTimeout(() => setAnimatedLevel(level), 150);
    return () => clearTimeout(timeout);
  }, [level]);

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="group relative rounded-2xl p-4 pt-5 overflow-hidden transition-shadow duration-300 hover:shadow-lg"
      style={{ background: colors.cardSoft, border: `1px solid ${colors.line}`, boxShadow: "0 10px 24px -18px rgba(20,22,26,0.28)" }}
    >
      {/* Liseré coloré en haut, propre à chaque techno */}
      <div className="absolute inset-x-0 top-0 h-1" style={{ background: brand }} />

      <div className="flex items-center gap-2.5 mb-4">
        <span
          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105"
          style={{ background: `linear-gradient(135deg, ${brand}2e, ${brand}0d)`, boxShadow: `0 6px 14px -9px ${brand}` }}
        >
          {!imgError ? (
            <img
              src={logo}
              alt={`Logo ${name}`}
              className="w-6 h-6 object-contain"
              onError={() => setImgError(true)}
            />
          ) : (
            // Repli tant que le logo n'est pas déposé dans public/images/competence/
            <span className="text-sm font-bold" style={{ color: brand, fontFamily: fonts.display }}>
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
        <div
          className="h-full rounded-full transition-[width] duration-700 ease-out"
          style={{ width: `${animatedLevel}%`, background: `linear-gradient(90deg, ${brand}, ${brand}cc)` }}
        />
      </div>
    </motion.div>
  );
}

export default function Competences() {
  return (
    // Fond de page graphite (identique au reste du site), avec les blobs
    // ambiants placés ICI (et non plus dans la carte, qui redevient claire).
    <div
      id="competence" className="relative min-h-screen w-full flex items-center justify-center p-4 md:p-8 overflow-hidden"
      style={{ background: colors.canvas }}
    >
      <style>{`
        ${fontImport}
      `}</style>

      <div
        className="anim-blob-a absolute rounded-full pointer-events-none"
        style={{ width: "45vw", height: "45vw", top: "-18vw", left: "-12vw", background: colors.blobOrange, filter: "blur(100px)", opacity: 0.4 }}
      />
      <div
        className="anim-blob-b absolute rounded-full pointer-events-none"
        style={{ width: "45vw", height: "45vw", bottom: "-18vw", right: "-12vw", background: colors.blobViolet, filter: "blur(100px)", opacity: 0.35 }}
      />

      {/* Carte claire, comme le bloc "My Skills" de la maquette */}
      <div
        className="relative w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl px-6 md:px-11 py-10 md:py-14"
        style={{ background: colors.card, fontFamily: fonts.body }}
      >
        {/* En-tête centré : titre + sous-titre, comme dans la maquette */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center mb-10 max-w-md mx-auto"
        >
          <h2
            className="font-bold leading-[1.1] mb-3"
            style={{ fontFamily: fonts.display, color: colors.ink, fontSize: "clamp(1.8rem, 3vw, 2.4rem)", letterSpacing: "-0.02em" }}
          >
            Mes <span style={{ color: colors.accent, fontStyle: "italic" }}>Compétences</span>
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: colors.inkSoft }}>
            Technologies et outils que j'utilise pour créer des expériences web exceptionnelles.
          </p>
        </motion.div>

        {/* Grille de compétences : 2 colonnes mobile, 3 tablette, 5 desktop —
            10 compétences donc 2 lignes bien pleines sur grand écran */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5"
        >
          {COMPETENCES.map((skill) => (
            <SkillCard key={skill.name} {...skill} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
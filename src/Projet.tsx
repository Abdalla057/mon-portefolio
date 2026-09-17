import React, { useEffect, useState } from "react";
import { ArrowRight, ImageOff, Images, ChevronLeft, ChevronRight, X } from "lucide-react";

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

// Projets à afficher : "images" = tableau de chemins vers tes captures d'écran
// (à déposer toi-même dans public/images/projects/). Mets au moins une image ;
// dès qu'il y en a 2 ou plus, le bouton "Voir plus" apparaît automatiquement.
const PROJECTS = [
  {
    title: "Plateforme de l'apprentissage islamique en ligne",
    description:
      "Plateforme de l'apprentissage islamique en ligne complète avec un abonnement intégré et suivi des gestions de cours.",
    images: [
      "/images/project/islamique.png",
      "/images/project/page1.png",
      "/images/project/page2.png",
      "/images/project/page3.png",
      "/images/project/page4.png",
      "/images/project/page5.png",
      "/images/project/page6.png",
      "/images/project/page7.png",
      "/images/project/page8.png",
      "/images/project/page9.png",
      "/images/project/page10.png",
    ],
    tags: ["React", "Node.js"],
  },
  {
    title: "Application de e-commerce",
    description:
      "Application de e-commerce avec gestion des produits, commandes et paiements.",
    images: [
      "/images/project/line4.jpeg",
      "/images/project/line3.jpeg",
      "/images/project/line6.jpeg",
      "/images/project/line1.jpeg",
      "/images/project/line2.jpeg",
    ],
    tags: ["React-Native", "Node.js", "Stripe"],
  },
  {
    title: "Application de gestion de rendez-vous pour les patients et les médecins",
    description:
      "Outil de gestion de rendez-vous pour les patients et les médecins avec planification et rappels.",
    images: [
      "/images/project/tableau de bord.jpeg",
    ],
    tags: ["Nest.js", "React", "Tailwind CSS"],
  },
  {
    title: "Plateforme immobilière",
    description: "Recherche et visite virtuelle de biens immobiliers.",
    images: [
      "/images/project/immobilier.jpeg",
      "/images/project/immobilier1.jpeg",
      "/images/project/logement.jpeg",
    ],
    tags: ["Django", "PostGIS"],
    codeUrl: "#",
    demoUrl: "#",
  },
];

// Une carte projet : capture d'écran, titre, description, tags, et un bouton
// "Voir plus" au-dessus de l'image quand il y a plusieurs sous-images.
type ProjectCardProps = {
  title: string;
  description: string;
  images: string[];
  tags: string[];
  onViewMore: () => void;
};

function Project({ title, description, images, tags, onViewMore }: ProjectCardProps) {
  const [imgError, setImgError] = useState(false);
  const cover = images[0];
  const hasMore = images.length > 1;

  return (
    <div
      className="rounded-2xl overflow-hidden transition-transform hover:-translate-y-1 flex flex-col"
      style={{ background: colors.cardSoft, border: `1px solid ${colors.line}`, boxShadow: "0 10px 24px -16px rgba(30,24,16,0.35)" }}
    >
      {/* Capture d'écran du projet — ratio fixe pour que toutes les cartes soient
          alignées, léger zoom au survol, repli propre tant que l'image n'est pas déposée */}
      <div
        className="group relative aspect-[4/3] w-full overflow-hidden flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${colors.line}, ${colors.cardSoft})` }}
      >
        {!imgError ? (
          <img
            src={cover}
            alt={title}
            className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.06]"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex flex-col items-center gap-1.5" style={{ color: colors.inkFaint }}>
            <ImageOff size={22} />
            <span className="text-[10px]" style={{ fontFamily: fonts.mono }}>Aperçu à venir</span>
          </div>
        )}

        {/* Voile sombre discret derrière le bouton, plus marqué au survol pour la lisibilité */}
        {hasMore && (
          <div
            className="pointer-events-none absolute inset-0 transition-colors duration-300 group-hover:bg-black/15"
            style={{ background: "rgba(20,14,8,0.06)" }}
          />
        )}

        {/* Bouton "Voir plus", centré sur l'image de couverture */}
        {hasMore && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              type="button"
              onClick={onViewMore}
              className="pointer-events-auto inline-flex items-center gap-1.5 text-xs font-semibold rounded-full px-4 py-2 backdrop-blur-sm transition-transform duration-200 hover:scale-105"
              style={{ background: "rgba(30,24,16,0.72)", color: "#fffaf3", fontFamily: fonts.body }}
            >
              <Images size={14} />
              Voir plus
            </button>
          </div>
        )}

        {/* Légère ombre en bas de l'image pour fondre la transition vers le texte */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-10"
          style={{ background: `linear-gradient(to top, rgba(30,24,16,0.18), transparent)` }}
        />
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

// Galerie plein écran : s'ouvre quand on clique sur "Voir plus", permet de
// naviguer entre toutes les sous-images d'un projet (flèches, points, clavier).
type GalleryProps = {
  title: string;
  images: string[];
  activeIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
};

function ProjectGallery({ title, images, activeIndex, onClose, onPrev, onNext, onSelect }: GalleryProps) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onNext, onPrev]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{ background: "rgba(27,17,48,0.88)" }}
      onClick={onClose}
    >
      <div className="relative w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-11 right-0 inline-flex items-center gap-1.5 text-sm"
          style={{ color: "#fffaf3" }}
          aria-label="Fermer la galerie"
        >
          Fermer <X size={18} />
        </button>

        <div className="relative rounded-2xl overflow-hidden" style={{ background: colors.line }}>
          <img
            src={images[activeIndex]}
            alt={`${title} — image ${activeIndex + 1} sur ${images.length}`}
            className="w-full max-h-[65vh] object-contain"
          />

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={onPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-2 transition-colors hover:opacity-80"
                style={{ background: "rgba(30,24,16,0.55)", color: "#fffaf3" }}
                aria-label="Image précédente"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={onNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 transition-colors hover:opacity-80"
                style={{ background: "rgba(30,24,16,0.55)", color: "#fffaf3" }}
                aria-label="Image suivante"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>

        <div className="flex items-center justify-between mt-3 px-1">
          <p className="text-sm font-semibold" style={{ color: "#fffaf3", fontFamily: fonts.display }}>
            {title}
          </p>
          {images.length > 1 && (
            <div className="flex items-center gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => onSelect(i)}
                  className="rounded-full transition-all"
                  style={{
                    width: i === activeIndex ? 16 : 6,
                    height: 6,
                    background: i === activeIndex ? colors.accent : "rgba(255,255,255,0.4)",
                  }}
                  aria-label={`Aller à l'image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projets() {
  // Index du projet dont la galerie est ouverte (null = aucune galerie ouverte)
  const [openProjectIndex, setOpenProjectIndex] = useState<number | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const openGallery = (index: number) => {
    setOpenProjectIndex(index);
    setActiveImageIndex(0);
  };
  const closeGallery = () => setOpenProjectIndex(null);

  const activeProject = openProjectIndex !== null ? PROJECTS[openProjectIndex] : null;

  const goPrev = () => {
    if (!activeProject) return;
    setActiveImageIndex((i) => (i - 1 + activeProject.images.length) % activeProject.images.length);
  };
  const goNext = () => {
    if (!activeProject) return;
    setActiveImageIndex((i) => (i + 1) % activeProject.images.length);
  };

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
          {PROJECTS.map((project, index) => (
            <Project key={project.title} {...project} onViewMore={() => openGallery(index)} />
          ))}
        </div>

        {/* Bouton "Voir tous les projets", centré, comme dans la maquette */}
        <div className="flex justify-center BG">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-semibold rounded-full px-6 py-3 border-2 transition-colors"
            style={{ borderColor: colors.ink, color: colors.ink }}
          >
            Voir tous les projets <ArrowRight size={15} />
          </a>
        </div>
      </div>

      {/* Galerie plein écran d'un projet, affichée par-dessus toute la page */}
      {activeProject && (
        <ProjectGallery
          title={activeProject.title}
          images={activeProject.images}
          activeIndex={activeImageIndex}
          onClose={closeGallery}
          onPrev={goPrev}
          onNext={goNext}
          onSelect={setActiveImageIndex}
        />
      )}
    </div>
  );
}
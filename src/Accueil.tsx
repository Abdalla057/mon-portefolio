import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Github, Linkedin, Twitter, Moon, Download, Mail, Menu, X } from "lucide-react";

// Palette de couleurs centralisée : facilite les futurs ajustements de thème
// -> "canvas" est passé en violet foncé (thème sombre) à la demande de l'utilisateur.
const colors = {
  canvas: "#1b1130",       // violet très foncé : fond principal de la page
  blobOrange: "#ff7a3d",   // blob chaud (contraste avec le violet)
  blobViolet: "#7c4dff",   // second blob, ton violet plus clair, en écho au fond
  card: "#fffaf3",         
  ink: "#1e1810",          
  inkSoft: "#6f6355",
  inkFaint: "#a89c8b",
  textLight: "#f6f1ea",    // texte clair, utilisé sur le fond violet foncé
  textMuted: "#bdb0d9",    // texte secondaire clair (paragraphes, liens inactifs) sur violet
  textFaint: "#8a7dab",    // texte tertiaire (petites stats) sur violet
  lineLight: "rgba(246,241,234,0.16)", // séparateurs / bordures discrets sur fond sombre
  accent: "#ff6a2b",
  accentDeep: "#e04f16",
  accentSoft: "#ffe3cd",
  line: "#ece2d3",
  editorBg: "#1c1712",
  editorBar: "#241d16",
};

// Polices utilisées : une display (titres), une body (texte courant), une mono (labels techniques)
const fonts = {
  display: "'Space Grotesk', sans-serif",
  body: "'Inter', sans-serif",
  mono: "'JetBrains Mono', monospace",
};

// Liens de la barre de navigation, avec l'élément actif marqué (page Accueil)
// NOTE : "id" correspond à l'id DOM de la section (ancre de scroll), pas à une route.
const BarreDeNavigation = [
  { label: "Accueil", id: "accueil" },
  { label: "À propos", id: "propos" },
  { label: "Compétences", id: "competence" },
  { label: "Projets", id: "projet" },
  { label: "Contact", id: "contact" },
];

// Scroll fluide vers une section, avec décalage pour ne pas passer sous la navbar fixe.
const scrollTo = (id: string, close?: () => void) => {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY - 80,
    behavior: "smooth",
  });
  close?.();
};

export default function PortfolioHero() {
  // État d'ouverture du menu mobile (burger)
  const [menuOpen, setMenuOpen] = useState(false);
  // Section actuellement visible (surlignage du lien actif) + navbar au scroll
  const [active, setActive] = useState("accueil");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      let current = "accueil";
      BarreDeNavigation.forEach(({ id }) => {
        const sec = document.getElementById(id);
        if (sec && sec.getBoundingClientRect().top <= 120) current = id;
      });
      setActive(current);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    // ------------------------------------------------------------------
    // CONTENEUR UNIQUE EN PLEIN ÉCRAN, THÈME VIOLET FONCÉ : le fond
    // ------------------------------------------------------------------
    <div
      className="relative w-full min-h-screen overflow-hidden"
      style={{ background: colors.canvas }}
    >
      {/* Styles globaux : polices, animations (flottement, rotation, pulsation, clignotement) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

        @keyframes floatCard {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-14px) rotate(-1deg); }
        }
        @keyframes floatChip {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes spinSlow {
          to { transform: rotate(360deg); }
        }
        @keyframes pulseRing {
          0% { transform: scale(0.6); opacity: 0.9; }
          100% { transform: scale(1.9); opacity: 0; }
        }
        @keyframes blinkCursor {
          50% { opacity: 0; }
        }
        .anim-float-card { animation: floatCard 10s ease-in-out infinite; }
        .anim-float-chip-1 { animation: floatChip 12s ease-in-out infinite; animation-delay: .2s; }
        .anim-float-chip-2 { animation: floatChip 12s ease-in-out infinite; animation-delay: 1.4s; }
        .anim-float-chip-3 { animation: floatChip 12s ease-in-out infinite; animation-delay: .8s; }
        .anim-spin-slow { animation: spinSlow 40s linear infinite; }
        .anim-cursor { animation: blinkCursor 1s step-end infinite; }
        .pulse-dot::after {
          content: "";
          position: absolute;
          inset: -4px;
          border-radius: 9999px;
          border: 1.5px solid #3aa65a;
          animation: pulseRing 1.8s ease-out infinite;
        }
      `}</style>

      {/* Blobs de fond ambiants — couleurs laissées telles quelles (canvas) à la demande de l'utilisateur */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{ width: "60vw", height: "60vw", top: "-20vw", left: "-15vw", background: colors.canvas, filter: "blur(90px)", opacity: 0.5 }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{ width: "60vw", height: "60vw", bottom: "-25vw", right: "-15vw", background: colors.canvas, filter: "blur(90px)", opacity: 0.45 }}
      />

      {/* NAVBAR FIXE : position "fixed" (et non "sticky") pour qu'elle soit
          ancrée en haut de l'écran dès le chargement de la page. */}
      <nav
        className="fixed top-0 left-0 right-0 z-40 transition-colors"
        style={{
          background: scrolled ? colors.canvas : `${colors.canvas}cc`,
          backdropFilter: "blur(10px)",
          boxShadow: scrolled ? "0 8px 24px -12px rgba(0,0,0,0.5)" : "none",
        }}
      >
      <div
        className="max-w-6xl mx-auto flex items-center justify-between px-6 md:px-11 pt-6 pb-2 relative border-b-4 rounded-b-3xl border-red-400"
      >
        {/* Logo / nom du site — texte clair car posé sur le fond violet foncé */}
        <div className="text-xl font-bold" style={{ fontFamily: fonts.display, color: colors.textLight }}>
          Dala<span style={{ color: colors.accent }}>Dev.</span>
        </div>

        {/* Liens de navigation (visibles uniquement en version desktop)
            -> boutons de scroll vers les ancres, PAS des routes react-router */}
         <ul className="hidden md:flex items-center gap-8 text-sm font-medium list-none">
          {BarreDeNavigation.map((link) => (
          <li key={link.id}>
            <button
              type="button"
              onClick={() => scrollTo(link.id)}
              className="pb-1 transition-colors bg-transparent border-0 cursor-pointer"
              style={{
                color: active === link.id ? colors.textLight : colors.textMuted,
                borderBottom: active === link.id ? `2px solid ${colors.accent}` : "2px solid transparent",
                fontFamily: fonts.body,
              }}
            >
              {link.label}
            </button>
          </li>
         ))}
       </ul>

        {/* Actions de droite : thème sombre, bouton CTA, burger mobile */}
        <div className="flex items-center gap-3">
          <button
            aria-label="Thème sombre"
            className="hidden sm:flex w-9 h-9 rounded-full items-center justify-center border transition-colors hover:border-white"
            style={{ borderColor: colors.lineLight, color: colors.textMuted }}
          >
            <Moon size={16} />
          </button>
          {/* "Me recruter" reste une vraie route (page dédiée), pas une ancre de scroll */}
          <NavLink
            to="/Contact"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-white rounded-full px-5 py-2.5 transition-transform hover:-translate-y-0.5"
            style={{ background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentDeep})`, boxShadow: `0 10px 24px -8px ${colors.accent}aa` }}
          >
            Me recruter
          </NavLink>
          {/* Bouton burger : visible uniquement en mobile, bascule le menu */}
          <button
            aria-label="Ouvrir le menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden w-9 h-9 rounded-full flex items-center justify-center border"
            style={{ borderColor: colors.lineLight, color: colors.textLight }}
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {/* Menu déroulant mobile : reste sur fond crème (panneau clair qui se
            détache du fond violet), donc les couleurs "ink" d'origine restent valables ici */}
        {menuOpen && (
          <div
            className="absolute top-full left-0 right-0 md:hidden flex flex-col gap-3 px-6 py-4 z-20 rounded-b-2xl"
            style={{ background: colors.card, borderTop: `1px solid ${colors.line}` }}
          >
             {BarreDeNavigation.map((link) => (
               <button
                 key={link.id}
                 type="button"
                 onClick={() => scrollTo(link.id, () => setMenuOpen(false))}
                 className="text-sm font-medium text-left bg-transparent border-0 cursor-pointer"
                 style={{ color: active === link.id ? colors.ink : colors.inkSoft }}
               >
                 {link.label}
               </button>
             ))}
            <NavLink
              to="/Contact"
              onClick={() => setMenuOpen(false)}
              className="inline-flex justify-center items-center gap-2 text-sm font-semibold text-white rounded-full px-5 py-2.5 mt-1"
              style={{ background: colors.accent }}
            >
              Me recruter
            </NavLink>
          </div>
        )}
      </div>
      </nav>

      {/* Wrapper centré pour le reste du contenu (nav sortie de ce wrapper
          car elle est maintenant "fixed" et gère son propre centrage).
          "pt-[88px]" compense la hauteur de la navbar fixe pour que le
          hero ne parte pas caché dessous dès le chargement. */}
      <div className="relative max-w-6xl mx-auto pt-[88px]">

      {/*  SECTION HERO*/}
      <section id="accueil" className="grid grid-cols-1 lg:grid-cols-2 items-center gap-5 px-6 md:px-11 pt-8 pb-16 min-h-[calc(100vh-88px)]">
        {/* --- Colonne gauche : texte de présentation --- */}
        <div>
          {/* Badge de disponibilité avec point vert pulsant (déjà clair, inchangé) */}
          <div
            className="inline-flex items-center gap-2 text-xs mb-6 rounded-full pl-2.5 pr-3.5 py-1.5"
            style={{ fontFamily: fonts.mono, color: colors.accentDeep, background: colors.accentSoft }}
          >
            <span className="relative w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: "#3aa65a" }} />
            Disponible pour de nouveaux projets
          </div>

          {/* Titre principal — texte clair sur fond violet foncé */}
          <h1
            className="font-sm leading-[1.08] mb-5 max-w-[12ch] "
            style={{ fontFamily: fonts.display, color: colors.textLight, fontSize: "clamp(2.1rem, 3.6vw, 3.4rem)", letterSpacing: "-0.02em" }}
          >
          Je conçois des applications web et {" "}
            <span style={{ color: colors.accent, fontStyle: "italic" }}>mobiles</span>.
          </h1>

          {/* Paragraphe de description — gris-violet clair pour rester lisible sans trop attirer l'œil */}
          <p className="text-1xl  leading-relaxed mb-8 max-w-[46ch]" style={{ color: colors.textMuted }}>
            Développeur Full-Stack et
           <span style={{ color: colors.accent, fontWeight: 700 }}> UI/UX </span>
            Designer basé à Dakar, 
            je conçois et développe des applications modernes en transformant des idées en interfaces intuitives, 
            performantes et prêtes pour la production.
          </p>

          {/* Boutons d'appel à l'action */}
          <div className="flex flex-1 gap-3.5 mb-10 ">
            <a
              href="/CV/Abdoulaye-CV.pdf"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white rounded-full px-6 py-3 transition-transform hover:-translate-y-0.5"
              style={{ background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentDeep})`, boxShadow: `0 10px 24px -8px ${colors.accent}aa` }}
            >
              <Download size={15} /> Télécharger le CV
            </a>
            {/* Bouton "outline" : bordure et texte clairs pour rester visibles sur fond sombre
                -> scroll vers la section contact plutôt qu'une navigation de route */}
            <button
              type="button"
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center gap-2 text-sm font-semibold rounded-full px-6 py-3 border-2 transition-colors bg-transparent cursor-pointer"
              style={{ borderColor: colors.textLight, color: colors.textLight }}
            >
              <Mail size={15} /> Me contacter
            </button>
          </div>

          {/* Réseaux sociaux + statistiques rapides */}
          <div className="flex flex-wrap items-center gap-6">
            {/* Icônes sociales : cercle clair + icône foncée (inversé) pour bien
                ressortir sur le fond violet, plutôt qu'un cercle sombre invisible */}
            <div className="flex gap-2.5">
              {[
                { Icon: Github, label: "GitHub", href: "https://github.com/" },
                { Icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/" },
                { Icon: Twitter, label: "Twitter", href: "https://twitter.com/" },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:-translate-y-1"
                  style={{ background: colors.textLight, color: colors.canvas }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>

            <div className="w-px h-8" style={{ background: colors.lineLight }} />

             {/* ici pour parler de ton expérience et de le nombres de projets livres */}
            <div className="text-xs leading-relaxed" style={{ fontFamily: fonts.mono, color: colors.textFaint }}>
              <b style={{ color: colors.textMuted, fontWeight: 600 }}></b>{" "}
              <b style={{ color: colors.textMuted, fontWeight: 600 }}></b>
            </div>
          </div>
        </div>

        {/*  Colonne droite : visuel (photo + badges flottants) */}
        <div className="relative h-[380px] md:h-[480px] flex items-center justify-center">
          {/* Anneau pointillé en rotation lente, purement décoratif */}
          <div
            className="absolute rounded-full anim-spin-slow h-0 w-0 md:h-[340px] md:w-[340px] border-2 md:border-4 border-dashed border-orange-500 opacity-20"
          />

          {/* Badge "en ligne" flottant : effet "verre dépoli" clair sur fond sombre,
              plus lisible qu'un badge quasi noir sur un fond déjà foncé */}
          <div
            className="absolute top-2 right-[6%] z-30 flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium anim-float-chip-3"
            style={{
              background: "rgba(246,241,234,0.1)",
              border: `1px solid ${colors.lineLight}`,
              backdropFilter: "blur(8px)",
              color: colors.textLight,
              boxShadow: "0 14px 30px -12px rgba(0,0,0,0.45)",
            }}
          >
            <span className="relative w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: "#3aa65a" }} />
            En ligne maintenant
          </div>

          {/* Photo de profil, circulaire, avec animation de flottement */}
          <div
            className="relative z-40 w-[240px] md:w-[240px] h-[240px] md:h-[240px] rounded-full overflow-hidden anim-float-card
            shadow-xl  bg-stone-400 "
          >
            <img
              src="/images/image.png"
              alt="Ouali"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Badges technologiques flottants : restent sur fond crème ("card") */}
          <div
            className="absolute top-[15%] left-0 md:left-[2%] z-50 flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium anim-float-chip-1"
            style={{ background: colors.card, border: `1px solid ${colors.line}`, fontFamily: fonts.mono, color: colors.ink, boxShadow: "0 14px 30px -12px rgba(0,0,0,0.35)" }}
          >
            <span className="w-2 h-2 rounded-sm" style={{ background: "#61dafb" }} /> React.js
          </div>

          <div
            className="absolute bottom-32 left-0 md:left-[-4%] z-50 flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium anim-float-chip-2"
            style={{ background: colors.card, border: `1px solid ${colors.line}`, fontFamily: fonts.mono, color: colors.ink, boxShadow: "0 14px 30px -12px rgba(0,0,0,0.35)" }}
          >
            <span className="w-2 h-2 rounded-sm" style={{ background: "#42b883" }} /> Nest.js
          </div>

          <div
            className="absolute top-[56%] right-0 md:right-[-6%] z-50 flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium anim-float-chip-3"
            style={{ background: colors.card, border: `1px solid ${colors.line}`, fontFamily: fonts.mono, color: colors.ink, boxShadow: "0 14px 30px -12px rgba(0,0,0,0.35)" }}
          >
            <span className="w-2 h-2 rounded-sm" style={{ background: colors.accent }} /> Laravel
          </div>

          <div
            className="absolute top-[15%] right-0 md:right-[6%] z-50 flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium anim-float-chip-4"
            style={{ background: colors.card, border: `1px solid ${colors.line}`, fontFamily: fonts.mono, color: colors.ink, boxShadow: "0 14px 30px -12px rgba(0,0,0,0.35)" }}
          >
            <span className="w-2 h-2 rounded-sm" style={{ background: "#3aa65a" }} /> Django
          </div>

        </div>
      </section>
      </div>
    </div>
  );
}
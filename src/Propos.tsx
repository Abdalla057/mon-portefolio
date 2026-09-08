import React from "react";
import { ArrowRight } from "lucide-react";

// Palette identique à la page d'Accueil (même thème violet foncé),
// pour garder une cohérence visuelle entre les sections du site.
const colors = {
  canvas: "#1b1130",       // violet très foncé : fond principal (identique à l'Accueil)
  blobOrange: "#ff7a3d",   // blob chaud
  blobViolet: "#7c4dff",   // blob violet clair, en écho au fond
  card: "#fffaf3",         // crème : réservé aux éventuelles pastilles claires
  ink: "#1e1810",          // texte foncé, utilisé UNIQUEMENT sur fond clair
  inkSoft: "#6f6355",
  inkFaint: "#a89c8b",
  textLight: "#f6f1ea",    // texte clair, utilisé sur le fond violet foncé
  textMuted: "#bdb0d9",    // texte secondaire clair sur violet
  textFaint: "#8a7dab",    // texte tertiaire (petites stats) sur violet
  lineLight: "rgba(246,241,234,0.16)", // séparateurs / bordures discrets sur fond sombre
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

export default function Apropos() {
  return (
    // Wrapper de section : même fond violet foncé que l'Accueil, pour qu'il
    // n'y ait pas de "bande" d'une autre couleur visible autour de la carte.
    // id="propos" : ancre ciblée par scrollTo("propos") depuis la navbar.
    <div
      id="propos"
      className="min-h-screen w-full flex items-center justify-center p-4 md:p-8"
      style={{ background: colors.canvas }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
      `}</style>

      {/* Carte principale : fond violet foncé + blobs ambiants, comme sur l'Accueil */}
      <div
        className="relative w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl px-6 md:px-11 py-10 md:py-14"
        style={{ background: colors.canvas, fontFamily: fonts.body }}
      >
        {/* Blobs de fond ambiants (mêmes couleurs que l'Accueil) : "absolute" +
            "overflow-hidden" du parent = ils restent confinés à cette carte. */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{ width: "50vw", height: "50vw", top: "-20vw", left: "-15vw", background: colors.blobOrange, filter: "blur(90px)", opacity: 0.5 }}
        />
        <div
          className="absolute rounded-full pointer-events-none"
          style={{ width: "50vw", height: "50vw", bottom: "-22vw", right: "-15vw", background: colors.blobViolet, filter: "blur(90px)", opacity: 0.45 }}
        />

        <div className="relative grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          {/* left: image */}
          <div className="relative flex justify-center lg:justify-start">
            <div
              className="absolute rounded-[2rem] rotate-6"
              style={{ width: "78%", height: "88%", background: colors.accentSoft }}
            />
            <div className="relative w-[280px] md:w-[400px] h-[340px] md:h-[400px] rounded-[2rem] overflow-hidden shadow-xl">
              <img
                src="/images/image3.png"
                alt="Ouali"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* right: content */}
          <div>
            <div
              className="inline-flex items-center text-xs mb-6 rounded-full px-3.5 py-1.5"
              style={{ fontFamily: fonts.mono, color: colors.accentDeep, background: colors.lineLight }}
            >
              Qui suis-je
            </div>

            {/* Titre — texte clair sur fond violet foncé (comme le H1 de l'Accueil) */}
            <h2
              className="font-bold leading-[1.1] mb-5"
              style={{ fontFamily: fonts.display, color: colors.textLight, fontSize: "clamp(1.9rem, 3vw, 2.6rem)", letterSpacing: "-0.02em" }}
            >
              À propos de <span style={{ color: colors.accent, fontStyle: "italic" }}>moi</span>.
            </h2>

            <div className="border box-border border-solid mb-6" style={{ borderColor: colors.lineLight }}>
              <p className="text-base leading-relaxed mb-8 max-w-[52ch]  p-4" style={{ color: colors.textMuted, fontFamily: fonts.body }}>
                Développeur Full-Stack &amp; UI/UX Designer, je conçois des applications web modernes
                en alliant esthétique et performance. Curieux et rigoureux, j'aime transformer des
                idées complexes en interfaces simples, claires et agréables à utiliser.
              </p>
            </div>
            {/* Bouton "outline" : bordure et texte clairs pour rester visibles sur fond sombre,
                comme le bouton "Me contacter" de l'Accueil */}
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm font-semibold rounded-full px-6 py-3 border-2 transition-colors hover:text-white group"
              style={{ borderColor: colors.textLight, color: colors.textLight }}
            >
              En savoir plus <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
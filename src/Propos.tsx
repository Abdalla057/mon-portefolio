import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  colors,
  fadeInLeft,
  fadeInRight,
  fonts,
  fontImport,
  viewportOnce,
} from "./theme";

export default function Apropos() {
  return (
    // Wrapper de section : même fond graphite que l'Accueil, pour qu'il
    // n'y ait pas de "bande" d'une autre couleur visible autour de la carte.
    // id="propos" : ancre ciblée par scrollTo("propos") depuis la navbar.
    <div
      id="propos"
      className="min-h-screen w-full flex items-center justify-center p-4 md:p-8"
      style={{ background: colors.canvas }}
    >
      <style>{`
        ${fontImport}
      `}</style>

      {/* Carte principale : fond graphite + blobs ambiants, comme sur l'Accueil */}
      <div
        className="relative w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl px-6 md:px-11 py-10 md:py-14"
        style={{ background: colors.canvas, fontFamily: fonts.body }}
      >
        {/* Blobs de fond ambiants (mêmes couleurs que l'Accueil) : "absolute" +
            "overflow-hidden" du parent = ils restent confinés à cette carte. */}
        <div
          className="anim-blob-a absolute rounded-full pointer-events-none"
          style={{ width: "50vw", height: "50vw", top: "-20vw", left: "-15vw", background: colors.blobOrange, filter: "blur(90px)", opacity: 0.5 }}
        />
        <div
          className="anim-blob-b absolute rounded-full pointer-events-none"
          style={{ width: "50vw", height: "50vw", bottom: "-22vw", right: "-15vw", background: colors.blobViolet, filter: "blur(90px)", opacity: 0.45 }}
        />

        <div className="relative grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          {/* left: image */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-start group"
          >
            <div
              className="absolute rounded-[2rem] rotate-6 transition-transform duration-500 group-hover:rotate-3 group-hover:scale-105"
              style={{ width: "78%", height: "88%", background: colors.accentSoft }}
            />
            <div className="relative w-[280px] md:w-[400px] h-[340px] md:h-[400px] rounded-[2rem] overflow-hidden shadow-xl">
              <img
                src="/images/image3.png"
                alt="Ouali"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </motion.div>

          {/* right: content */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            <div
              className="inline-flex items-center text-xs mb-6 rounded-full px-3.5 py-1.5"
              style={{ fontFamily: fonts.mono, color: colors.accentDeep, background: colors.lineLight }}
            >
              Qui suis-je
            </div>

            {/* Titre — texte clair sur fond graphite (comme le H1 de l'Accueil) */}
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
              className="inline-flex items-center gap-2 text-sm font-semibold rounded-full px-6 py-3 border-2 transition-opacity hover:opacity-80 group"
              style={{ borderColor: colors.textLight, color: colors.textLight }}
            >
              En savoir plus <ArrowRight size={15} />
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
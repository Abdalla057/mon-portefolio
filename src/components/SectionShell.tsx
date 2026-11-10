import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  colors,
  fonts,
  fontImport,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from "../theme";

type SectionShellProps = {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  children: ReactNode;
};

/**
 * Structure visuelle commune aux sections du portfolio :
 * fond graphite, blobs ambiants et carte claire centrée.
 * Permet de garder une identité identique sans dupliquer le markup.
 */
export default function SectionShell({
  id,
  eyebrow,
  title,
  subtitle,
  children,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className="relative w-full flex justify-center p-4 md:p-8 overflow-hidden scroll-mt-24"
      style={{ background: colors.canvas }}
    >
      <style>{`
        ${fontImport}
      `}</style>

      <div
        className="anim-blob-a absolute rounded-full pointer-events-none"
        style={{
          width: "45vw",
          height: "45vw",
          top: "-18vw",
          left: "-12vw",
          background: colors.blobOrange,
          filter: "blur(100px)",
          opacity: 0.4,
        }}
      />
      <div
        className="anim-blob-b absolute rounded-full pointer-events-none"
        style={{
          width: "45vw",
          height: "45vw",
          bottom: "-18vw",
          right: "-12vw",
          background: colors.blobViolet,
          filter: "blur(100px)",
          opacity: 0.35,
        }}
      />

      <div
        className="relative w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl px-6 md:px-11 py-10 md:py-14"
        style={{ background: colors.card, fontFamily: fonts.body }}
      >
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="absolute inset-x-0 top-0 h-1 origin-left"
          style={{
            background: `linear-gradient(90deg, ${colors.accent}, ${colors.accentSoft}, transparent)`,
          }}
        />

        <motion.header
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center mb-10 max-w-xl mx-auto"
        >
          {eyebrow && (
            <motion.span
              variants={staggerItem}
              className="inline-flex items-center text-xs mb-4 rounded-full px-3.5 py-1.5"
              style={{
                fontFamily: fonts.mono,
                color: colors.accentDeep,
                background: colors.accentSoft,
              }}
            >
              {eyebrow}
            </motion.span>
          )}
          <motion.h2
            variants={staggerItem}
            className="font-bold leading-[1.1] mb-3"
            style={{
              fontFamily: fonts.display,
              color: colors.ink,
              fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              variants={staggerItem}
              className="text-sm leading-relaxed"
              style={{ color: colors.inkSoft }}
            >
              {subtitle}
            </motion.p>
          )}
        </motion.header>

        {children}
      </div>
    </section>
  );
}

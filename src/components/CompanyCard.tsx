import React, { useState } from "react";
import { motion } from "framer-motion";
import { Building2, CheckCircle2, Clock } from "lucide-react";
import type { Entreprise, Stage } from "../data/parcours";
import { colors, fonts } from "../theme";

type CompanyCardProps = {
  company: Entreprise;
  stage: Stage;
};

/**
 * Carte de présentation d'une entreprise d'accueil.
 * Le logo est optionnel : une icône neutre s'affiche tant que l'image
 * n'est pas renseignée dans src/data/parcours.ts.
 */
export default function CompanyCard({ company, stage }: CompanyCardProps) {
  const [logoError, setLogoError] = useState(false);
  const showLogo = Boolean(company.logo) && !logoError;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="group rounded-2xl p-5 md:p-6"
      style={{
        background: colors.cardSoft,
        border: `1px solid ${colors.line}`,
        boxShadow: "0 10px 24px -18px rgba(20,22,26,0.28)",
      }}
    >
      <div className="flex items-start justify-between gap-3 mb-5">
        <div className="flex items-center gap-3 min-w-0">
          <span
            className="w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden shrink-0 transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${colors.accentSoft}, ${colors.card})`,
              border: `1px solid ${colors.line}`,
            }}
          >
            {showLogo ? (
              <img
                src={company.logo}
                alt={`Logo ${company.name}`}
                className="w-9 h-9 object-contain"
                onError={() => setLogoError(true)}
              />
            ) : (
              <Building2 size={24} color={colors.accentDeep} />
            )}
          </span>

          <div className="min-w-0">
            <h3
              className="text-base font-semibold leading-snug truncate"
              style={{ color: colors.ink, fontFamily: fonts.display }}
              title={company.name}
            >
              {company.name}
            </h3>
            <p
              className="inline-flex items-center gap-1.5 text-[11px] mt-1"
              style={{ color: colors.inkFaint, fontFamily: fonts.mono }}
            >
              <Clock size={12} />
              {company.period}
            </p>
          </div>
        </div>

        <span
          className="text-[10px] font-semibold rounded-full px-2.5 py-1 shrink-0"
          style={{
            background: colors.accentSoft,
            color: colors.accentDeep,
            fontFamily: fonts.mono,
          }}
        >
          Stage
        </span>
      </div>

      <div className="mb-4">
        <p
          className="text-[11px] font-semibold uppercase tracking-wide mb-1"
          style={{ color: colors.inkFaint, fontFamily: fonts.mono }}
        >
          Domaine d'activité
        </p>
        <p className="text-xs leading-relaxed" style={{ color: colors.inkSoft }}>
          {company.domain}
        </p>
      </div>

      <div>
        <p
          className="text-[11px] font-semibold uppercase tracking-wide mb-2"
          style={{ color: colors.inkFaint, fontFamily: fonts.mono }}
        >
          Missions principales
        </p>
        <ul className="space-y-1.5 mb-4">
          {stage.missions.map((mission) => (
            <li
              key={mission}
              className="flex items-start gap-2 text-xs leading-relaxed"
              style={{ color: colors.inkSoft }}
            >
              <CheckCircle2 size={13} className="mt-0.5 shrink-0" color={colors.accent} />
              <span>{mission}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5">
          {stage.skills.map((skill) => (
            <span
              key={skill}
              className="text-[10px] font-medium rounded-full px-2.5 py-1"
              style={{
                background: colors.card,
                border: `1px solid ${colors.line}`,
                color: colors.inkSoft,
                fontFamily: fonts.mono,
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import type { AcademicEntry, Stage } from "../data/parcours";
import { colors, fonts } from "../theme";

type TimelineItem = AcademicEntry | Stage;

type TimelineProps = {
  items: TimelineItem[];
  missionsLabel?: string;
  skillsLabel?: string;
};

function isStage(item: TimelineItem): item is Stage {
  return "missions" in item;
}

/**
 * Timeline verticale réutilisable pour le parcours académique
 * et les expériences professionnelles.
 * Sur mobile : une seule colonne à gauche.
 * Sur desktop : les cartes alternent de part et d'autre du trait central.
 */
export default function Timeline({
  items,
  missionsLabel = "Missions réalisées",
  skillsLabel = "Compétences développées",
}: TimelineProps) {
  return (
    <div className="relative">
      {/* Trait vertical continu, dessiné à l'apparition */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="absolute left-[17px] md:left-1/2 top-3 bottom-3 w-px origin-top md:-translate-x-1/2"
        style={{
          background: `linear-gradient(to bottom, ${colors.accent}, ${colors.line})`,
        }}
      />

      <div className="space-y-6 md:space-y-8">
        {items.map((item, index) => {
          const stage = isStage(item);
          const Icon = item.icon;
          const isLeft = index % 2 === 0;
          const badge = stage ? item.duration : item.status;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
              className="relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-10"
            >
              {/* Point de la timeline, animé à l'apparition */}
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  type: "spring",
                  stiffness: 320,
                  damping: 22,
                  delay: index * 0.06 + 0.15,
                }}
                className="absolute left-[7px] md:left-1/2 top-6 z-10 flex h-5 w-5 items-center justify-center rounded-full md:-translate-x-1/2"
                style={{
                  background: colors.card,
                  border: `2px solid ${colors.accent}`,
                  boxShadow: `0 0 0 4px ${colors.accentSoft}`,
                }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: colors.accent }}
                />
              </motion.span>

              <div
                className={
                  isLeft
                    ? "md:pr-10"
                    : "md:col-start-2 md:pl-10"
                }
              >
                <article
                  className="group relative overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{
                    background: colors.cardSoft,
                    border: `1px solid ${colors.line}`,
                    boxShadow: "0 10px 24px -18px rgba(20,22,26,0.28)",
                  }}
                >
                  {/* Liseré animé au survol */}
                  <span
                    className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 rounded-l-2xl transition-transform duration-300 group-hover:scale-y-100"
                    style={{ background: colors.accent }}
                  />

                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span
                      className="inline-flex items-center gap-2 text-[11px] font-semibold rounded-full px-3 py-1"
                      style={{
                        background: colors.accentSoft,
                        color: colors.accentDeep,
                        fontFamily: fonts.mono,
                      }}
                    >
                      <Icon size={13} />
                      {item.period}
                    </span>

                    {badge && (
                      <span
                        className="inline-flex items-center gap-1.5 text-[11px] font-medium rounded-full px-2.5 py-1"
                        style={{
                          background: colors.card,
                          border: `1px solid ${colors.line}`,
                          color: colors.inkSoft,
                          fontFamily: fonts.mono,
                        }}
                      >
                        {!stage && <CheckCircle2 size={12} color={colors.success} />}
                        {badge}
                      </span>
                    )}
                  </div>

                  <h3
                    className="text-base font-semibold leading-snug mb-1"
                    style={{ color: colors.ink, fontFamily: fonts.display }}
                  >
                    {item.title}
                  </h3>

                  <p className="text-xs font-medium mb-2" style={{ color: colors.accentDeep }}>
                    {stage ? item.focus : item.school}
                  </p>

                  {!stage && (
                    <p className="text-xs leading-relaxed" style={{ color: colors.inkSoft }}>
                      {item.description}
                    </p>
                  )}

                  {stage && (
                    <>
                      <p
                        className="text-[11px] font-semibold uppercase tracking-wide mt-4 mb-2"
                        style={{ color: colors.inkFaint, fontFamily: fonts.mono }}
                      >
                        {missionsLabel}
                      </p>
                      <ul className="space-y-1.5 mb-4">
                        {item.missions.map((mission) => (
                          <li
                            key={mission}
                            className="flex items-start gap-2 text-xs leading-relaxed"
                            style={{ color: colors.inkSoft }}
                          >
                            <CheckCircle2
                              size={13}
                              className="mt-0.5 shrink-0"
                              color={colors.accent}
                            />
                            <span>{mission}</span>
                          </li>
                        ))}
                      </ul>

                      <p
                        className="text-[11px] font-semibold uppercase tracking-wide mb-2"
                        style={{ color: colors.inkFaint, fontFamily: fonts.mono }}
                      >
                        {skillsLabel}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {item.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-[10px] font-medium rounded-full px-2.5 py-1"
                            style={{
                              background: colors.accentSoft,
                              color: colors.accentDeep,
                              fontFamily: fonts.mono,
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </article>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

import React from "react";
import SectionShell from "./components/SectionShell";
import Timeline from "./components/Timeline";
import { FORMATION } from "./data/parcours";
import { colors } from "./theme";

export default function ParcoursAcademique() {
  return (
    <SectionShell
      id="parcours"
      eyebrow="Formation"
      title={
        <>
          Mon parcours{" "}
          <span style={{ color: colors.accent, fontStyle: "italic" }}>académique</span>
        </>
      }
      subtitle="Les étapes qui ont construit ma formation en Génie informatique, du Baccalauréat à la Licence."
    >
      <Timeline items={FORMATION} />
    </SectionShell>
  );
}

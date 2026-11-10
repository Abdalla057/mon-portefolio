import React from "react";
import SectionShell from "./components/SectionShell";
import Timeline from "./components/Timeline";
import { STAGES } from "./data/parcours";
import { colors } from "./theme";

export default function Experiences() {
  return (
    <SectionShell
      id="experiences"
      eyebrow="Terrain"
      title={
        <>
          Mes expériences{" "}
          <span style={{ color: colors.accent, fontStyle: "italic" }}>professionnelles</span>
        </>
      }
      subtitle="Deux stages en entreprise pour confronter la formation aux réalités du métier et développer des compétences concrètes."
    >
      <Timeline
        items={STAGES}
        missionsLabel="Missions réalisées"
        skillsLabel="Compétences développées"
      />
    </SectionShell>
  );
}

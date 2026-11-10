import React from "react";
import SectionShell from "./components/SectionShell";
import CompanyCard from "./components/CompanyCard";
import { ENTREPRISES, STAGES } from "./data/parcours";
import { colors } from "./theme";

export default function Entreprises() {
  return (
    <SectionShell
      id="entreprises"
      eyebrow="Immersion"
      title={
        <>
          Les entreprises de mes{" "}
          <span style={{ color: colors.accent, fontStyle: "italic" }}>stages</span>
        </>
      }
      subtitle="Les structures qui m'ont accueilli et permis de mettre en pratique mes compétences sur le terrain."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {ENTREPRISES.map((company) => {
          const stage = STAGES.find((item) => item.id === company.stageId);
          if (!stage) return null;

          return <CompanyCard key={company.id} company={company} stage={stage} />;
        })}
      </div>
    </SectionShell>
  );
}

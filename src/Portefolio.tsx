import React, { ReactNode, useMemo } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Accueil from "./Accueil";
import Propos from "./Propos";
import ParcoursAcademique from "./ParcoursAcademique";
import Experiences from "./Experiences";
import Entreprises from "./Entreprises";
import Competence from "./Competence";
import Project from "./Projet";
import Contact from "./Contact";
import { colors, fadeInUp } from "./theme";


interface PortefolioProps {
  children?: ReactNode;
  showPropos?: boolean;
  showContact?: boolean;
}

// Barre de progression de lecture, fixée en haut de la page.
const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left pointer-events-none"
      style={{
        scaleX,
        background: `linear-gradient(90deg, ${colors.accent}, ${colors.accentDeep})`,
      }}
    />
  );
};

// Wrapper réutilisable pour animer une section au scroll
const AnimatedSection: React.FC<{
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string; // identifiant HTML pour permettre l'ancrage (#a-propos, #contact, ...)
}> = ({ children, className, delay = 0, id }) => (
  <motion.div
    id={id}
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    variants={fadeInUp}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

/**
 * Composant Principal - Layout principal du site
 * Contient Header, Footer, et sections globales
 */
const Principal: React.FC<PortefolioProps> = ({
  children,
  showPropos = true,
  showContact = true,
}) => {
  const PortfolioHeroComponent = useMemo(() => <Accueil />, []);

  const AproposComponent = useMemo(
    () => showPropos && <Propos />,
    [showPropos]
  );

  const ParcoursComponent = useMemo(
    () => showPropos && <ParcoursAcademique />,
    [showPropos]
  );

  const ExperiencesComponent = useMemo(
    () => showPropos && <Experiences />,
    [showPropos]
  );

  const EntreprisesComponent = useMemo(
    () => showPropos && <Entreprises />,
    [showPropos]
  );

  const CompetencesComponent = useMemo(
    () => showPropos && <Competence />,
    [showPropos]
  );

  const ProjectComponent = useMemo(
    () => showPropos && <Project />,
    [showPropos]
  );

  

  const ContactComponent = useMemo(
    () => showContact && <Contact />,
    [showContact]
  );

 
  return (
    // "scroll-smooth" : anime le défilement quand on clique sur un lien #ancre
    // (ex: href="#a-propos") au lieu d'un saut brutal.
    <div
      className="flex flex-col min-h-screen scroll-smooth"
      style={{ background: colors.canvas }}
    >
      <ScrollProgress />

      {/* Accueil — id="accueil" : cible du lien "Accueil" / du logo dans la navbar */}
      <div id="accueil" className="w-full">{PortfolioHeroComponent}</div>

      {/* Propos — id="a-propos" : cible du lien "À propos" */}
      {AproposComponent && (
        <AnimatedSection id="a-propos" className="w-full mt-10">
          {AproposComponent}
        </AnimatedSection>
      )}

      {/* Parcours académique — id="parcours" défini dans le composant */}
      {ParcoursComponent && (
        <AnimatedSection className="w-full mt-10" delay={0.1}>
          {ParcoursComponent}
        </AnimatedSection>
      )}

      {/* Expériences professionnelles — id="experiences" défini dans le composant */}
      {ExperiencesComponent && (
        <AnimatedSection className="w-full mt-10" delay={0.1}>
          {ExperiencesComponent}
        </AnimatedSection>
      )}

      {/* Entreprises des stages — id="entreprises" défini dans le composant */}
      {EntreprisesComponent && (
        <AnimatedSection className="w-full mt-10" delay={0.1}>
          {EntreprisesComponent}
        </AnimatedSection>
      )}

      {/* Competence — id="competences" : cible du lien "Compétences" */}
      {CompetencesComponent && (
        <AnimatedSection id="competences" className="w-full mt-10" delay={0.1}>
          {CompetencesComponent}
        </AnimatedSection>
      )}

      {/* Project — id="projets" : cible du lien "Projets" */}
      {ProjectComponent && (
        <AnimatedSection id="projets" className="w-full mt-16" delay={0.1}>
          {ProjectComponent}
        </AnimatedSection>
      )}


      {/* Contact — id="contact" : cible du lien "Contact" */}
      {ContactComponent && (
        <AnimatedSection id="contact" className="w-full mt-16" delay={0.1}>
          {ContactComponent}
        </AnimatedSection>
      )}

      {children && (
        <main className="flex-1 w-full mt-16 mb-16">{children}</main>
      )}

     
    </div>
  );
};

export default Principal;